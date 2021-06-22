const mongoose = require('mongoose');
//connect it and make a new database
mongoose.connect('mongodb://localhost/contact_list_db');

//db will access the database
const db = mongoose.connection;

//on error print this statement. 'on' and 'once' are pre-defined in mongoose.
db.on('error', console.error.bind(console, "Error connecting to database"));

//once it is open, print this statement
db.once('open', function(){
    console.log("Successfully connected to the database");
});
