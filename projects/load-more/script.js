
// fetch data from json placeholder
const fetchData = async () => {

    const response = await fetch('https://jsonplaceholder.typicod.com/posts')
    const data = await response.json()

    return data
}

fetchData().then((response) => {
    console.log(response.map((item) => {
        return item.id
    }))
})
.catch((error) => { console.log(error.message) })