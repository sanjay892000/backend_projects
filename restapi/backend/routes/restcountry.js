const express = require('express');
const restCountry = require('../schemas/restcountry.model');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const data = await restCountry.find({})
        return res.json({
            status: 200,
            total_results: data.length,
            results: data
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error fetching data',
        })
    }
})
router.get('/region/:regname', async (req, res) => {
    try {
        const data = await restCountry.find({ region: req.params.regname })
        return res.json({
            status: 200,
            total_results: data.length,
            results: data
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'Error fetching data',
        })
    }
})

module.exports = router;