
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

const buttonsTemplate = (btnList) => {
    return `<div class="renderedPagination">
                <div><i class="fas fa-angle-left goPrev"></i></div>
                <div>${btnList}</div>
                <div><i class="fas fa-angle-right goNext"></i></div>
            </div>`
}

let groceryItem = document.getElementsByClassName('groceryItem')
let editPdt = document.getElementsByClassName('fa-pen')
let deletePdt = document.getElementsByClassName('fa-trash')

let paginationData = document.querySelector('.paginationData')
let paginationBtns = document.querySelector('.paginationBtns')

function editProduct() {
    for (let i = 0; i < editPdt.length; i++) {

        editPdt[i].addEventListener('click', () => {
            let grocery = document.getElementById(`${editPdt[i].id}`)

            // change active class to be unique
            let current = document.getElementsByClassName('active')
            for (let j = 0; j < current.length; j++) {
                current[j].className = current[j].className.replace('active', '')
                grocery.classList.add('active')
            }
            
            grocery.classList.add('active')
            addPdtDiv.style.display = 'none'
            updatePdtDiv.innerHTML = `<button class="btn btn-sm btn-success updatePdt"><i class="fas fa-check fa-2x"></i></button>`

            groceryInput.value = grocery.innerText

            let check = document.querySelector('.fa-check')
            check.addEventListener('click', () => {                

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

let pages = []

let jump = document.getElementById('jump')
let stay = document.getElementById('stay')

function deleteProduct() {
    for (let i = 0; i < deletePdt.length; i++) {
        deletePdt[i].addEventListener('click', () => {
            let filteredGroceries = groceryItems.filter((elt) => elt.id.toString() !== deletePdt[i].id)
            groceryItems = filteredGroceries

            // cart display
            let grocery = document.getElementById(`${deletePdt[i].id}`)
            grocery.classList.add('d-none')
            if(!groceryItems.length){
                totalPdts.innerText = ""
            }else{
                totalPdts.innerText = groceryItems.length
            }
        })   
    }
}

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
    
        

        // Pagination
        const numberOfItems = groceryItems.length
        const numberPerPage = 3
        let currentPage = 1
        const numberOfPages = Math.ceil(numberOfItems/numberPerPage)

        let listOfBtns = []
        
        function currentData(){
            const begin = (currentPage - 1) * numberPerPage;
            const end = begin + numberPerPage;
            return groceryItems.slice(begin, end);
        }

        function jumpToPage(page) {
            const pageNumber = Math.max(1, page)
            currentPage = Math.min(pageNumber, numberOfPages)
            pages = currentData().map((item) => {
                return groceryTemplate(item.id, item.name)
            })
            groceries.innerHTML = pages.join('')
            // edit product
            editProduct()
            // delete product
            for (let i = 0; i < deletePdt.length; i++) {
                deletePdt[i].addEventListener('click', () => {
                    let filteredGroceries = groceryItems.filter((elt) => elt.id.toString() !== deletePdt[i].id)
                    groceryItems = filteredGroceries

                    let btnPaginate = document.getElementsByClassName('btnPaginate')
                    let totalLength = parseInt(btnPaginate[currentPage - 1].value) * 3
                    if(groceryItems.length === totalLength - 3){
                        jump.classList.add('d-none')
                    }else if(groceryItems.length - 1){
                        stay.classList.add('d-none')
                    }
        
                    // cart display
                    let grocery = document.getElementById(`${deletePdt[i].id}`)
                    grocery.classList.add('d-none')
                    if(!groceryItems.length){
                        totalPdts.innerText = ""
                    }else{
                        totalPdts.innerText = groceryItems.length
                    }
                })   
            }
        }

        // Edit products
        editProduct()
        // delete product
        deleteProduct()        

        if(numberOfItems > 3){ 
            // show first page (default)
            jumpToPage(currentPage)

            for (i = 0; i < numberOfPages; i++) {

                let buttons = `<button class="mx-1 btnPaginate" value="${i + 1}">${i + 1}</button>`
                listOfBtns.push(buttons)
                paginationBtns.innerHTML = buttonsTemplate(listOfBtns.join(''))

                let btnPaginate = document.getElementsByClassName('btnPaginate')
                let btnPaginateLeft = document.querySelector('.fa-angle-left')
                let btnPaginateRight = document.querySelector('.fa-angle-right')
                
                let config = { attributes: true, childList: true, subtree: true };
                // Callback function to execute when mutations are observed
                let callback = function(mutationsList, observer) {
                    // Use traditional 'for loops' for IE 11
                    for(let mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            console.log('A child node has been added or removed.');
                        }
                        else if (mutation.type === 'attributes') {
                            if(!groceryItems.length){
                                paginationBtns.innerHTML = ""
                            }else{
                                let totalLength = parseInt(btnPaginate[currentPage - 1].value) * 3
                                if(groceryItems.length === totalLength - 3){
                                    console.log(currentPage)
                                    currentPage = currentPage - 1
                                    jumpToPage(currentPage)
                                    btnPaginate[currentPage].remove()
                                    btnPaginate[currentPage - 1].classList.add('paginationActive')                                      
                                }
                            }
                        }
                    }
                };
                // Create an observer instance linked to the callback function
                let observer = new MutationObserver(callback);
                // Start observing the target node for configured mutations
                observer.observe(jump, config);

                let config1 = { attributes: true, childList: true, subtree: true };
                // Callback function to execute when mutations are observed
                let callback1 = function(mutationsList, observer) {
                    // Use traditional 'for loops' for IE 11
                    for(let mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            console.log('A child node has been added or removed.');
                        }
                        else if (mutation.type === 'attributes') {
                            jumpToPage(currentPage)
                            let expectedLength = parseInt(btnPaginate[btnPaginate.length - 1].value) * 3
                            let currentlength = groceryItems.length
                            if(currentlength === expectedLength - 3){
                                btnPaginate[btnPaginate.length - 1].remove()
                            }
                        }
                    }
                };
                // Create an observer instance linked to the callback function
                let observer1 = new MutationObserver(callback1);
                // Start observing the target node for configured mutations
                observer1.observe(stay, config1);


                btnPaginate[0].classList.add('paginationActive')                         

                for (let i = 0; i < btnPaginate.length; i++) {
                    
                    // handle page function
                    const handlePage = () => {
                        currentPage = parseInt(btnPaginate[i].value)
                        jumpToPage(currentPage)
                        
                        // dispatch active class like a menu
                        let currentActivePage = document.getElementsByClassName('paginationActive')
                        currentActivePage[0].className = currentActivePage[0].className.replace(' paginationActive', '')
                        btnPaginate[i].className += ' paginationActive'

                        for (let i = 0; i < deletePdt.length; i++) {                            
                            deletePdt[i].addEventListener('click', () => {
                                let totalLength = parseInt(btnPaginate[currentPage - 1].value) * 3    
                                if(groceryItems.length === totalLength - 3){
                                    currentPage = currentPage - 1
                                    listOfBtns.pop()
                                    jumpToPage(currentPage)
                                    btnPaginate[currentPage].remove()
                                }
                            })
                        }
                    } 
                    
                    // click page number
                    btnPaginate[i].addEventListener('click', handlePage)
                }

                // clicking Arrows
                // previous page
                btnPaginateLeft.addEventListener('click', () => {
                    if(btnPaginate[0].className.includes('paginationActive')){
                        return
                    }
                    currentPage = currentPage - 1
                    jumpToPage(currentPage)
                    btnPaginate[currentPage].classList.remove('paginationActive')
                    btnPaginate[currentPage - 1].classList.add('paginationActive')

                    for (let i = 0; i < deletePdt.length; i++) {
                        deletePdt[i].addEventListener('click', () => {
                            prevPage = currentPage - 1
                            let totalLength = parseInt(btnPaginate[currentPage - 1].value) * 3
                            if(groceryItems.length === totalLength - 3){
                                jumpToPage(prevPage)
                                btnPaginate[prevPage].remove()
                            }
                        })
                    }
                })

                //next page
                btnPaginateRight.addEventListener('click', () => {
                    let lastBtn = btnPaginate.length - 1
                    if(btnPaginate[lastBtn].className.includes('paginationActive')){
                        return
                    }
                    currentPage = currentPage + 1
                    jumpToPage(currentPage)
                    btnPaginate[currentPage - 2].classList.remove('paginationActive')
                    btnPaginate[currentPage - 1].classList.add('paginationActive')

                    for (let i = 0; i < deletePdt.length; i++) {
                        deletePdt[i].addEventListener('click', () => {
                            let totalLength = parseInt(btnPaginate[currentPage - 1].value) * 3
                            if(groceryItems.length === totalLength - 3){
                                currentPage = currentPage - 1
                                jumpToPage(currentPage)
                                btnPaginate[currentPage].remove()                                
                            }else if(groceryItems.length - 1){
                                jumpToPage(currentPage)
                                btnPaginate[currentPage - 1].classList.add('paginationActive')
                                let expectedLength = parseInt(btnPaginate[btnPaginate.length - 1].value) * 3
                                let currentlength = groceryItems.length
                                if(currentlength === expectedLength - 3){
                                    btnPaginate[btnPaginate.length - 1].remove()
                                }
                            }
                        })
                    }
                })
            }
        }else{
            return
        }
    }
})







