
let hexInput = document.querySelector('#hexInput')
let areaColor = document.querySelector('#areaColor')
let rgbValues = document.querySelector('#rgbValues')
let notification = document.querySelector('#notification')

let colorDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

const reset = () => {
    areaColor.style.backgroundColor = `#fff`
    rgbValues.innerHTML = ""
    notification.innerHTML = ""
}

// generate rgb from 3 hex values
const hexToRgb3 = (inputValue) => {
    let index1 = colorDigits.findIndex(elt => elt === inputValue[0])
    let index2 = colorDigits.findIndex(elt => elt === inputValue[1])
    let index3 = colorDigits.findIndex(elt => elt === inputValue[2])

    let a = (index1 * 16) + index1
    let b = (index2 * 16) + index2
    let c = (index3 * 16) + index3
    if(a === -17 || b === -17 || c === -17){
        return ``
    }else{
        return `(${a}, ${b}, ${c})`
    }
}

hexInput.addEventListener('input', (e) => {
    let thisInput = e.target.value
    if(thisInput.length !== 3){
        areaColor.style.backgroundColor = `#fff`
        rgbValues.innerHTML = ""
        notification.innerHTML = ""
        return
    }else{
        if(hexToRgb3(thisInput) === ''){
            notification.innerHTML = "Does not exists"
        }else{
            areaColor.style.backgroundColor = `#${thisInput}`
            rgbValues.innerHTML = hexToRgb3(thisInput)
        }
    }
})