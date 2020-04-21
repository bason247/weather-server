const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getLocation = require('./utils/getLocation')
const getWeather = require('./utils/getWeather')

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead',
        helptext : 'GIup'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an add'
        })
    } 
    // res.send({
    //     forecast: 'it is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
    getLocation(req.query.address,(error,data) => {
        if (error) {
            return res.send(error)
        }
        getWeather(data.latitude,data.longitude,(error,temp) => {
            if (error) {
                  return res.send(error)
            }
            res.send({
                weather: temp,
                location: data.location,
                address: req.query.address
            })

        })
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'About me',
        name: 'Andrew Mead',
        erroText: 'Loi he thong'
    })
})
console.log(publicDirectoryPath)

const address =
app.listen(3000)
