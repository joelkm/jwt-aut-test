const Logger = require("./environment-logger");
const formatResponse = require("../common/format-response");

const handleError = (err, req, res) => {
  let statusCode = 400;
  if (err.apiError) {
    switch (err.name) {
      case "Bad Request":
        statusCode = 400;
        break;
      case "Validation":
        statusCode = 422;
        break;
      case "Not Found":
        statusCode = 404;
        break;
      case "Authorization":
        statusCode = 401;
        break;
      case "Forbidden":
        statusCode = 403;
        break;
      default:
        statusCode = 500;
        break;
    }
    console.log(`${statusCode} Status Error --> ${err.name}: ${err.message}`);
  } else {
    console.log(`${statusCode} Status Error --> ${err.name}: ${err.stack}`);
  }
  res.status(statusCode).json({error: err.message})
};

module.exports = handleError;
