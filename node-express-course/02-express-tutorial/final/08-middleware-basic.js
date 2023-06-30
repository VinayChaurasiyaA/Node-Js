const express = require('express')
const app = express()

//  req => middleware => res

const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()
  if(url !== "home") {
    // res.send("Welcome " + method);
    res.status(401).send('Unauthorized');
  }
  // console.log(method, url, time)

  // res.send(method , url , time);
  else {

    next()
  }
}

app.get('/', logger, (req, res) => {
  res.send("home")
})
app.get('/about', logger, (req, res) => {
  res.send('About')
  // res.send(method , url , time);
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
