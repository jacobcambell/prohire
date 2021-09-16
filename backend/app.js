require('dotenv').config();

const express = require('express')
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'prohire'
});

con.connect();

// Allow requests from localhost:3000 to this api
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}

app.use(cors(corsOptions));
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded());


app.get('/getall', (req, res) => {
    con.query('SELECT id, fullname, slug FROM professionals', (err, results) => {
        if (err) throw err;
        let professionals = [];

        results.map((pro) => {
            professionals.push({id: pro.id, fullname: pro.fullname, slug: pro.slug});
        })

        res.json(professionals);
    });
})

app.get('/prodetails', (req, res) => {
    // Load data for a specific professional
    let slug = req.query.slug;

    con.query('SELECT fullname, location_from, profession, bio FROM professionals WHERE slug=?', [slug], (err, results) => {
        if (err) throw err;

        res.json(results[0]);
    })
})

app.post('/adminlogin', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    // Grab the user's password
    con.query('SELECT password FROM admins WHERE username=?', [username], (err, results) => {
        if (err) throw err;

        if(results.length == 0){
            // No user with that username found
            res.json({message: 'No user with that username found!'});
            return;
        }
        else{
            // Check if passwords match
            if(results[0].password == password){
                // Good match
                // Note - There was an initial bug I had on this line, when setting session variables you have to set
                // them BEFORE returning data to client (like with res.json()) I initially was setting session variables after the
                // res.json() line and the browser was not setting cookies, likely because the data was already returned with res.json()
                // before I had a chance to send the cookie with it
                req.session.admin_logged_in = true;
                res.json({message: 'Successful login', success: true})
                return;
            }
            else{
                // Passwords don't match
                res.json({message: 'Incorrect password!'});
                return;
            }
        }
    });
})

app.get('/adminloggedin', (req, res) => {
    // Is the user logged in as an admin?
    if(req.session.admin_logged_in){
        res.json({admin_logged_in: true})
    }
    else{
        res.json({admin_logged_in: false})
    }
})

app.listen(8080, () => {
    console.log('ProHire API running on port 8080')
});