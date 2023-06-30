const express = require("express");
const path = require("path");
//const {readFileSync} = require('fs')
const app = express();
const port = 5000;

app.use(express.static('./public'))
//const read = readFileSync('./navbar-app/index.html');
// there are following methods
// app.get
// app.listen
// app.post
// app.set
// app.put
// app.all
// app.delete
// app.use
app.get("/", (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, "./navbar-app/index.html"))
);
app.get("/about", (req, res) => {
  res.status(200).send("About page");
});
// other than this all if there is anything then,

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found</h1>");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
