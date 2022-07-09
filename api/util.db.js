const { PAGE, LIMIT } = require("./constant");

const pagination = async (
  table,
  page = PAGE,
  limit = LIMIT,
  condition = {},
  attributes = [],
  include = []
) => {
  const offset = (page - 1) * limit;
  try {
    const records = await table.findAll({
      where: condition,
      limit: limit,
      offset: offset,
      distinct: true,
      attributes: attributes,
      include: include,
    });
    const AllRecord = await table.findAll({
      where: condition,
    });
    const rows = AllRecord.length;
    const pages = Math.ceil(rows / limit);
    const paginate = {
      limit: limit,
      total_record: rows,
      page: page,
      total_page: pages,
    };
    if (page > pages)
      return { data: [{ message: "No data" }], paginate: paginate };
    return { data: records, paginate: paginate };
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};

module.exports = pagination;
