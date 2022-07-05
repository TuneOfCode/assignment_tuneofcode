const { PAGE, LIMIT } = require("./constant");

const pagination = async (
  table,
  page = PAGE,
  limit = LIMIT,
  condition = {}
) => {
  const offset = (page - 1) * limit;
  try {
    const records = await table.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
    });
    const rows = records.count;
    const pages = Math.ceil(rows / limit);
    const paginate = {
      limit: limit,
      total_record: rows,
      page: page,
      total_page: pages,
    };
    if (page < offset)
      return { data: [{ message: "No data" }], paginate: paginate };
    return { data: records.rows, paginate: paginate };
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

module.exports = pagination;
