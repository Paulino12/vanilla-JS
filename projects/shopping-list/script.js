
let groceryInput = document.querySelector('.groceryInput')
let addPdtDiv = document.querySelector('#addPdtDiv')
let addPdt = document.querySelector('.addPdt')
let updatePdtDiv = document.querySelector('#updatePdtDiv')
let groceries = document.querySelector('.groceries')
let groceryLength = document.querySelector('.groceryLength')
let totalPdts = document.querySelector('.totalPdts')

let groceryItems = []

const groceryTemplate = (id, name) => {
    return `
        <div class="groceryItem" id="${id}">
            <div><h4 class="itemName">${name}</h4></div>
            <div class="groceryActions">
                <div><i class="fas fa-pen fa-lg" id="${id}"></i></div>
                <div><i class="fas fa-trash fa-lg" id="${id}"></i></div>
            </div>
        </div>
    `
}

let groceryItem = document.getElementsByClassName('groceryItem')
let editPdt = document.getElementsByClassName('fa-pen')
let deletePdt = document.getElementsByClassName('fa-trash')


addPdt.addEventListener('click', () => {
    if(groceryInput.value === ""){
        alert("You MUST enter an item to shop for")
    }else{
        groceryItems.unshift({
            id: Date.now(),
            name: groceryInput.value
        })
    
        let addedItem = groceryItems.map((item) => {
            return groceryTemplate(item.id, item.name)
        })
    
        groceries.innerHTML = addedItem.join('')
        // Reset after adding a new item
        groceryInput.value = ""
        groceryInput.focus()
        totalPdts.innerText = groceryItems.length
    
        for (let i = 0; i < deletePdt.length; i++) {
            deletePdt[i].addEventListener('click', () => {
                let filteredGroceries = groceryItems.filter((elt) => elt.id.toString() !== deletePdt[i].id)
                groceryItems = filteredGroceries
    
                let grocery = document.getElementById(`${deletePdt[i].id}`)
                grocery.classList.add('d-none')
                if(!groceryItems.length){
                    totalPdts.innerText = ""
                }else{
                    totalPdts.innerText = groceryItems.length
                }
            })   
        }
    
        // Edit products
        for (let i = 0; i < editPdt.length; i++) {
            editPdt[i].addEventListener('click', () => {

                // change active class to be unique
                let current = document.getElementsByClassName('active')
                for (let j = 0; j < current.length; j++) {
                    current[j].className = current[j].className.replace('active', '')
                    grocery.classList.add('active')
                }

                let grocery = document.getElementById(`${editPdt[i].id}`)
                grocery.classList.add('active')
                addPdtDiv.style.display = 'none'
                updatePdtDiv.innerHTML = `<button class="btn btn-sm btn-success updatePdt"><i class="fas fa-check fa-2x"></i></button>`

                groceryInput.value = grocery.innerText

                let check = document.querySelector('.fa-check')
                check.addEventListener('click', () => {

                    let retrievedItem = groceryItems.filter((elt) => elt.id.toString() === editPdt[i].id)
                    let thisItem = retrievedItem.map((item) => {
                        return item.name
                    })
                    console.log(thisItem.splice(0, 1, groceryInput.value))
                    console.log(thisItem)
                    

                    grocery.childNodes[1].innerHTML = `<h4 class="itemName">${groceryInput.value}</h4>`
                    
                    // Reset after updating
                    updatePdtDiv.innerHTML = ""
                    addPdtDiv.style.display = 'inherit'
                    grocery.classList.remove('active')
                    groceryInput.value = ""
                    groceryInput.focus()
                })
                
            })        
        }
    }
})





