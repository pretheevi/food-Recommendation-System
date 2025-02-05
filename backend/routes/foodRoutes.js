const express = require('express'); // Import the express module.
const foodRouter = express.Router(); // Get the router instance using express to handle the routers.
const { URL } = require('url');
const path = require('path');
const fs = require('fs');

//read the html file to display
const foodDetailsHTML = fs.readFileSync(path.join(__dirname, './../../front-end/view/recommentedFoodDetails', 'foodDetails.html'), 'utf8');

const food_path = path.join(__dirname, '../../DataBase/foodData.json');
const foodData = JSON.parse(fs.readFileSync(food_path, 'utf8'));

const getFoodItemsBySubcategory = async (subcategory) => {
    return new Promise((resolve, reject) => {
        const foodItems = foodData.filter( items => items.subcategory === subcategory );
        if(!foodItems){
            reject('No food items found');
        }
        resolve(foodItems);
    });
};

// Route to get food items
foodRouter
    .get('/menu/DosaVarieties', async (req, res) => { // Send dosa data to dosa routes
        try {
            const DosaItems = await getFoodItemsBySubcategory('Dosa'); // Filter data based on category.
            res.json({ DosaItems }); // Send the data as a JSON object to client-side JavaScript.
        } catch (error) {
            console.error(error); // Log the error message when any error occurs.
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/IdliVarieties', async (req, res) => { // Send idli data to idli routes
        try {
            const IdliItems = await getFoodItemsBySubcategory('Idli'); // Filter data based on category.
            res.json({ IdliItems }); // Send the data as a JSON object to client-side JavaScript.
        } catch (error) {
            console.error(error); // Log the error message when any error occurs.
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/PongalVarieties', async (req, res) => {
        try {
            const PongalItems = await getFoodItemsBySubcategory('Pongal');
            res.json({ PongalItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/PakorasVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Pakoras');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/SamosasVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Samosas');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/ChaatVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Chaat');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/TikkasVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Tikkas');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/VegetarianVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Vegetarian');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/Non-VegetarianVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Non-Vegetarian');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/RiceVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Rice Varieties');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/RotiVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Roti Varieties');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/ParathasVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Parathas');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/IndianSweetsVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Indian Sweets');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/HalwaVarietiesVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Halwa Varieties');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/ColdBeveragesVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Cold Beverages');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/HotBeverageVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Hot Beverages');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/SouthIndianVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('South Indian');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/NorthIndianVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('North Indian');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/EastIndianVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('East Indian');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/WestIndianVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('West Indian');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/puriiVarieties', async (req, res) => {
        try {
            const PakorasItems = await getFoodItemsBySubcategory('Puri Varieties');
            console.log('Pakoras items:', PakorasItems); // Log the items
            res.json({ PakorasItems });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/vadaVarieties', async (req, res) => {
        try {
            const vadaVarieties = await getFoodItemsBySubcategory('Vada Varieties');
            console.log('vada items:', vadaVarieties); // Log the items
            res.json({ vadaVarieties });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/Sandwiches', async (req, res) => {
        try {
            const Sandwiches = await getFoodItemsBySubcategory('Sandwiches');
            console.log('Sandwiches:', Sandwiches); // Log the items
            res.json({ Sandwiches });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })
    .get('/menu/StreetFoods', async (req, res) => {
        try {
            const StreetFoods = await getFoodItemsBySubcategory('Street Foods');
            console.log('StreetFoods:', StreetFoods); // Log the items
            res.json({ StreetFoods });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    })

    .get('/menu/food_details', async(req, res) => {
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        const url = new URL(fullUrl);
        const subcategory = (url.searchParams.get('subcategory'));
        const food_id = url.searchParams.get('food_id');
        // console.log(food_id)
        try{
            const food_details = await getFoodItemsBySubcategory(subcategory)
            food_details.forEach(foodItem => {
                if((foodItem.food_id === parseInt(food_id)) == true){
                    let replacedHTML = foodDetailsHTML;    
                    const placeholders = {
                        '{{%content%}}':foodItem.name,
                        '{{%price%}}':foodItem.price,
                        '{{%description%}}':foodItem.description,
                        '{{%ingredients%}}':foodItem.ingredients,
                        '{{%region%}}':foodItem.region,
                        '{{%imageUrl%}}':foodItem.imageUrl
                    };
                    for(const [key, value] of Object.entries(placeholders)){
                        replacedHTML = replacedHTML.replace(key, value)
                    }
                    res.send(replacedHTML)
                }
            })
        }catch(err){
            res.status(404).send('error', err); 
        }
        
    })

module.exports = foodRouter;
