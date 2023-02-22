const express  = require('express');
let {people} = require('./data')
const app = express()
// Static index.html
app.use(express.static('./methods-public'))
//Parse form data
app.use(express.urlencoded({extended : false})) // it'll help me to get the data which is been entered

app.use(express.json())
app.post('/login' , (req , res) => {
    const {name} = req.body;
    //console.log(req.body)
    if(name) {
        res.status(200).send(`Welcome to page : ${name}`)
    }
    res.status(401).send('User does not exist')
})
// app.get('/api/people' , (req , res) => {
//     res.status(200).json({success :  true , data : people})
// })
// posting the name of the people
// app.post('/api/people' , (req ,res) => {
//     console.log(req.body)
//     const {name} = req.body;
//     if(!name) {
//         res.status(201).json({success : false , msg : "Please provide valid name"}) // because in html file we used msg
//     }
//     res.status(201).json({success : true , person : name}) // this has to be "person" because in html we had use name as person
// })
app.put('/api/people/:id' , (req , res) => {
    const {id} = req.params;
    const {name} = req.body
  //  console.log(id , name);
    const person = people.find((person) => person.id === Number(id));
    if(!person) {
        return res.status(401).json({success : false , msg : `No person with this id `})
    }
    const newPeople = people.map((person) => {
        if(person.id === Number(id)) {
            person.name = name;
        }
        return people;
    })
    res.status(200).json({success : true , data : newPeople})
   // res.send("Hellpw")
})
app.listen(5000 , () => {
    console.log('Server is running on port 5000 .... ')
})