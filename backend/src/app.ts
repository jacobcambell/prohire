require('dotenv').config();

import Express from 'express';
import { AdminLogin } from './adminLogin';
import { query } from './mysql';

const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const app = Express();

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

app.post('/get-all-pros', async (req: Express.Request, res: Express.Response) => {
    // Get a list of all the professionals, with no filtering
    let results = await query('SELECT id, fullname, location_from, profession, slug FROM professionals')
    interface Professional {
        id: number;
        fullname: string;
        location_from: string;
        profession: string;
        slug: string;
    }

    let professionals: Professional[] = [];

    results.map((pro) => {
        professionals.push({ id: pro.id, fullname: pro.fullname, location_from: pro.location_from, profession: pro.profession, slug: pro.slug });
    })

    res.json(professionals);
})

app.get('/prodetails', async (req: Express.Request, res: Express.Response) => {
    // Load data for a specific professional
    let slug = req.query.slug;

    let results;

    try {
        results = await query('SELECT id, fullname, location_from, profession, bio FROM professionals WHERE slug=?', [slug]);
    }
    catch (e) {

    }

    res.json(results[0]);
})

app.post('/prodetailsbyid', async (req: Express.Request, res: Express.Response) => {
    // Load data for a specific professional by their id
    const check = [
        req.body.id
    ];

    if (check.includes(undefined)) {
        res.sendStatus(400);
        return;
    }

    let results = await query('SELECT id, fullname, location_from, profession, bio, slug FROM professionals WHERE id=?', [req.body.id])
    res.json(results[0])
})

app.post('/adminlogin', (req: Express.Request, res: Express.Response) => {
    const check = [
        req.body.password
    ];

    if (check.includes(undefined) || check.includes(null)) {
        res.sendStatus(400)
        return;
    }

    if (AdminLogin(req.body.password)) {
        res.json({ error: false })
    }
    else {
        res.json({ error: true })
    }
})

app.post('/create-professional', (req: Express.Request, res: Express.Response) => {
    const check = [
        req.body.admin_password,
        req.body.fullname,
        req.body.location_from,
        req.body.profession,
        req.body.bio,
        req.body.slug
    ];

    if (check.includes(undefined) || check.includes(null)) {
        res.sendStatus(400)
        return;
    }

    if (!AdminLogin(req.body.admin_password)) {
        res.sendStatus(400)
        return;
    }

    // Insert data into db
    query(`INSERT INTO professionals
            (fullname, location_from, profession, bio, slug)
            VALUES (?, ?, ?, ?, ?)`, [req.body.fullname, req.body.location_from, req.body.profession, req.body.bio, req.body.slug])
        .then(() => {
            res.json({ error: false })
        })
})

app.post('/edit-professional', (req: Express.Request, res: Express.Response) => {
    // Update a professional's information based off their id

    const check = [
        req.body.id,
        req.body.fullname,
        req.body.location_from,
        req.body.profession,
        req.body.bio,
        req.body.slug,
        req.body.admin_password
    ];

    if (check.includes(undefined)) {
        res.sendStatus(400)
        return;
    }

    if (!AdminLogin(req.body.admin_password)) {
        res.sendStatus(400)
        return;
    }

    interface Professional {
        id: number;
        fullname: string;
        location_from: string;
        profession: string;
        slug: string;
        bio: string;
    }

    // Update based on id of professional
    query(`UPDATE professionals
            SET fullname=?,
            location_from=?,
            profession=?,
            bio=?,
            slug=?
            WHERE
            id=?`, [req.body.fullname, req.body.location_from, req.body.profession, req.body.bio, req.body.slug, req.body.id])
        .then(() => {
            res.json({ success: true });
        })
})

app.post('/delete-professional', (req: Express.Request, res: Express.Response) => {
    const check = [
        req.body.admin_password,
        req.body.id
    ];

    if (check.includes(undefined) || check.includes(null)) {
        res.sendStatus(400)
        return;
    }

    if (!AdminLogin(req.body.admin_password)) {
        res.sendStatus(400)
        return;
    }

    query('DELETE FROM professionals WHERE id=?', [req.body.id])
        .then(() => {
            res.json({ error: false })
        })
});

app.listen(8080, () => {
    console.log('ProHire API running on port 8080')
});