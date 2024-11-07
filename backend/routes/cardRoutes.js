const express = require('express');
const cardRoutes = express.Router(); 
const connection = require('./../dataBase/MySql'); 
const { userCartData, recommendItems } = require('./recommendation'); // Import recommendation logic

// Cart Route for Adding/Updating Items
cardRoutes.post('/cart', (req, res) => {
    const user_id = req.session.user.userID  ? req.session.user.userID : null;
    console.log('user id is got', user_id);
    if (!user_id) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    const { food_id, quantity } = req.body;

        // Update cart in database
        connection.query(
        'INSERT INTO Cart (user_id, food_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = ?',
        [user_id, food_id, quantity, quantity],
        (err, results) => {
            if (err) {
                console.error('Database error:', err);  // Log detailed error
                return res.status(500).json({ message: 'Server error' });
            }

            // update in-memory cart data
            if(!userCartData[user_id]){
                userCartData[user_id] = [];
            }

            // Add the food item to the user's cart if not already present
            if (!userCartData[user_id].includes(food_id)) {
                userCartData[user_id].push(food_id);
            }
            console.log('User cart data:', userCartData);
            res.json({ message: 'Cart updated successfully', food_id, quantity });
        }
    );

    });


    // Add a route for recommendations
    cardRoutes.get(`/recommendations/:userID`, async (req, res) => {
        const user_id = req.session.user && req.session.user.userID  ? req.session.user.userID : null;
        console.log('user id is got', user_id);

        if (!user_id) {
            return res.status(401).json({ message: 'User not logged in' });
        }

        try {
            const recommendations = await recommendItems(user_id); // Await the result
            console.log('Recommendation route User ID received', user_id);
            res.json(recommendations); // Send the recommendations array directly
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            res.status(500).json({ message: 'Error fetching recommendations' });
        }
    });



    module.exports = cardRoutes;

