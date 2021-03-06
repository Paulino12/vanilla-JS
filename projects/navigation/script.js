
let sideBar = document.querySelector('.sideBar')
let mainContent = document.querySelector('.mainContent')

let togglingIcon = document.querySelector('.togglingIcon')
let arrowIcon = document.querySelector('.arrowIcon')
let barIcon = document.querySelector('.barIcon')

let menu = document.querySelector('.menu')
let currentPage = document.querySelector('#currentPage')

let menuItems = document.getElementsByClassName('menuItems')
let menuIcon = document.getElementsByClassName('menuIcon')
let menuTitle = document.getElementsByClassName('menuTitle')

for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', () => {
        let current = document.getElementsByClassName("active")
        current[0].className = current[0].className.replace(" active", "")
        menuItems[i].className += " active"
    })
}

const miniSideBar = (sideWidth, mainWidth) => {
    sideBar.style.width = sideWidth
    mainContent.style.width = mainWidth

    // toogle div to center bar icon
    togglingIcon.classList.add('centerBarIcon')

    // icons display
    arrowIcon.style.display = "none"
    barIcon.style.display = "inherit"

    // menu items
    for (let i = 0; i < menuTitle.length; i++) {
        menuTitle[i].style.display = "none"
    }
    for (let i = 0; i < menuIcon.length; i++) {
        menuIcon[i].style.width = "100%"
    }

    sideBar.style.transition = 'all 1s'
    mainContent.style.transition = 'all 1s'
}

const largeSideBar = () => {
    sideBar.style.width = "25%"
    mainContent.style.width = "75%"

    // remove toogle div centering bar icon
    togglingIcon.classList.remove('centerBarIcon')

    // icons display
    barIcon.style.display = "none"
    arrowIcon.style.display = "inherit"

    // menu items
    for (let i = 0; i < menuTitle.length; i++) {
        // delay appearance of title on expanding
        setTimeout(() => {
            menuTitle[i].style.display = "inherit"
        }, 250);
    }
    for (let i = 0; i < menuIcon.length; i++) {
        menuIcon[i].style.width = "25%"
    }

    sideBar.style.transition = 'all 1s'
    mainContent.style.transition = 'all 1s'
}

const screenChange = (e) => {
    if(e.matches){
        miniSideBar('15%', '85%')
    }else{
        largeSideBar()
    }
}

const mediaQuery = window.matchMedia('(max-width: 768px)')

mediaQuery.addEventListener('change', screenChange)

arrowIcon.addEventListener('click', () => {
    arrowIcon.classList.add('clickedToggleIcon')
    miniSideBar('5%', '95%')
    
})

barIcon.addEventListener('click', () => {
    barIcon.classList.add('clickedToggleIcon')
    largeSideBar()
})