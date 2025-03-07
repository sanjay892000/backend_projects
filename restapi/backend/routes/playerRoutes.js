const express = require('express')
const allPlayers = require('../indiancricketteam.json');
const playersModel = require('../schemas/players.model')
const router = express.Router();
require('dotenv').config();

router.post('/addplayers', async (req, res) => {
    try {
        const apikey = process.env.API_KEY
        if (apikey == req.query.apikey) {
            await playersModel.create(allPlayers)
            res.send('Players added successfully')
        } else {
            res.send('Invalid API Key')
        }
    } catch (error) {
        console.error(error)
    }

})
router.get('/allplayers', async (req, res) => {
    try {
        const { role, birth, country, } = req.query
        let filter = {}
        if (role) {
            filter.role = role;
        }
        if (birth) {
            filter.birth_place = birth;
        }
        if (country) {
            filter.country = country;
        }
        console.log(filter)
        const players = await playersModel.find(filter)
        res.send(players)

    } catch (error) {
        console.error(error)
    }

})

router.delete('/deleteplayers/:playerid', async (req, res) => {
    try {
        console.log(req.params.playerid)
        await playersModel.findByIdAndDelete(req.params.playerid);
        res.send('Player deleted successfully')
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;