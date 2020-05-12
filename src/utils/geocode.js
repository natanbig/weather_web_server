const https = require('https');


module.exports =   (address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=33dcbf19a94e1ca2aa54a41b6ca22f41`
    https.get(url, res => {
        let data = ''
        res.on("data", chunk => {
            data += chunk
            console.log('Read from buffer')
        })
        res.on('error', err => {
            callback(err)
        })

        res.on('end', () => {
            callback('', JSON.parse(data))
        })
    })
}

