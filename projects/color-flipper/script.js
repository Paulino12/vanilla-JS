
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

// generate rgb from 6 values
const hexToRgb6 = (inputValue) => {
    let index1 = colorDigits.findIndex(elt => elt === inputValue[0])
    let index2 = colorDigits.findIndex(elt => elt === inputValue[2])
    let index3 = colorDigits.findIndex(elt => elt === inputValue[4])

    let indexA = colorDigits.findIndex(elt => elt === inputValue[1])
    let indexB = colorDigits.findIndex(elt => elt === inputValue[3])
    let indexC = colorDigits.findIndex(elt => elt === inputValue[5])

    let a = (index1 * 16) + indexA
    let b = (index2 * 16) + indexB
    let c = (index3 * 16) + indexC

    if(a === -17 || b === -17 || c === -17){
        return ``
    }else{
        return `(${a}, ${b}, ${c})`
    }

}

hexInput.addEventListener('input', (e) => {
    let thisInput = e.target.value
   if(thisInput.length === 3){
        if(hexToRgb3(thisInput) === ''){
            notification.innerHTML = "Does not exists"
            notification.classList.add('alert', 'alert-danger', 'mb-0', 'p-2', 'rounded')
        }else{
            areaColor.style.backgroundColor = `#${thisInput}`
            rgbValues.innerHTML = hexToRgb3(thisInput)
        }
    }else if(thisInput.length === 6){
        if(hexToRgb6(thisInput) === ''){
            notification.innerHTML = "Does not exists"
            notification.classList.add('alert', 'alert-danger', 'mb-0', 'p-2', 'rounded')
        }else{
            areaColor.style.backgroundColor = `#${thisInput}`
            rgbValues.innerHTML = hexToRgb6(thisInput)
        }
    }else{
        areaColor.style.backgroundColor = `#fff`
        rgbValues.innerHTML = ""
        notification.innerHTML = ""
        notification.classList.remove('alert', 'alert-danger', 'mb-0', 'p-2', 'rounded')
        return
    }
})