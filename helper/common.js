const response = (res, result, status, message, pagination) => {
  const resultPrint = {};
  let statusName = "";

  //Set status based on statuscode
  if (status >= 100 && status < 200) {
    statusName = "informational";
  } else if (status >= 200 && status < 300) {
    statusName = "success";
  } else if (status >= 300 && status < 400) {
    statusName = "redirectional";
  } else if (status >= 400 && status < 500) {
    statusName = "client error";
  } else if (status >= 500 && status < 600) {
    statusName = "server error";
  }
  
  resultPrint.status = statusName;
  resultPrint.statusCode = status;
  resultPrint.data = result;
  resultPrint.message = message || null;
  resultPrint.pagination = pagination || {};
  res.status(status).json(resultPrint);
};

module.exports = {response}
