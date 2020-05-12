const https = require('https');

module.exports = (altitude, lattitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=` + lattitude + `&lon=` + altitude + `&units=metric` + `&appid=33dcbf19a94e1ca2aa54a41b6ca22f41`
    let data = ''

    https.get(url, res => {
        res.on("data", chunk => {
            data += chunk
            console.log('Read from buffer')
        })
        res.on('error', err => {
            return callback(err)
        })

        res.on('end', () => {
            callback('', JSON.parse(data))
        })

    })
}