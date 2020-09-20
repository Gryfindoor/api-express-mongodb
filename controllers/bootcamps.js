const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async.js");
const ErrorRessponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocoder");

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;  

  let queryStr = JSON.stringify(req.query);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);  
  query = Bootcamp.find(JSON.parse(queryStr)); 
  const bootcamp = await query;
  res
    .status(200)
    .json({ status: true, length: bootcamp.length, data: bootcamp });
});

exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    new ErrorRessponse(`Bootcamp not found with id of ${req.params.id}`, 404);
  }

  res.status(200).json({ status: true, data: bootcamp });
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const bootcamp = await Bootcamp.create(req.body);

  if (!bootcamp) {
    new ErrorRessponse(`Bootcamp not found with id of ${req.params.id}`, 404);
  }

  res.status(201).json({ status: true, data: bootcamp });
});

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    new ErrorRessponse(`Bootcamp not found with id of ${req.params.id}`, 404);
  }
  res.status(200).json({ status: true, data: bootcamp });
});

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    new ErrorRessponse(`Bootcamp not found with id of ${req.params.id}`, 404);
  }

  res.status(200).json({ status: true, data: bootcamp });
});

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  const radius = distance / 6378;
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
