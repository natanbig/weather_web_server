const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const app = new Koa();
const router = new Router()
const serve = require('koa-static')
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const render = require('koa-ejs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app
    .use(serve(__dirname + '../../public'))

render(app, {
    root: templatesPath,
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: false,
    async: true
})


router
    .get('/', async ctx => {
        await ctx.render('index', {title: 'Home', name: 'Natan Radostin'})
    })
    .get('/about', async ctx => {
        let pic = {src: 'img/mypic.jpg', name: 'Natan Radostin'}
        await ctx.render('about', {pic, title: 'About me', name: 'Natan Radostin'})
    })
    .get('/help', async ctx => {
        await ctx.render('help', {
            helpText: 'This is some helpful text',
            title: 'Help',
            name: 'Natan Radostin'
        })
    })
    .get('/help/*', async ctx => {
        await ctx.render('404', {
            title: '404',
            errorMessage: 'Help article not found',
            name: 'Natan Radostin'
        })
    })
    .get('/weather', async function (ctx) {
        let city = ctx.query.address
        if (!city) {
            return ctx.body = {
                error: 'You must provide a address'
            }

        }
        return new Promise((resolve, reject) => {
            geocode(city, (error, data) => {
                if (data.cod === '404') {
                    console.log(data)
                    return reject(data)
                }
                    forecast(data.coord.lon, data.coord.lat, (error, data) => {
                        let description = data.weather[0].description
                        if (error) return reject(error.message)
                        let geoData = {
                            forecast: description,
                            location: data.sys.country,
                            address: city
                        }
                        console.log(geoData);
                        ctx.body = geoData;
                        resolve()
                    })
            });
        }).catch(err => ctx.body = err)


    })
    .get('/product', async ctx => {
        if (!ctx.query.search) {
            ctx.body = {
                error: 'You must provide a search term'
            }
        } else {
            console.log(ctx.query.search)
            ctx.body = {
                products: []
            }

        }
    })
    .get('*', async ctx => {
        await ctx.render('404', {
            title: '404',
            errorMessage: 'Page not found',
            name: 'Natan Radostin'
        })
    })

app
    .use(router.routes())
    .listen(8000)