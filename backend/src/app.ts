require('dotenv').config();

import Express from 'express';
import { AdminLogin } from './adminLogin';
import { query } from './mysql';

const cors = require('cors');
const session = require('express-session');
const app = Express();

app.use(cors());
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(Express.json());

// Serve images
app.use('/images', Express.static('images'))

// Multer
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg') // Appending .jpg only for now
    }
})

const upload = multer({
    fileFilter: (req, file, cb) => {
        // Authenticate user before allowing file upload
        if (!AdminLogin(req.body.admin_password)) {
            console.log('auth failed')
            cb(null, false);
            return;
        }

        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    },
    storage
})

app.post('/admin-image-upload', upload.single('image'), async (req: Express.Request, res: Express.Response) => {
    const check = [
        req.file,
        req.body.proid,
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

    if (typeof req.file === 'undefined') {
        // For some reason file is undefined, which it shouldn't be at this point
        res.sendStatus(400)
        return;
    }

    // Add reference to this uploaded image for the provided proid
    await query('INSERT INTO professional_images (pro_id, image_name) VALUES (?, ?)', [req.body.proid, req.file.filename])

    res.json({ error: false });
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

app.get('/prodetailsbyslug', async (req: Express.Request, res: Express.Response) => {
    // Load data for a specific professional by slug
    const check = [
        req.query.slug
    ];

    if (check.includes(undefined)) {
        res.sendStatus(400)
        return;
    }

    let results;

    try {
        results = await query('SELECT id, fullname, location_from, profession, bio FROM professionals WHERE slug=?', [req.query.slug]);
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