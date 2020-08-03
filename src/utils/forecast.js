const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=473c8f1cea150ed6064f8496f3d34fbf&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    //request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Location not found. Try another search', undefined)
        } else {
            //callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast


// const url = 'http://api.weatherstack.com/current?access_key=473c8f1cea150ed6064f8496f3d34fbf&query=16.3933011,120.5854561&units=m'
// request({ url: url, json: true }, (error, response) => {
//     // const data = JSON.parse(response.body)
//     // console.log(data.current)
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find the location. ' + response.body.error.info)
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
//     }
// })