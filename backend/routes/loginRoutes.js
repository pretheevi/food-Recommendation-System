const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../dataBase/MySql');
const { userCartData, recommendItems } = require('./recommendation'); // Import recommendation logic
const UserRoutes = express.Router();

const generatedNumbers = new Set();
function generateUniqueThreeDigitNumber() {
    let number;
    do {
        number = Math.floor(100 + Math.random() * 900);
    } while (generatedNumbers.has(number)); // Ensure the number is unique

    generatedNumbers.add(number);
    return number;
}

// Register Route
UserRoutes.post('/register', async (req, res) => {
    try {
        // Check if user exists already in the database
        connection.query('SELECT * FROM foodrestaurant.users WHERE email = ?', [req.body.email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error');
            }

            if (results.length > 0) {
                return res.status(400).send('Account already registered'); // User already registered
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password for security
            const userID = generateUniqueThreeDigitNumber();
            const registeredAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS

            // Insert new user into MySQL database
            connection.query('INSERT INTO foodrestaurant.users (userID, name, number, email, password, registeredAt) VALUES (?, ?, ?, ?, ?, ?)', 
            [userID, req.body.name, req.body.number, req.body.email, hashedPassword, registeredAt], 
            (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Server error');
                }

                req.session.isAuthenticated = true;
                req.session.user = { userID, name: req.body.name, number: req.body.number, email: req.body.email }; // Save user data to session
                res.redirect('/'); // Redirect to HOME page after successful registration
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // Message error when registration fails
    }
});

// Login Route
UserRoutes.post('/login', (req, res) => {
    connection.query('SELECT * FROM foodrestaurant.users WHERE email = ?', [req.body.email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Server error");
        }

        const user = results[0]; // Get the first matching user

        if (user && await bcrypt.compare(req.body.password, user.password)) { // Compare given password with stored password
            req.session.isAuthenticated = true;
            req.session.user = user; // Save user data to session

            console.log(req.session.user.userID);

            // Fetch user's cart data after successful login
            connection.query('SELECT food_id FROM Cart WHERE user_id = ?', [user.userID], (cartErr, cartResults) => {
                if (cartErr) {
                    console.error('Error fetching cart data:', cartErr);
                    return res.status(500).json({ message: 'Error loading cart data' });
                }

                // Populate in-memory cart data
                userCartData[user.userID] = cartResults.map(row => row.food_id); 
                console.log('Cart data loaded for user:', userCartData[user.userID]);

                // Send user ID and loaded cart data in the response
                return res.json({ success: true, userID: user.userID, cart: userCartData[user.userID] });
            });
        } else {
            res.status(404).send("Email or password incorrect"); // Error message if authentication fails
        }
    });
});





// Forget Password Route
UserRoutes.post('/forgetPassword', async (req, res) => {
    try {
        connection.query('SELECT * FROM foodrestaurant.users WHERE email = ?', [req.body.email], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Server error');
            }

            const user = results[0];
            if (!user) {
                return res.status(400).send('Account does not exist');
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            connection.query('UPDATE foodrestaurant.users SET password = ? WHERE email = ?', [hashedPassword, req.body.email], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Server error');
                }
                res.status(200).redirect('/');
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Profile Route
UserRoutes.get('/profile', (req, res) => {
    if (req.session.isAuthenticated) {
        res.render('profile', { user: req.session.user });
    } else {
        res.redirect('/registerPage'); // Redirect to login if not authenticated
    }
});

// Logout Route
UserRoutes.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/');
    });
});

module.exports = UserRoutes;
