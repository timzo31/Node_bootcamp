const express = require('express');
const tourController = require('./../controllers/tourController');
// const {
//   getAllTours,
//   getTour,
//   createTour,
//   updateTour,
//   deleteTour,
// } = require('../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkID);

// Create a checkBody Middleware
// check if the bodycontains the name and price poperty
// If not, send back 400 (bad request)
// Add it to the POST Handler stack

// router.param('body', tourController.checkBody);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
