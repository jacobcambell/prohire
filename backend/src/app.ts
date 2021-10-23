require('dotenv').config();

import Express from 'express';
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session');
const multer = require('multer');

const app = Express();

const con = mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
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

app.use(Express.json());

const upload = multer({
    dest: 'images/'
});

// Routes

app.post('/admin-image-upload', upload.array('images'), (req: Express.Request, res: Express.Response) => {
    // Multer saves images the user sends via multipart/form-data
    // Then we loop through those images and save the filename to the database
    // Note - currently we just assume the files sent are .jpeg, which obviously we need to check file types/sizes/etc
    // Params:
    // images - an array of files sent via FormData on frontend
    // proid - The ID of the pro the admin is trying to upload images for

    if (!req.session.admin_logged_in) {
        res.sendStatus(400);
        return;
    }

    if (
        typeof req.body.proid === 'undefined' ||
        typeof req.files === 'undefined'
    ) {
        res.sendStatus(400);
        return;
    }

    // Loop through all the images sent by the user
    for (let i = 0; i < req.files.length; i++) {
        // Add image name to database
        // Note - Currently we are just appending .jpeg to the end
        const thisImage = req.files[i].filename + '.jpeg';
        con.query('INSERT INTO professional_images (pro_id, image_name) VALUES (?, ?)', [req.body.proid, thisImage], (err, results) => {
            if (err) throw err;
        });
    }

    res.sendStatus(200);
});

app.post('/get-all-pros', (req: Express.Request, res: Express.Response) => {
    // Get a list of all the professionals, with no filtering
    con.query('SELECT id, fullname, location_from, profession, slug FROM professionals', (err, results) => {
        if (err) throw err;
        let professionals = [];

        results.map((pro) => {
            professionals.push({ id: pro.id, fullname: pro.fullname, location_from: pro.location_from, profession: pro.profession, slug: pro.slug });
        })

        res.json(professionals);
    });
})

app.get('/prodetails', (req: Express.Request, res: Express.Response) => {
    // Load data for a specific professional
    let slug = req.query.slug;

    con.query('SELECT id, fullname, location_from, profession, bio FROM professionals WHERE slug=?', [slug], (err, results) => {
        if (err) throw err;

        res.json(results[0]);
    })
})

app.post('/prodetailsbyid', (req: Express.Request, res: Express.Response) => {
    // Load data for a specific professional by their id
    let id = req.body.id;

    if (typeof id === 'undefined') {
        res.sendStatus(400);
        return;
    }

    con.query('SELECT fullname, location_from, profession, bio, slug FROM professionals WHERE id=?', [id], (err, results) => {
        if (err) throw err;

        res.json(results[0]);
    })
})

app.post('/adminlogin', (req: Express.Request, res: Express.Response) => {
    const check = [
        req.body.password
    ];

    if (check.includes(undefined) || check.includes(null)) {
        res.sendStatus(400)
        return;
    }

    // Admin password is stored in .env ADMIN_PASSWORD
    if (req.body.password === process.env.ADMIN_PASSWORD) {
        res.json({ error: false })
    }
    else {
        res.json({ error: true })
    }
})

app.post('/create-professional', (req: Express.Request, res: Express.Response) => {
    // Create professional handler, only an admin should be able to do this
    if (!req.session.admin_logged_in) {
        res.sendStatus(400);
        return;
    }

    let fullname = req.body.fullname;
    let location_from = req.body.location_from;
    let profession = req.body.profession;
    let bio = req.body.bio;
    let slug = req.body.slug;

    if (typeof fullname === 'undefined' ||
        typeof location_from === 'undefined' ||
        typeof profession === 'undefined' ||
        typeof bio === 'undefined' ||
        typeof slug === 'undefined'
    ) {
        res.sendStatus(400);
        return;
    }
    // Insert data into db
    con.query(`INSERT INTO professionals
                (fullname, location_from, profession, bio, slug)
                VALUES (?, ?, ?, ?, ?)`,
        [fullname, location_from, profession, bio, slug],
        (err, results) => {
            if (err) throw err;

            res.json({ message: 'Created professional', success: true });
        });
})

app.post('/edit-professional', (req: Express.Request, res: Express.Response) => {
    // Update a professional's information based off their id
    if (!req.session.admin_logged_in) {
        res.sendStatus(400);
        return;
    }

    let id = req.body.id;
    let fullname = req.body.fullname;
    let location_from = req.body.location_from;
    let profession = req.body.profession;
    let bio = req.body.bio;
    let slug = req.body.slug;

    if (
        typeof id === 'undefined' ||
        typeof fullname === 'undefined' ||
        typeof location_from === 'undefined' ||
        typeof profession === 'undefined' ||
        typeof bio === 'undefined' ||
        typeof slug === 'undefined'
    ) {
        res.sendStatus(400);
        return;
    }

    // Update based on id of professional
    con.query(`UPDATE professionals
                SET fullname=?,
                location_from=?,
                profession=?,
                bio=?,
                slug=?
                WHERE
                id=?`,
        [fullname, location_from, profession, bio, slug, id],
        (err, results) => {
            if (err) throw err;

            res.json({ message: 'Updated professional', success: true });
        });
})

app.post('/delete-professional', (req: Express.Request, res: Express.Response) => {
    // Deletes a professional based off their id
    if (!req.session.admin_logged_in) {
        res.sendStatus(400);
        return;
    }

    let id = req.body.id;

    if (typeof id === 'undefined') {
        res.sendStatus(400);
        return;
    }

    // Delete from database
    con.query('DELETE FROM professionals WHERE id=?', [id], (err, results) => {
        if (err) throw err;

        res.json({ message: "Deleted professional", success: true });
    });
});

app.get('/adminloggedin', (req: Express.Request, res: Express.Response) => {
    // Is the user logged in as an admin?
    if (req.session.admin_logged_in) {
        res.json({ admin_logged_in: true })
    }
    else {
        res.json({ admin_logged_in: false })
    }
})

app.listen(8080, () => {
    console.log('ProHire API running on port 8080')
});