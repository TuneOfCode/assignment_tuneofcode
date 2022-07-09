module.exports = {
  msg: (res, message = "OK", data, paginate, code = 200, status = true) => {
    // setTimeout(() => {
    if (paginate) {
      return res.status(code).json({
        success: status,
        statusCode: code,
        message: message,
        data: data,
        paginate: paginate,
      });
    }
    if (status)
      return res.status(code).json({
        success: status,
        statusCode: code,
        message: message,
        data: data,
      });
    return res.status(code).json({
      success: status,
      statusCode: code,
      message: message,
    });
    // }, 1000);
  },
};
