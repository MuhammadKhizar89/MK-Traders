const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const UserModel = require('../AllSchemas/UserModel');
const OrderModel = require('../AllSchemas/OrderModel');
const ProductModel = require('../AllSchemas/ProductModel');
const CartModel = require('../AllSchemas/CartModel');
const authMiddleware = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, 'mktraders_jazib');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
router.post('/register', async (req, res) => {
    const { Username, PhoneNumber, Email, Address, Password } = req.body;
    if (!Username || !PhoneNumber || !Email || !Address || !Password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const existingEmailUser = await UserModel.findOne({ Email });
        const existingPhoneUser = await UserModel.findOne({ PhoneNumber });
        if (existingEmailUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        if (existingPhoneUser) {
            return res.status(400).json({ message: 'User with this phone number already exists' });
        }
        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new UserModel({ Username, PhoneNumber, Email, Address, Password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, 'mktraders_jazib'); // Set token expiration time
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});
router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        // Find the user by email or phone number
        const user = await UserModel.findOne({
            $or: [{ Email: Email}]
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'mktraders_jazib');
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});
router.post('/buynow', async (req, res) => {
    const { productId, userId, quantity, price } = req.body;
    if (!productId || !userId || !quantity || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        // Check if the product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let status="Pending";
        let review="";
        // Create a new order
        const newOrder = new OrderModel({
            productId,
            userId,
            quantity,
            price,
            status,
            review,
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error placing order', error });
    }
});
router.post('/addToCart', async (req, res) => {
    const { productId, userId, quantity } = req.body;

    if (!productId || !userId || !quantity) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the cart item already exists for the same product and user
        let cartItem = await CartModel.findOne({ productId, userId });
        
        if (cartItem) {
            // Update the quantity if the item already exists in the cart
            cartItem.quantity += quantity;
            await cartItem.save();
            res.status(200).json({ message: 'Cart item updated successfully', cartItem });
        } else {
            // Create a new cart item if it doesn't exist
            cartItem = new CartModel({ productId, userId, quantity });
            await cartItem.save();
            res.status(201).json({ message: 'Item added to cart successfully', cartItem });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
});

router.get('/getallCart', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const cartItems = await CartModel.find({ userId }).populate('productId');
        res.status(200).json({ cartItems });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items', error });
    }
});


router.post('/buyallfromcart', authMiddleware, async (req, res) => {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart items are required' });
    }

    try {
        const userId = req.user.userId;
        const orders = [];

        for (const item of cartItems) {
            const { productId, quantity } = item;

            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product with id ${productId} not found` });
            }

            const price = product.Price * quantity;
            const status = 'Pending';
            let review="";
            const newOrder = new OrderModel({
                productId,
                userId,
                quantity,
                price,
                status,
                review,
            });

            await newOrder.save();
            orders.push(newOrder);
        }

        // Remove all cart items of the specific user after placing orders
        await CartModel.deleteMany({ userId });

        res.status(201).json({ message: 'All cart items purchased successfully', orders });
    } catch (error) {
        res.status(500).json({ message: 'Error purchasing items from cart', error });
    }
});
router.post('/removefromCart', authMiddleware, async (req, res) => {
    const { itemId } = req.body;

    if (!itemId) {
        return res.status(400).json({ message: 'Item ID is required' });
    }

    try {
        const userId = req.user.userId;
        
        // Find the cart item by ID and userId
        const foundCartItem = await CartModel.findOne({ _id: itemId, userId }).lean();

        if (!foundCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        // Use CartModel.deleteOne() to remove the cart item
        await CartModel.deleteOne({ _id: itemId, userId });

        res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
        res.status(500).json({ message: `Error removing item from cart ${error}`, error });
    }
});



module.exports = router;
