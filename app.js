// require express packages used in the project
const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// require express-handlebars here
const exphbs = require('express-handlebars')
// setting of  template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting of index page
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// routes setting for search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurants: restaurants, keyword: keyword})
})

// routes setting of show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant})
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})