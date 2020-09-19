const Bootcamp = require("../models/Bootcamp");
const asyncHandler = require("../middleware/async.js");
const ErrorRessponse = require("../utils/errorResponse");

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.find();
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
