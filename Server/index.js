require('dotenv').config();
const express = require('express');
const connectDB = require('./database');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB().then(db => {
    app.locals.db = db; // Store the database connection in app.locals

    // Use the user authentication routes
    const userRoutes = require('./User/UserAll');
    app.use('/userauthentication', userRoutes);
    
    app.get('/', (req, res) => {
        res.send('Server is running');
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Error connecting to the database', error);
});
