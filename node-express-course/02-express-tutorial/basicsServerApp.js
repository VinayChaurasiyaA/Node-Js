const http = require("http");
const { readFileSync } = require("fs");

const homepage = readFileSync("./index.html");

// without res.end() the webpage will keep loading and it'll never stoop
const server = http.createServer((req, res) => {
  //res.write('Welcome to our home page');
  console.log(req.url);
  const url = req.url;
  if (url === "/") {
    // res.writeHead is going to make significance for only writing Header of the below html
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homepage);
    //res.end();
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<h1>About Page</h1>");
    //res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>page not found</h1>");
    // res.end();
  }
  res.end();
  //   console.log('user hit the server')
});

server.listen(5000);
