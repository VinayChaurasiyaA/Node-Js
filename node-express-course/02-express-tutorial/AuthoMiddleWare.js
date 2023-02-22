const express = require("express");
///Express IS NOTHING BUT A COMBINATION OF ALL THE MIDDLEWARES
const authorize = require('./authorize')
const app = express();
const port = 5000;
//////// IN MIDDLEWARE EITHER YOU PASS IT INTO NEXT  MIDDLEWARE OR YOU SEND YOUR OWN RESPONSE
/////////// REQ => MIDDLEWARE => RESPONSE
const logger = function (req, res, next) {
  const method = req.method;
  const url = req.url;
  console.log("logging", method, url);
  next();
};
// if we'll provide path in it it'll work on everything whichever has a prefix of that
app.use([logger , authorize]) // this is used so instead of always typing logger we can still use it

app.get("/", (req, res) => {
  // Instead of writing everything and you are supposed to do in another call backs then it's best to use MIDDLEWARE
  res.send("Hello World!");
});

app.get("/about", logger, (req, res) => {
  res.send("I am about");
});
//app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
