const express = require('express');
const {generateShortURL,visitByShortid,getAnalytics} = require('../controllers/url');
const router = express.Router();


//creation of the url
// '/' === /URL
router.post('/',generateShortURL);
router.get('/:shortId',visitByShortid);
router.get('/analytics/:shortId',getAnalytics);
module.exports = router;