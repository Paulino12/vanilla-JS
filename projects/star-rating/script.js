

const icons = document.getElementsByClassName("icon")
const stars = document.querySelector('#stars')

for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("click", () => {
        
        if(icons.item(i).firstElementChild.classList.contains("iconColor")){
            for (let k = i ; k < icons.length; k++) {
                icons[k].firstElementChild.classList.remove("iconColor")
                icons[k].firstElementChild.classList.add("fa-regular")
            }
            stars.innerText = i
        }else{
            for (let j = 0; j <= i; j++) {
                icons.item(j).firstElementChild.classList.add("iconColor")
            }
            stars.innerText = i + 1
        }
    })
}

