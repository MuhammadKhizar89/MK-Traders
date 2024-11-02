require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const connectDB = require('./database');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: 'https://mk-traders.vercel.app/',
}));
app.use(express.json());

app.use(cookieParser({
    httpOnly:true,
}));

connectDB().then(db => {
    app.locals.db = db; 
    const userRoutes = require('./User/UserAll');
    app.use('/userauthentication', userRoutes);
    app.get('/', (req, res) => {
        res.send('Server is running');
    });
    app.get('/getcookie', function (req, res) {
        res.send(req.cookies);
    })
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Error connecting to the database', error);
});
