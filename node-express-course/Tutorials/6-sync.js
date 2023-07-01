const {readFileSync , writeFileSync} = require("fs");
const first = readFileSync('./c/first.txt' , 'utf-8')
const second = readFileSync('./c/second.txt' , 'utf-8')

// if there will be no file as named result-syn then it'll create a new file but if there will be already file existing
// then it will override everything
//writeFileSync('./c/result-syn.txt' , `Here is the example of the ${first} and ${second}`);
// a will append everything which is from Here to the file which already have something
writeFileSync('./c/result-syn1.txt' , `Here is the example of the ${first} and ${second}` , {flag : 'a'});


const read = readFileSync('./c/result-syn.txt' , 'utf8');

console.log(read)

console.log(first , second)
// ////////Sync is Synchronized and normal is asynchronized:



// in sync there is a problem where a function runs one by one unless one process is done there won't be another process, this might cause huge disturbance in the database
// in async they does not work line by line whereas they will work by putting the other task going simountaneusly