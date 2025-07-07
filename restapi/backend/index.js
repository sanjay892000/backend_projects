const express = require('express')
const app = express();
const playerRouter = require('./routes/playerRoutes.js');
const connectToDB = require('./database.js');
const cors = require('cors');
require('dotenv').config()
const country = require('./restcountry.json');
const newConutry = require('./newCountryData.json')

const restCountry = require('./schemas/restcountry.model.js');

connectToDB();
app.use(cors());

app.get('/', async (req, res) => {
    /*     await restCountry.deleteMany({}) // Clear the collection before inserting new data
        const data = await restCountry.insertMany(newConutry)
    console.log(data) */
    /*    const newData = await restCountry.find({}).select({name: 1, capital: 1, region: 1, subregion: 1, population: 1, area: 1, languages: 1, flags: 1, currencies: 1, map: 1, 
    independent:1, status:1}).sort({name:1, capital:-1}) */
    res.json({
        message: 'Welcome to the API',
    })
})

app.use('/api/indian/cricket/team', playerRouter)
app.use('/api.restcountry/v3', require('./routes/restcountry.js'))

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})