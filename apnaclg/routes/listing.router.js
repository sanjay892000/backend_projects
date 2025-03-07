const express = require('express');
const listingModel = require('../schemas/listing.model');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('listing/home');
})
router.get('/listing', async (req, res) => {
    try {
        const listings = await listingModel.find({});
        res.render('listing/listing', { listings });
    } catch (error) {
        console.error(`Error getting listings: ${error}`);
    }
});
router.get('/listing/:listid', async (req, res) => {
    try {
        console.log(req.params)
        const showListing = await listingModel.findById(req.params.listid);
        res.render('listing/showlisting', { showListing });
    } catch (error) {
        console.error(`Error getting listings: ${error}`);
    }
});
router.get('/about', async (req, res) => {
    try {
        res.render('listing/about');
    } catch (error) {
        console.error(`Error getting listings: ${error}`);
    }
});

router.get('/addlisting', async (req, res) => {
    try {
        res.render('listing/addlisting');
    } catch (error) {
        console.error(`Error adding listing: ${error}`);
    }
});

router.post('/listing/newlisting', async (req, res) => {
    try {
        console.log(req.body.listing)
        await listingModel.create(req.body.listing)
        res.redirect('/listing');

    } catch (error) {

    }
})
    ;
module.exports = router;