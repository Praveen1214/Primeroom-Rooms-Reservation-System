const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://dileepapraveen32:eeDP1214.@praveen.jndze1l.mongodb.net/primerooms'

mongoose.connect(process.env.MONGODB_URI || mongoURL ,{useUnifiedTopology : true ,useNewUrlParser : true ,})

var connection = mongoose.connection

connection.on('error',()=>{
    console.log('Mongo DB connetion Fail')
});

connection.on('connected',()=>{
    console.log('Mongo DB connetion suc!')
});

module.exports = mongoose;
