const express = require('express')
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'prohire'
});

con.connect();

// Allow requests from localhost:3000 to this api
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

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

    con.query('SELECT fullname, location_from, profession, bio FROM professionals WHERE slug=' + con.escape(slug), (err, results) => {
        if (err) throw err;

        res.json(results[0]);
    })    
})

app.listen(8080, () => {
    console.log('ProHire API running on port 8080')
});