const mongoose = require('mongoose');

const mongo_url = process.env.MONGODB_CONN;
console.log('MongoDB Connection URL:', mongo_url); // Log the connection URL

mongoose.connect(mongo_url)
    .then(() => {
        console.log('MongoDB Connected...');
    }).catch((err) => {
        console.log('MongoDB Connection Error: ', err);
    })
