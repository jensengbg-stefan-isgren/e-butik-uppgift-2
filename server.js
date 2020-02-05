//variables
const app = require("./app");
const database = require("./database-operations");
const port = process.env.port || 8000;
const host = "localhost";

//starting up the server
app.listen(port, host, () => {
  database.checkDB();
  console.log(
    `Firing up the server on ${host} at port ${port} http://${host}:${port}`
  );
});
