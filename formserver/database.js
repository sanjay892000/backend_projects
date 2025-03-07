  
const mongoose = require('mongoose');
const URL = 'mongodb://127.0.0.1:27017/testings'

const connectToMongo= ()=>{
    mongoose.connect(URL)
    .then((res) => {
        console.log("database connection established")
    }).catch((err) => {
        console.log(err)
    });
}

module.exports = connectToMongo;

