//Server-side JS 

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define Paths for Express config
const publicDIRPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs') //handlbars
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDIRPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Ernan Santos"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Ernan Santos"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Ernan Santos",
        message: "This is a sample message"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })
        })
    })
})


//404 Page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        name: "Ernan Santos",
        errorMessage: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        name: "Ernan Santos",
        errorMessage: "Page not found."
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


// same as app.use - code above
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//             name: 'Ernan',
//             Age: 31
//         },
//         {
//             name: 'Marley',
//             Age: 4
//         }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })
