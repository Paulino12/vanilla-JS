
const toggleMenu = document.querySelector('.toggleMenu')
const openMenu = document.querySelector('.toggleOpen')
const closeMenu = document.querySelector('.toggleClose')

const menuLevel2 = document.querySelector('.menuLevel2')

toggleMenu.addEventListener('click', () => {
    if(!toggleMenu.classList.contains('opened')){
        toggleMenu.classList.add('opened')
        openMenu.style.display = "none"
        closeMenu.style.display = "flex"
        menuLevel2.classList.add('opened')  
    }else{
        toggleMenu.classList.remove('opened')
        openMenu.style.display = "flex"
        closeMenu.style.display = "none"
        menuLevel2.classList.remove('opened')
    }
})