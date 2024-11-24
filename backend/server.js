const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/api/reservas", (req, res) => {
    const { nombre, correo, telefono, fecha_entrada, fecha_salida, tipo_habitacion } = req.body;

    const errors = [];

    if (!nombre || nombre.trim() === "") {
        errors.push("El nombre es obligatorio.");
    }
    if (!correo || !correo.includes("@")) {
        errors.push("El correo electrónico no es válido.");
    }
    if (!telefono || !/^\d+$/.test(telefono)) {
        errors.push("El teléfono debe contener solo números.");
    }
    if (!fecha_entrada) {
        errors.push("La fecha de entrada es obligatoria.");
    }
    if (!fecha_salida) {
        errors.push("La fecha de salida es obligatoria.");
    }
    if (fecha_entrada >= fecha_salida) {
        errors.push("La fecha de salida debe ser posterior a la de entrada.");
    }
    if (!tipo_habitacion) {
        errors.push("Debe seleccionar un tipo de habitación.");
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Si todo está bien, continúa con el registro
    res.status(201).json({ message: "Reserva registrada con éxito." });
});

app.listen(5000, () => {
    console.log("Servidor ejecutándose en el puerto 5000");
});
