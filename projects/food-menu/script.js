import { foodObjects } from './utils/foodObjects.js'
import { foodCardTemplate } from './utils/foodCardTemplate.js'

let foodCategories = document.getElementsByClassName('foodCategories')
let menuItems = document.querySelector('.menuItems')

let allFood = foodObjects.map((food) => {
    return foodCardTemplate(food.image, food.name, food.price, food.description)
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
                return foodCardTemplate(food.image, food.name, food.price, food.description)
            })
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