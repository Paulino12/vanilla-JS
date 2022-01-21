

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
let inputB = document.querySelector('#inputB')

let resume = document.querySelector('.resume')

let currentDate = new Date()

// let foundCurrSymbol = ""

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
let countryNameA = ""
let countryNameB = ""
currencyList()
    .then((response) => {
        
        let currSymbolA = Object.keys(response.symbols)
        selectedSymbolA.innerHTML = `
            <option value='Symbol'>Symbol</option>
            ${currSymbolA.map((item, index) => {
                return `<option value=${item}>${item}</option>`
            })}
        `
        selectedSymbolA.addEventListener('change', (e) => {
            // select form data
            if(!response.symbols[e.target.value]){
                currNameA.innerText = "Country"
            }else{
                currNameA.innerText = response.symbols[e.target.value]
            }
            // currency pair rates
            currencyRates()
                .then((response) => {
                    if(!response.result){
                        inputB.value === ""
                    }else{
                        inputB.value = parseFloat(response.result).toFixed(2)
                        if(selectedSymbolA !== selectedSymbolB){
                            resume.innerHTML = `
                                    <div>
                                        <p class="valueFrom fs-6 mb-0">${inputA.value} ${selectedSymbolA.value} (${response.symbols[e.target.value]}) is equivalent to </p>
                                    </div>
                                    <div><p class="resultValue fs-1 fw-bold">${parseFloat(response.result).toFixed(2)} ${selectedSymbolB.value}</p></div>
                                    <div class="date text-muted">${currentDate.toLocaleString()}</div>
                            `
                        }
                    }
                })
            
        })
    })


// section B
currencyList()
    .then((response) => {
        
        let currSymbolB = Object.keys(response.symbols)
        selectedSymbolB.innerHTML = `
            <option value='Symbol'>Symbol</option>
            ${currSymbolB.map((item) => {
                        return `<option value=${item}>${item}</option>`
                    })}
            `
        selectedSymbolB.addEventListener('change', (e) => {
            if(!response.symbols[e.target.value]){
                currNameB.innerText = "Country"
            }else{
                currNameB.innerText = response.symbols[e.target.value]
            }

            // currency pair rates
            currencyRates()
                .then((response) => {
                    if(!response.result){
                        inputB.value === ""
                    }else{
                        inputB.value = parseFloat(response.result).toFixed(2)
                        if(selectedSymbolA !== selectedSymbolB){
                            resume.innerHTML = `
                                    <div>
                                        <p class="valueFrom fs-6 mb-0">${inputA.value} ${selectedSymbolA.value} is equivalent to </p>
                                    </div>
                                    <div><p class="resultValue fs-1 fw-bold">${parseFloat(response.result).toFixed(2)} ${selectedSymbolB.value}</p></div>
                                    <div class="date text-muted">${currentDate.toLocaleString()}</div>
                            `
                        }
                    }
                })
            

        })
    })


