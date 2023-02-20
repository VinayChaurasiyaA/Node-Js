const express = require("express");
const app = express();
const port = 5000;

const { products } = require("./data");

// app.get('/' , (req , res) => {
//     res.json(products)
// })
app.get("/", (req, res) => {
  res.send('<h1>Home page</h1> <a href ="/api/products">Click on me </a>');
});
//  // if user want all of the data
// app.get('/api/products' , (req , res) => {
//     res.json(products)
// })
//  // instead of returing everything
// app.get('/api/products' , (req , res) => {
//     const newProducts = products.map((product) => {
//         const {id , name , image} = product;
//         return {id , name , image};
//     })
//     res.json(newProducts);
// })

// // if i wanna get with some id
// app.get('api/products/1' , (req , res) => {
//     const single = products.find((product) => product.id === 1)

//     res.json(single)
// })

// best way to get some products with id is
// app.get("/api/products/:productID", (req, res) => {
//   console.log(req.params);
//   console.log(products);
//   const { productID } = req.params;

//   const single = products.find((product) => product.id === Number(productID));
//   if(!single) {
//     return res.status(404).send('Profuct not found')
//   }
//   console.log(single);
//   res.json(single);
// });

// when we have querys like api/version/query?search=vinay&limit=1 then
///////// In express we cannot send more than 1 responses in a same request

app.get('/api/v1/query' , (req , res)=> {
  //console.log(req.query); // it'll take data set which ever wrote after query in link as in objects
  // all objects will be in form of strings
  const {search , limit} = req.query;
  let sortedProducts = [...products];

  if(search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    })
  }
  if(limit) {
    sortedProducts = sortedProducts.slice(( 0 , Number(limit)))
  }
  if(sortedProducts.length <1) {
   // res.status(200).send('Dont have enogh data')
   return res.status(200).json({success : true , data : []})
  }
  res.status(200).json(sortedProducts)
//  res.send('it working')
})

//app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
