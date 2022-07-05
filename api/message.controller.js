module.exports = {
  msg: (res, message = "OK", data, paginate, status = true) => {
    if (paginate) {
      return res.json({
        success: status,
        message: message,
        data: data,
        paginate: paginate,
      });
    }
    if (status)
      return res.json({
        success: status,
        message: message,
        data: data,
      });
    return res.json({
      success: status,
      message: message,
    });
  },
};
