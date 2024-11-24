const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las reservas
router.get('/', (req, res) => {
    const query = 'SELECT * FROM reservations';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Crear una nueva reserva
router.post('/', (req, res) => {
    const { name, room, checkin, checkout } = req.body;
    const query = 'INSERT INTO reservations (name, room, checkin, checkout) VALUES (?, ?, ?, ?)';
    db.query(query, [name, room, checkin, checkout], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send('Reserva creada con éxito');
        }
    });
});

module.exports = router;
