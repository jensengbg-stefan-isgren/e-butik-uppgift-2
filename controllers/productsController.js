//database
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);

//getting all the products from the database
exports.getProducts = (request, response) => {
  let data = database.get("products").value();

  let message = {
    status: "success",
    message: "getting all the products",
    data: data
  };
  response.send(message);
};
