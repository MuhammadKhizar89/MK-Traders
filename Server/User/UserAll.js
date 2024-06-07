const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../AllSchemas/UserModel');
const OrderModel = require('../AllSchemas/OrderModel');
const ProductModel = require('../AllSchemas/ProductModel');
const CartModel = require('../AllSchemas/CartModel');
const ReviewModel = require('../AllSchemas/ReviewModel');

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
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new UserModel({ Username, PhoneNumber, Email, Address, Password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, 'mktraders_jazib');
    res.status(201).json({ message: 'User registered successfully', token, Email, UserName: Username });
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
    const user = await UserModel.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'mktraders_jazib');
    res.status(200).json({ message: 'Login successful', token, Email, Username: user.Username });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});
router.post('/buynow', authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    const { productId, quantity, price } = req.body;
    if (!productId || !quantity || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Check if the user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        let status = "pending";
        let review = "";
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
router.post('/addToCart', authMiddleware, async (req, res) => {
    const userId = req.user.userId;    
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
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
            const status = 'pending';
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

router.get('/getallproducts', async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});
router.post('/givereview', authMiddleware, async (req, res) => {
    const { orderId, productId, rating, description } = req.body;
    if (!orderId || !productId || !rating || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const userId = req.user.userId;
        // Check if the product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create a new review
        const newReview = new ReviewModel({
            productId,
            userId,
            Rating: rating,
            Description: description,
        });
        await newReview.save();

        // Calculate the new average rating
        const allReviews = await ReviewModel.find({ productId });
        const totalRating = allReviews.reduce((sum, review) => sum + review.Rating, 0);
        const averageRating = (totalRating / allReviews.length).toFixed(1);

        // Update the product's rating
        product.Rating = parseFloat(averageRating);
        await product.save();

        // Update the order's review field
        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.review = 1; // Update the review field with the new review
        await order.save();

        res.status(201).json({ message: 'Review submitted successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting review', error });
    }
});

router.get('/getproductreview/:product_id', async (req, res) => {
    const productId = req.params.product_id;
    try {
        const productReviews = await ReviewModel.find({ productId }).populate('userId', 'Username');
        res.status(200).json({ reviews: productReviews });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product reviews', error });
    }
});
router.get('/getspecificproduct/:product_id', async (req, res) => {
    const productId = req.params.product_id;
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product });
    } catch (error) {
        console.error("Error fetching specific product:", error);
        res.status(500).json({ message: 'Error fetching specific product', error });
    }
});


const checkAndDeleteOldOrders = async (userId) => {
    const orders = await OrderModel.find({
      userId: userId,
      status: { $in: ['cancelled', 'rejected'] }
    });
  
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
    const ordersToDelete = orders.filter(order => {
      const orderDate = order.date;
      const thirtyDaysBeforeOrderDate = new Date(orderDate);
      thirtyDaysBeforeOrderDate.setDate(thirtyDaysBeforeOrderDate.getDate() + 30);
      return thirtyDaysBeforeOrderDate < new Date();
    });
  
    try {
      const result = await OrderModel.deleteMany({
        _id: { $in: ordersToDelete.map(order => order._id) }
      });
  
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting old orders:', error);
      throw new Error('Server error');
    }
  };
  
  router.get('/getorders', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId;
      await checkAndDeleteOldOrders(userId);
      const orders = await OrderModel.find({ userId }).populate('productId');
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error });
    }
  });
  
router.put('/cancelorder/:orderid', authMiddleware, async (req, res) => {
    const { orderid } = req.params;
    try {
        const userId = req.user.userId;
        // Find the order by ID and userId to ensure the user can only cancel their own orders
        const order = await OrderModel.findOne({ _id: orderid, userId });
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Update the order status to "cancelled"
        order.status = 'cancelled';
        await order.save();

        res.status(200).json({ message: 'Order cancelled successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling order', error });
    }
});
router.get('/getuserinfo', authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    try {
      const user = await UserModel.findById(userId, 'Username Email PhoneNumber Address');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user info', error });
    }
  });

    module.exports = router;
