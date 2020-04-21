const request = require('request')
const getWeather = (lat, lon, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a051eff7663ad41e797e30eb9cac6e60`
    request({url: url,json: true}, (error,response) =>{
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else {
             callback(undefined,`Today, It's about to ${response.body.main.temp} and like ${response.body.main.feels_like} degree F`)
            
        }
    })
}




module.exports = getWeather