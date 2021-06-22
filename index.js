const express = require('express');
const ejs = require('ejs');
//used to require the path module which is an inbuilt node js module
const path = require('path');

const port = 8000;

//"db" is the naming convention for requiring mongoose
const db = require('./config/mongoose');

const Contact = require('./models/contact');
//"app" is the naming convention for express module
const app = express();

//set is used as a key-value fn. fisrt arg is the key and 2nd arg is the value
app.set('view engine' , 'ejs');
//join function -> 2nd arg is the folder which the the sys. will try to find in the directory which is the 1st arg
//__dirname is a global variable which shows the current library
//__dirnameis useful while sharing the code with diff. people as it will automatically locate their directory
app.set('views' , path.join(__dirname , 'views'));

//this is a parser used to parse the info coming from the browser on submitting the form
//use() is a middleware function
//middlewares are called everytime this js file is accessed
app.use(express.urlencoded());

app.use(express.static('assets'));
//user defined middleware 1. the func inside middleware takes three args.
//middle warec can do the following-
//⚫ Execute any code.
//⚫ Make changes to the request and the response objects.
//⚫ End the request-response cycle.
//⚫ Call the next middleware in the stack.
// app.use(function(req,res,next){
//     console.log("middleware 1 called.");
//     //creating an obj. inside a middleware func
//     req.myName = "Itagori Yuji";
//     next();
// });

// app.use(function(req, res, next){  
//     console.log("middleware 2 called.");
//     //accessing the obj. in another middleware func
//     console.log(req.myName);
//     next();
// });

var contactList = [
    {
        name: "Sunny Singh",
        phone: "9560915659"
    },
    {
        name: "Anvi Singh",
        phone: "9219631860"
    },
    {
        name: "Pratibha Singh",
        phone: "7217727048"
    }
];

app.get('/' , function(req, res){

    Contact.find({} , function(err, data){
        if(err){
            console.log("Error in fetching the data");
            return;
        }

        return res.render('home' , {
            title : 'My Contacts List',
            contact_list : data
        });
    })
})

app.post('/create_contact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // return res.redirect('/');
    // contactList.push(req.body);
    // return res.redirect('back');

    //create function takes 1st arg as the doc we are creating and 2nd as a callback func.
    Contact.create(req.body, function(err , data){
        if(err){
            console.log("Error in creating contact");
            return;
        }
        console.log('****' , data);
        return res.redirect('back');
    });
});

//params are of two types = query and string. query are used to send multiple parameters at a time
//this is query param (look in html file).
app.get('/delete_contact' , function(req,res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id , function(err){
        if(err){
            console.log("Error in deleting the contact from the db");
            return;
        }
        return res.redirect('back');
    });
});

app.post('/delete_contacts', function(req,res){
    Contact.deleteMany(function(err){
        if(err){
            console.log("Error in deleting all contacts from db");
            return;
        }
        return res.redirect('back');
    })
    
});

app.get('/practice', function(req, res){
    return res.render('practice' , {
        title: "Let's play!"
    });
});
                // //this get function is a express module which can directly send the
                // //desired url without creating switch cases
                // app.get('/home' , function(req, res){
                //     res.send("<h1>Home page</h1>")
                // })
                // app.get('/contact' , function(req, res){
                //     res.send("<h1>Contact page</h1>")
                // })

app.listen(port , function(err){
    if(err){
        console.log("Error in running the server: ", err);
    }
    return console.log("Yup! Server is running on express on port: ", port);
})