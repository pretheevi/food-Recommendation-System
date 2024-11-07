// const connection = require('./../dataBase/MySql');

// // Holds the cart data in memory for simplicity
// const userCartData = {}; 

// // Calculate Jaccard similarity between two users
// function jaccardSimilarity(userA, userB) {
//     const setA = new Set(userCartData[userA]);
//     const setB = new Set(userCartData[userB]);

//     const intersection = [...setA].filter(item => setB.has(item)).length;
//     const union = new Set([...setA, ...setB]).size;

//     return union === 0 ? 0 : intersection / union; // Prevent division by zero
// }

// // Find users most similar to the target user
// function findSimilarUsers(targetUser) {
//     const similarities = [];

//     for (const user in userCartData) {
//         if (user !== targetUser) {
//             const similarity = jaccardSimilarity(targetUser, user);
//             similarities.push({ user, similarity });
//             console.log('User:', user, 'Similarity:', similarity); // Moved this inside the loop
//         }
//     }

//     similarities.sort((a, b) => b.similarity - a.similarity);
//     console.log('Similar users for target user:', similarities); // Log similarities
//     return similarities;
// }




// async function recommendItems(targetUser) {
//     // Load cart data from DB if not already in memory
//     if (!userCartData[targetUser]) {
//         await loadCartData(targetUser);
//     }

//     console.log(`Cart data for user ${targetUser}:`, userCartData[targetUser]);

//     const similarUsers = findSimilarUsers(targetUser);
//     console.log(`Similar users found for ${targetUser}:`, similarUsers);

//     // If no similar users found, return popular items or a default message
//     if (similarUsers.length === 0) {
//         console.log('No similar users found. Suggesting popular items instead.');
//         return await getPopularItems(); // Implement this function to fetch popular items
//     }

//     const recommendations = new Set();

//     for (const similarUser of similarUsers.slice(0, 3)) {
//         const items = userCartData[similarUser.user] || [];
//         for (const item of items) {
//             if (!userCartData[targetUser]?.includes(item)) {
//                 recommendations.add(item);
//             }
//         }
//     }

//     const itemIds = [...recommendations].slice(0, 12);
//     console.log(`Recommendations before querying the database:`, itemIds);

//     if (itemIds.length === 0) {
//         console.log('No recommendations found for user:', targetUser);
//         return await getPopularItems(); // Fallback again if no recommendations are generated
//     }

//     const query = `SELECT food_id, name, subcategory, imageUrl
//                 FROM food_items
//                 WHERE food_id IN (${itemIds.map(() => '?').join(',')})`;
    
//     const result = await new Promise((resolve, reject) => {
//         connection.query(query, itemIds, (err, result) => {
//             if (err) {
//                 console.error('Error querying food items:', err);
//                 return reject(err);
//             }
//             resolve(result);
//         });
//     });

//     console.log(`Recommendations returned for user ${targetUser}:`, result);
//     return result; // Return full item details from database
// }




// // Load cart data from the DB for a given user
// async function loadCartData(user_id) {
//     const cartItems = await new Promise((resolve, reject) => {
//         connection.query('SELECT food_id FROM Cart WHERE user_id = ?', [user_id], (err, results) => {
//             if (err) return reject(err);
//             resolve(results.map(row => row.food_id));
//         });
//     });

//     userCartData[user_id] = cartItems;
// }


// async function getPopularItems() {
//     return new Promise((resolve, reject) => {
//         const query = `
//             SELECT food_id, name, subcategory, imageUrl
//             FROM food_items 
//             ORDER BY food_id DESC 
//             LIMIT 10`; // Adjust the ORDER BY clause and LIMIT as per your database schema

//         connection.query(query, (err, results) => {
//             if (err) {
//                 console.error('Error fetching popular items:', err);
//                 return reject(err);
//             }
//             resolve(results);
//         });
//     });
// }



// // Expose functions
// module.exports = {
//     userCartData, // Expose user cart data for updating
//     recommendItems
// };


const connection = require('./../dataBase/MySql');
// Holds the cart data in memory for simplicity
const userCartData = {}; 
// Calculate Jaccard similarity between two userss
function jaccardSimilarity(userA, userB) {
    const setA = new Set(userCartData[userA]);
    const setB = new Set(userCartData[userB]);

    const intersection = [...setA].filter(item => setB.has(item)).length;
    const union = new Set([...setA, ...setB]).size;

    return union === 0 ? 0 : intersection / union; // Prevent division by zero
}

// Find users most similar to the target user
function findSimilarUsers(targetUser) {
    const similarities = [];

    for (const user in userCartData) {
        if (user !== targetUser) {
            const similarity = jaccardSimilarity(targetUser, user);
            similarities.push({ user, similarity });
        }
    }

    similarities.sort((a, b) => b.similarity - a.similarity);
    return similarities;
}

// Boost item-based filtering by finding items related to those in the target user’s cart
async function findSimilarItems(targetItems) {
    if (targetItems.length === 0) return [];

    const query = `
        SELECT DISTINCT food_id, name, subcategory, imageUrl
        FROM food_items
        WHERE subcategory IN (
            SELECT subcategory FROM food_items WHERE food_id IN (${targetItems.map(() => '?').join(',')})
        ) AND food_id NOT IN (${targetItems.map(() => '?').join(',')})
        LIMIT 20`;
        
    const params = [...targetItems, ...targetItems];
    
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) {
                console.error('Error fetching similar items:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function recommendItems(targetUser) {
    if (!userCartData[targetUser]) {
        await loadCartData(targetUser);
    }

    const similarUsers = findSimilarUsers(targetUser);
    if (similarUsers.length === 0) return await getPopularItems();

    const recommendations = new Map();
    const targetItems = userCartData[targetUser] || [];
    const maxSimilarUsers = 5;

    for (const { user, similarity } of similarUsers.slice(0, maxSimilarUsers)) {
        const items = userCartData[user] || [];
        const weight = similarity;
        for (const item of items) {
            if (!targetItems.includes(item)) {
                recommendations.set(item, (recommendations.get(item) || 0) + weight);
            }
        }
    }

    const recommendedItemIds = [...recommendations.keys()]
        .sort((a, b) => recommendations.get(b) - recommendations.get(a))
        .slice(0, 12);

    // Include items similar to what target user has liked
    const similarItems = await findSimilarItems(targetItems);
    similarItems.forEach(item => {
        if (!recommendedItemIds.includes(item.food_id)) recommendedItemIds.push(item.food_id);
    });

    if (recommendedItemIds.length === 0) return await getPopularItems();

    const query = `SELECT food_id, name, subcategory, imageUrl
                    FROM food_items
                    WHERE food_id IN (${recommendedItemIds.slice(0, 12).map(() => '?').join(',')})`;
    const result = await new Promise((resolve, reject) => {
        connection.query(query, recommendedItemIds.slice(0, 12), (err, results) => {
            if (err) {
                console.error('Error querying food items:', err);
                return reject(err);
            }
            resolve(results);
        });
    });

    return result;
}

// Load cart data from the DB for a given user
async function loadCartData(user_id) {
    const cartItems = await new Promise((resolve, reject) => {
        connection.query('SELECT food_id FROM Cart WHERE user_id = ?', [user_id], (err, results) => {
            if (err) return reject(err);
            resolve(results.map(row => row.food_id));
        });
    });

    userCartData[user_id] = cartItems;
}

// Enhanced fallback function: suggest trending items rather than just popular
async function getPopularItems() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT food_id, name, subcategory, imageUrl
            FROM food_items 
            WHERE trending_score IS NOT NULL
            ORDER BY trending_score DESC
            LIMIT 10`;

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching popular items:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

// Expose functions
module.exports = {
    userCartData,
    recommendItems
};
