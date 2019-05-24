const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')
const request = require('request')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const port = 3100

app.listen(port, () => {
    console.log(`server is running at port: ${port}`)
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/recpatcha', (req, res) => {
    res.render('recpatcha')
})

app.post('/captcha', function (req, res) {
    console.log('inside capthca post method...')
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({ "responseError": "Please select captcha first" });
    }
    const secretKey = "6Lc2GKUUAAAAAIZImGsIx0FSLwFyCE3IZfa4yzbX";
    console.log(`g-recaptcha response: ${req.body['g-recaptcha-response']}`)
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    axios.get(verificationURL).then((result) => {
        console.log(`response: ${result}`)
        res.json({ 'responseSuccess': 'success' })
    })
        .catch(err => {
            res.json({ 'responseError': 'Failed captcha verification' })
        })
});

app.post('/captchaInvisible', function (req, res) {
    console.log(`g-recaptcha response: ${req.body['g-recaptcha-response']} name: ${req.body['name']}  token: ${req.body['token']}`)
    console.log('inside captchaInvisible post method...')
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({ "responseError": "Please select captcha first" });
    }
    const secretKey = "6LcAFaUUAAAAAJTkiMXo6zC4oMG4aYGZq6wqrDLr";
  
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    axios.get(verificationURL).then((result) => {
        console.log(`response: ${result}`)
        res.json({ 'responseSuccess': 'success' })
    })
        .catch(err => {
            res.json({ 'responseError': 'Failed captcha verification' })
        })
});