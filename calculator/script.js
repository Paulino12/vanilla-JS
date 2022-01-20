
let calcDisplay = document.getElementById('calcDisplay')
calcDisplay.innerHTML = "0"

let number = document.getElementsByClassName('number')

let selectVal = []
let valToCompute = []
let chosenOperator = ""
let totalResult = []

let lastValue = 0 // last value in total result array

for (let index = 0; index < number.length; index++) {
    number[index].addEventListener('click', () => {
        
        if(selectVal.join('').includes('.') && number[index].innerHTML === '.'){
            // avoid entering more than one dot
            return
        }else{
            // continue
            switch (chosenOperator) {
            case "addition":
                selectVal.push(number[index].innerHTML)
                calcDisplay.innerHTML = parseFloat(selectVal.join('')).toFixed(2)
                if(!lastValue){
                    totalResult.push(totalResult[0] + parseFloat(selectVal.join('')))
                }else{
                    totalResult.push(lastValue + parseFloat(selectVal.join('')))
                }
                break;

            case "substraction":
                selectVal.push(number[index].innerHTML)
                calcDisplay.innerHTML = parseFloat(selectVal.join('')).toFixed(2)
                if(!lastValue){
                    totalResult.push(totalResult[0] - parseFloat(selectVal.join('')))
                }else{
                    totalResult.push(lastValue - parseFloat(selectVal.join('')))
                }
                break;

            case "multiplication":
                selectVal.push(number[index].innerHTML)
                calcDisplay.innerHTML = parseFloat(selectVal.join('')).toFixed(2)
                if(!lastValue){
                    totalResult.push(totalResult[0] * parseFloat(selectVal.join('')))
                }else{
                    totalResult.push(lastValue * parseFloat(selectVal.join('')))
                }
                break;
        
            case "division":
                selectVal.push(number[index].innerHTML)
                calcDisplay.innerHTML = parseFloat(selectVal.join('')).toFixed(2)
                if(!lastValue){
                    totalResult.push(totalResult[0] / parseFloat(selectVal.join('')))
                }else{
                    totalResult.push(lastValue / parseFloat(selectVal.join('')))
                }
                break;

            default:
                selectVal.push(number[index].innerHTML)
                calcDisplay.innerHTML = selectVal.join('')
                break;
            }
        }
       

    })

}

let delNumber = document.getElementById('delNumber')
        delNumber.addEventListener('click', () => {
            selectVal.pop()
            if(selectVal.length === 0) {
                calcDisplay.innerHTML = "0"
                calcDisplay.innerHTML = "0"
                selectVal = []
                valToCompute = []
                totalResult = []
                lastValue = parseFloat("")
                chosenOperator = ""
            }else{
                calcDisplay.innerHTML = selectVal.join('')
            }
        })

let resetDisplay = document.getElementById('resetDisplay')
resetDisplay.addEventListener('click', () => {
    calcDisplay.innerHTML = "0"
    selectVal = []
    valToCompute = []
    totalResult = []
    lastValue = parseFloat("")
    chosenOperator = ""
    showOps.innerHTML = ""
})

let ops = document.getElementsByClassName('ops')
let showOps = document.getElementById('showOps')
for (let i = 0; i < ops.length; i++) {
    ops[i].addEventListener('click', () => {
        if(!selectVal.join('')){
            return false
        }else{
            let icon = ops[i].innerHTML
            switch (icon) {
                case '<i class="fas fa-plus fa-lg fontAwesome"></i>':
                    chosenOperator = "addition"
                    showOps.innerHTML = '<i class="fas fa-plus fa-xs fontAwesome"></i>'
                    if(totalResult.length){
                        lastValue = totalResult[totalResult.length - 1]
                        calcDisplay.innerHTML = parseFloat(lastValue).toFixed(2)
                        selectVal = []
                    }else{
                        valToCompute.push(parseFloat(selectVal.join('')))
                        let addResult = valToCompute.reduce((acc, curr) => {
                            return acc += parseFloat(curr)
                        })
                        calcDisplay.innerHTML = parseFloat(addResult).toFixed(2)
                        totalResult.push(addResult)
                        selectVal = []
                    }
                    break
                
                case '<i class="fas fa-minus fa-lg fontAwesome"></i>':
                    chosenOperator = "substraction"
                    showOps.innerHTML = '<i class="fas fa-minus fa-xs fontAwesome"></i>'
                    if(totalResult.length){
                        lastValue = totalResult[totalResult.length - 1]
                        calcDisplay.innerHTML = parseFloat(lastValue).toFixed(2)
                        selectVal = []
                    }else{
                        valToCompute.push(parseFloat(selectVal.join('')))
                        let minusResult = valToCompute.reduce((acc, curr) => {
                            return acc -= parseFloat(curr)
                        })
                        calcDisplay.innerHTML = parseFloat(minusResult).toFixed(2)
                        totalResult.push(minusResult)
                        selectVal = []
                    }
                    break

                case '<i class="fas fa-times fa-lg fontAwesome"></i>':
                    chosenOperator = "multiplication"
                    showOps.innerHTML = '<i class="fas fa-times fa-xs fontAwesome"></i>'
                    if(totalResult.length){
                        lastValue = totalResult[totalResult.length - 1]
                        calcDisplay.innerHTML = parseFloat(lastValue).toFixed(2)
                        selectVal = []
                    }else{
                        valToCompute.push(parseFloat(selectVal.join('')))
                        let multiplyResult = valToCompute.reduce((acc, curr) => {
                            return acc *= parseFloat(curr)
                        })
                        calcDisplay.innerHTML = parseFloat(multiplyResult).toFixed(2)
                        totalResult.push(multiplyResult)
                        selectVal = []
                    }
                    break
                
                case '<i class="fas fa-divide fa-lg fontAwesome"></i>':
                    chosenOperator = "division"
                    showOps.innerHTML = '<i class="fas fa-divide fa-xs fontAwesome"></i>'
                    if(totalResult.length){
                        lastValue = totalResult[totalResult.length - 1]
                        calcDisplay.innerHTML = parseFloat(lastValue).toFixed(2)
                        selectVal = []
                    }else{
                        valToCompute.push(parseFloat(selectVal.join('')))
                        let divisionResult = valToCompute.reduce((acc, curr) => {
                            return acc /= parseFloat(curr)
                        })
                        calcDisplay.innerHTML = parseFloat(divisionResult).toFixed(2)
                        totalResult.push(divisionResult)
                        selectVal = []
                    }
                    break
            
                default:
                    break;
            }
        }
    })
}

let calcResult = document.getElementById('calcResult')
calcResult.addEventListener('click', () => {
    let val = totalResult[totalResult.length - 1]
    if(!val){
        return false
    }else{
        showOps.innerHTML = '<i class="fas fa-equals fa-xs fontAwesome"></i>'
        calcDisplay.innerHTML = parseFloat(val).toFixed(2)
    }
})











