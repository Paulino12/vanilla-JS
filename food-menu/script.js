
let foodObjects = [
    {
        id: 1,
        category: "Breakfast",
        name: "Egg On Toast",
        price: "£12.50",
        image: "./assets/images/eggOnToast.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae tempor dui, eu viverra libero. Integer dictum non orci sit amet eleifend"
    },
    {
        id: 2,
        category: "Lunch",
        name: "Poke Bowl",
        price: "£12.50",
        image: "./assets/images/pokeBowl.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae tempor dui, eu viverra libero."
    },
    {
        id: 3,
        category: "Dinner",
        name: "Citrus Salmon",
        price: "£12.50",
        image: "./assets/images/citrusSalmon.jpg",
        description: "Aenean mattis nisl erat, at porta ipsum dictum non. Morbi pellentesque malesuada ornare. Nunc rhoncus lectus et sollicitudin tempus."
    },
    {
        id: 4,
        category: "Breakfast",
        name: "French Toast",
        price: "£12.50",
        image: "./assets/images/frenchToast.jpg",
        description: "Aenean mattis nisl erat, at porta ipsum dictum non. Morbi pellentesque malesuada ornare. Nunc rhoncus lectus et sollicitudin tempus."
    },
    {
        id: 5,
        category: "Breakfast",
        name: "French Toast",
        price: "£12.50",
        image: "./assets/images/frenchToast.jpg",
        description: "Aenean mattis nisl erat, at porta ipsum dictum non. Morbi pellentesque malesuada ornare. Nunc rhoncus lectus et sollicitudin tempus."
    }
    ,
    {
        id: 6,
        category: "Lunch",
        name: "French Toast",
        price: "£12.50",
        image: "./assets/images/frenchToast.jpg",
        description: "Aenean mattis nisl erat, at porta ipsum dictum non. Morbi pellentesque malesuada ornare. Nunc rhoncus lectus et sollicitudin tempus."
    },
    {
        id: 7,
        category: "Breakfast",
        name: "French Toast",
        price: "£12.50",
        image: "./assets/images/frenchToast.jpg",
        description: "Aenean mattis nisl erat, at porta ipsum dictum non. Morbi pellentesque malesuada ornare. Nunc rhoncus lectus et sollicitudin tempus."
    }

]

let foodCategories = document.getElementsByClassName('foodCategories')
let menuItems = document.querySelector('.menuItems')

let allFood = foodObjects.map((food) => {
    return `<div class="foodCard">
                <img src="${food.image}" />
                <div class="foodInfo">
                    <div class="foodInfoCover">
                        <div class="foodName">
                            <h4>${food.name}</h4>
                            <small>${food.price}</small>
                        </div>
                        <div class="foodDescription">
                            <p>${food.description}</p>
                        </div>
                    </div>
                </div>
            </div>`
})

menuItems.innerHTML = allFood.join('')

for (let i = 0; i < foodCategories.length; i++) {
    foodCategories[i].addEventListener('click', () => {
        if(foodCategories[i].innerText === "All"){
            menuItems.innerHTML = allFood.join('')
            if(allFood.length > 4){
                menuItems.classList.remove('menuItemsLessThan3')
                menuItems.classList.add('menuItems')
                menuItems.innerHTML = allFood.join('')
            }
        }else{
            let selectedCategory = foodObjects.filter((elt) => elt.category === foodCategories[i].innerText)
            let selectedCategoryToRender = selectedCategory.map((food) => {
                return `<div class="foodCard">
                            <img src="${food.image}" />
                            <div class="foodInfo">
                                <div class="foodInfoCover">
                                    <div class="foodName">
                                        <h4>${food.name}</h4>
                                        <small>${food.price}</small>
                                    </div>
                                    <div class="foodDescription">
                                        <p>${food.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>`
            })
            // menuItems.innerHTML = selectedCategoryToRender.join('')
            console.log(selectedCategoryToRender.length)
            if(selectedCategoryToRender.length < 4) {
                menuItems.classList.remove('menuItems')
                menuItems.classList.add('menuItemsLessThan3')
                menuItems.innerHTML = selectedCategoryToRender.join('')
            }else{
                menuItems.classList.remove('menuItemsLessThan3')
                menuItems.classList.add('menuItems')
                menuItems.innerHTML = selectedCategoryToRender.join('')
            }
            
        }
        let current = document.getElementsByClassName('active')
        current[0].className = current[0].className.replace(' active', '')
        foodCategories[i].className += ' active'
        
    })
}