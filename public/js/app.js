//Client-side JS

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const getWeather = (loc) => {
    //fetch('http://localhost:3000/weather?address=' + loc).then((response) => {
    fetch('/weather?address=' + loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                //console.log(data.error)
            } else {
                // console.log(data.location)
                // console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    const location = search.value
    getWeather(location)
})