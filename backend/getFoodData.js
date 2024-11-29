
const express = require('express'); // Import the express module.
const All = express.Router();
const fs = require('fs');
const path = require('path');

const Food_Path = path.join(__dirname, "../DataBase/FoodDB.json");
const FoodData = JSON.parse(fs.readFileSync(Food_Path, 'utf8'));

// Function to retrieve all food items
const getFoodBySubCategory = (subcategory) => {
  return new Promise((resolve, reject) => {
    const dosa = FoodData.filter( items => items.subcategory === subcategory );
    if(!dosa){
      return reject('Error filtering');
    }
    resolve(dosa);
  });
};

// Define the route to get food items
All.get('/foods', async (req, res) => {
  try {
    const response = await getFoodBySubCategory('Non-Vegetarian')
    res.status(200).json( response ); // Send the data as a JSON object
  } catch (error) {
    console.error('Database Query Error:', error.message); // Log error details for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = All; // Export the router
