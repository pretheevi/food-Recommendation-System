require('dotenv').config();

const express = require('express'); // Import express to make easy access.
const session = require('express-session'); // Import session package.
const path = require('path'); //path to define the path directory.
const app = express();



//custom modules 
const fileRoutes = require('./routes/routes');
const UserRoutes = require('./routes/loginRoutes');
const foodRoutes = require('./routes/foodRoutes');
const cardRoutes = require('./routes/cardRoutes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session to save the user details temporarily until the logout .
app.use(session({
    secret: 'your_secret_key', // A unique, secure key to sign the session ID
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, './../front-end')))
app.use(express.static(path.join(__dirname, './../front-end/style')))
app.use(express.static(path.join(__dirname, './../front-end/pictures')))

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './../front-end/view'));

//middleware to handle the static files serving
app.use('/', fileRoutes);   
app.use('/index', fileRoutes);
app.use('/Delivery&Payment', fileRoutes);  
app.use('/profile', fileRoutes);
app.use('/login', fileRoutes);
app.use('/menuDetails', fileRoutes);
app.use('/passwordChangedSuccessfully', fileRoutes);

//middleware to handle user registration
app.use('/user', UserRoutes);
//middleware to handle food data display on the menu webpages
app.use('/api', foodRoutes);
//middleware to handle the user cart quantity in the database
app.use('/api', cardRoutes);


const PORT = process.env.PORT || 8000;

//function to listen to the specified PORT Number , console.log the message when its start listening.
app.listen(PORT, ()=>{
    console.log(`Listening on port' ${PORT}`);
})