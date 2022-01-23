
let mainBg = document.querySelector('.mainBg')
let loader = document.querySelector('.loader')

// initial
let opacityVal = 0

let myInterval = setInterval(() => {

    loader.innerText = `${opacityVal++}%`
    loader.style.opacity = scale(opacityVal, 0, 100, 1, 1)
    mainBg.style.filter = `blur(${scale(opacityVal, 0, 100, 10, 0)}px)`
    
    if(opacityVal === 100){
        loader.innerHTML = ""
        clearInterval(myInterval)
    }

    

}, 30);

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }