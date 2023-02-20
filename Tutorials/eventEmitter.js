const EventEmitter = require('events')

const customEmitter = new EventEmitter();

customEmitter.on('response' , (name , id) => {
    console.log(`data recieved : ${name} and my id : ${id}`);
})
customEmitter.on('response' , (name , id) => {
    console.log(`data recivingggg : ${name} & ${id}`);
})

customEmitter.emit('response' , "john" , 32);