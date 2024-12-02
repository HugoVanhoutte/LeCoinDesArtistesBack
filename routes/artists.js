const express = require('express');
const router = express.Router();
const dbQuery = require('../db/dbQuery');
const JWTauth = require('../middleware/JWTauth');

router.get('/', async (req, res) => {
    const query = "SELECT * FROM artists";
    try {
        const result = await dbQuery(query);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({'error': error.message});
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM artists WHERE id = ?";
    const params = [id];
    try {
        const result = await dbQuery(query, params);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({'error': error.message});
    }
})

router.delete('/:id', JWTauth , async (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM artists WHERE id = ?";
    const params = [id];
    try {
        await dbQuery(query, params);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send({'error': error.message});
    }
})

router.post('/', JWTauth, async (req, res) => {
    const data = req.body;
    const query = 'INSERT INTO artists (name, description) VALUES (?, ?)'
    const params = [data.name, data.description];
    try {
        await dbQuery(query, params);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(500).send({'error': error.message});
    }
})

router.put('/:id', JWTauth, async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    let description;
    req.body.description === "" ? description = null : description = req.body.description;
    const query = 'UPDATE artists SET name = ?, description = ? WHERE id = ?';
    const params = [name, description, id];
    try {
        await dbQuery(query, params);
        res.sendStatus(200);
    } catch(error) {
        res.status(500).send({'error': error.message});
    }
})

module.exports = router;