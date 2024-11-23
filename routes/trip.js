const express = require('express');
const router = express.Router();

const {
    createTrip,
    getallTrips,
    getTrip,
    updateTrip,
    deleteTrip
} = require('../controllers/trip')


router.route('/')
    .post(createTrip)
    .get(getallTrips)
    


router.route('/:id')
    .get(getTrip)
    .patch(updateTrip)
    .delete(deleteTrip)


module.exports = router;

