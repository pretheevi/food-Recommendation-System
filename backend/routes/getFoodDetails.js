    class FetchFoodItems{
    constructor(endPoint){
        this.endPoint = endPoint;
        this.AddToCard = this.AddToCard.bind(this);
    }

    async fetchAllItems(){
        try{
            const response = await fetch(`${this.endPoint}`)
            if(!response){
                throw new Error("Could not fetch food items");
            }
            const data = await response.json();
            
            const foodCardContainer = document.getElementById('BreakFast-card-item');
            const items = data.PakorasItems;
                items.forEach(food => {
                    const card = document.createElement('div');
                    card.className = 'card col-12 col-md-6 col-lg-3';
                    card.innerHTML = `
                        <div class="category-card">
                            <div class="food-items">
                                <div class="food-item-card">
                                    <img class="image" style="height:250px;" src="${food.imageUrl}" alt="${food.food_id}">
                                    <h4>${food.name}</h4>
                                    <p>${food.description}</p>
                                    <div class="d-flex flex-column justify-content-between mt-auto mb-3 ">
                                        <p>Price: ₹${food.price}</p>
                                        <div class="d-flex flex-row justify-content-between">
                                            <button class="button btn btn-primary">Like</button> 
                                            <h1 class="item-number">0<h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    const button = card.querySelector('button');
                    button.addEventListener('click', () => {this.AddToCard(button)});
                    const foods = foodCardContainer.appendChild(card);
                    return foods;
                });
        } catch(error) {
            console.log(error.message);
        }
    }

    AddToCard(button){
            let card = button.closest('.food-item-card');
            let quantityElement = card.querySelector('.item-number')
            let currentCount = parseInt(quantityElement.innerHTML);
            quantityElement.innerHTML = currentCount + 1

            // Get food item ID or other necessary data
            let foodId = card.querySelector('img').alt;

            // Send the updated cart data to the server
            fetch('/api/cart', {
                method:'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                food_id: foodId,
                quantity: currentCount + 1
                })
            })
            .then(response => response.json())
            .then(data => { console.log('cart updated successfully', data) })
            .catch(error => { console.log('Error updating cart', error) });
    }
    }

export default FetchFoodItems;
