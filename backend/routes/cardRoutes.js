const express = require('express');
const cardRoutes = express.Router(); 
const { userCartData, recommendItems } = require('./recommendation'); // Import recommendation logic
const path = require('path');
const fs = require('fs');


//let cartData = JSON.parse(fs.readFileSync(cart_path, 'utf8'));
const cart_path = path.join(__dirname, '../../DataBase/userCart.json');
function getCartData(){
    let cartData = JSON.parse(fs.readFileSync(cart_path, 'utf8'));
    return cartData;
}

// Cart Route for Adding/Updating Items
cardRoutes.post('/cart', async (req, res) => {
    const user_id = req.session.user?.userID  ? req.session.user.userID : null;
    console.log('user id is got', user_id);
    if (!user_id) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    const { food_id, quantity } = req.body;
    console.log(food_id, quantity)
    try{    
        let cartData = await getCartData();
        const cartObj = {
            card_id: cartData.length + 1,
            user_id: user_id,
            food_id: Number(food_id),
            quantity: quantity,
            added_at: new Date()
            }
        console.log(cartObj);
        cartData.push(cartObj);

        fs.writeFile(cart_path, JSON.stringify(cartData, null, 2), 'utf8', (err) => {
            if (err) {
                console.log('Error saving cart data:', err);
                return res.status(500).send('Error saving cart data');
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
            res.send(JSON.stringify(cartData));
        });
    }catch(error){
        console.log(error);
        res.send(error.message);
    }
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

