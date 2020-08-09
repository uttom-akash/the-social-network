const IError = require("../models/IError");
let mongoose = require("mongoose");

function iExceptionsMiddleware(err, req, res, next) {
  console.error(err);

  let iError;
  if (err instanceof IError) {
    iError = err;
  } else if (err instanceof mongoose.mongo.MongoError) {
    iError = handleMongoError(err);
  } else {
    iError = new IError({ statusCode: 500, statusMessage: err.message });
  }
  res.status(iError.statusCode).json(iError);
}

function handleMongoError(err) {
  let statusCode = 500,
    statusMessage;
  switch (err.code) {
    case 11000:
      let duplicateKey = Object.keys(err.keyValue)[0];
      statusMessage = `${duplicateKey} "${err.keyValue[duplicateKey]}" is already in use`;
      break;
    default:
      statusMessage = "something unexpected happened";
      break;
  }
  return new IError({ statusCode, statusMessage });
}

module.exports = iExceptionsMiddleware;
