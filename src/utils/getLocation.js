const request = require('request')
const getLocation = (address, callback) => { 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW5kcmV3c29uIiwiYSI6ImNrOHNhZDlkMjBhMWcza3JzYzdvejluOWgifQ.CZd568jhVijq9PNTSOkgmA'
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to conntect to location, ',undefined)

        } 
        // else if(response.body.features.length === 0) {
        //     callback('Unable to find location. Try another search.', undefined)

        // } 
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = getLocation