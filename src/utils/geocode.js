const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXJzYW4xNDgiLCJhIjoiY2tkNWNwcDI1MDlwczJ3cGdpandvcWoxOSJ9.IRwTITTSlOHGw38wkqC_sw&limit=1'
    request({ url, json: true }, (error, {body}) => {       
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.features.length === 0) {
            callback('Location not found. Try another search', undefined)
        } else {
            //const {body.features[0].center[0]:longitude, body.features[0].center[1]:latitude, body.features[0].place_name:location} = response
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode