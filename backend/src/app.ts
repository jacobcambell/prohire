require('dotenv').config();

import Express, { Request, Response } from 'express';
import { multerUpload } from './multer';
import { query } from './mysql';
import { adminAuth } from './middleware'

const cors = require('cors');
const app = Express();

app.use(cors());
app.use(Express.json());

// Serve images
app.use('/images', Express.static('images'))

app.post('/admin-image-upload', adminAuth, multerUpload.single('image'), async (req: Request, res: Response) => {
    const check = [
        req.file,
        req.body.proid
    ];

    if (check.includes(undefined)) {
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

app.post('/get-all-pros', async (req: Request, res: Response) => {
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

app.get('/prodetailsbyslug', async (req: Request, res: Response) => {
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

app.post('/getimagesbyproid', async (req: Request, res: Response) => {
    // Returns a list of images that belong to the requested pro
    const check = [
        req.body.proid
    ];

    if (check.includes(undefined)) {
        res.sendStatus(400)
        return;
    }

    // Get all images belonging to that pro id
    let images = await query('SELECT id, image_name FROM professional_images WHERE pro_id=?', [req.body.proid])
    res.json(images)
})

app.post('/prodetailsbyid', async (req: Request, res: Response) => {
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

app.post('/adminlogin', (req: Request, res: Response) => {
    const check = [
        req.body.password
    ];

    if (check.includes(undefined) || check.includes(null)) {
        res.sendStatus(400)
        return;
    }

    if (req.body.password === process.env.ADMIN_PASSWORD) {
        res.json({ error: false })
    }
    else {
        res.json({ error: true })
    }
})

app.post('/create-professional', adminAuth, (req: Request, res: Response) => {
    const check = [
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

    // Insert data into db
    query(`INSERT INTO professionals
            (fullname, location_from, profession, bio, slug)
            VALUES (?, ?, ?, ?, ?)`, [req.body.fullname, req.body.location_from, req.body.profession, req.body.bio, req.body.slug])
        .then(() => {
            res.json({ error: false })
        })
})

app.post('/edit-professional', adminAuth, (req: Request, res: Response) => {
    // Update a professional's information based off their id

    const check = [
        req.body.id,
        req.body.fullname,
        req.body.location_from,
        req.body.profession,
        req.body.bio,
        req.body.slug
    ];

    if (check.includes(undefined)) {
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

app.post('/delete-professional', adminAuth, (req: Request, res: Response) => {
    const check = [
        req.body.id
    ];

    if (check.includes(undefined) || check.includes(null)) {
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