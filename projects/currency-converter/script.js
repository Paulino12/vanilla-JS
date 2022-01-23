let currencyConvert = document.querySelector('#currencyConvert')
let selectA = document.querySelector('#selectA')
let selectB = document.querySelector('#selectB')
let currNameA = document.querySelector('#currNameA')
let currNameB = document.querySelector('#currNameB')

let currencies = []

let currencySymbols = []
let currencyNames = []

let selectedSymbolA = document.querySelector('#selectedSymbolA')
let selectedSymbolB = document.querySelector('#selectedSymbolB')

let inputA = document.querySelector('#inputA')

let convertRates = document.querySelector('#convertRates')

let resume = document.querySelector('.resume')

let currentDate = new Date()

async function currencyList() {

    let response = await fetch("https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
            "x-rapidapi-key": "bcf8f46a49msh87f48473fdb7b90p126c0fjsn49fba50b855f"
        }
    })

    let data = await response.json()

    return data
}

//  fetching currencies rates
async function currencyRates() {
    let response = await fetch(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${selectedSymbolA.value}&to=${selectedSymbolB.value}&amount=${inputA.value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
            "x-rapidapi-key": "bcf8f46a49msh87f48473fdb7b90p126c0fjsn49fba50b855f"
        }
    })

    let data = await response.json()
    
    return data
}

// section A
currencyList()
    .then((response) => {
        let currSymbolA = Object.keys(response.symbols)
        selectedSymbolA.innerHTML = `
            <option value='Symbol'>From</option>
            ${currSymbolA.map((item, index) => {
                return `<option value=${item}>${item}</option>`
            })}
        `
        selectedSymbolA.addEventListener('change', (e) => {
            resume.innerText = "" //reset RESUME
            // select form data
            if(!response.symbols[e.target.value]){
                currNameA.innerText = "Country"
            }else{
                currNameA.innerText = response.symbols[e.target.value]
            }
        })
    })


// section B
currencyList()
    .then((response) => {
        let currSymbolB = Object.keys(response.symbols)
        selectedSymbolB.innerHTML = `
            <option value='Symbol'>To</option>
            ${currSymbolB.map((item) => {
                        return `<option value=${item}>${item}</option>`
                    })}
            `
        selectedSymbolB.addEventListener('change', (e) => {
            resume.innerText = "" // reset RESUME
            if(!response.symbols[e.target.value]){
                currNameB.innerText = "Country"
            }else{
                currNameB.innerText = response.symbols[e.target.value]
            }
        })
    })
// reset RESUME when input active
inputA.addEventListener('input', (e) => {
    resume.innerText = ""
})

// convert
convertRates.addEventListener('click', () => {
    // validation before converting eg: negative value
    if(inputA.value < 0) {
        alert("Negative values cannot be converted")
        inputA.value = ""
    }else if(inputA.value === ""){
        alert("You did not enter a value to be converted")
    }
    else{
        // currency pair rates
        currencyRates()
        .then((response) => {
            if(selectedSymbolA !== selectedSymbolB){
                resume.innerHTML = `
                        <div>
                            <p class="valueFrom fs-6 mb-0">${inputA.value} ${selectedSymbolA.value} (${currNameA.innerText}) is equivalent to </p>
                        </div>
                        <div><p class="resultValue mb-0 fs-1 fw-bold">${parseFloat(response.result).toFixed(2)} ${selectedSymbolB.value} (${currNameB.innerText})</p></div>
                        <div class="date text-muted">${currentDate.toLocaleString()}</div>
                `
            }
        })
    }
})


