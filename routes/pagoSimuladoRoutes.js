const express = require('express');
const router = express.Router();

// Ruta para simular un pago exitoso
router.get('/pago-exitoso', async (req, res) => {
  // Simula la lógica para un pago exitoso
  try {
    // Aquí podrías recibir un payment_id o transaction_id como query param
    const { payment_id } = req.query;

    if (!payment_id) {
      return res.status(400).json({ message: 'Falta el payment_id para simular el pago exitoso.' });
    }

    // Actualiza el estado del pago en la base de datos
    const pago = await Pago.findByPk(payment_id);
    if (!pago) {
      return res.status(404).json({ message: 'No se encontró el pago asociado al ID proporcionado.' });
    }

    pago.estado = 'completado'; // Marca el pago como completado
    await pago.save();

    // Respuesta simulada
    res.status(200).json({ message: 'Pago completado exitosamente.', pago });
  } catch (error) {
    console.error('Error al simular el pago exitoso:', error);
    res.status(500).json({ message: 'Error al simular el pago exitoso.', error: error.message });
  }
});

// Ruta para simular un pago cancelado
router.get('/pago-cancelado', async (req, res) => {
  // Simula la lógica para un pago cancelado
  try {
    const { payment_id } = req.query;

    if (!payment_id) {
      return res.status(400).json({ message: 'Falta el payment_id para simular el pago cancelado.' });
    }

    // Actualiza el estado del pago en la base de datos
    const pago = await Pago.findByPk(payment_id);
    if (!pago) {
      return res.status(404).json({ message: 'No se encontró el pago asociado al ID proporcionado.' });
    }

    pago.estado = 'cancelado'; // Marca el pago como cancelado
    await pago.save();

    // Respuesta simulada
    res.status(200).json({ message: 'Pago cancelado exitosamente.', pago });
  } catch (error) {
    console.error('Error al simular el pago cancelado:', error);
    res.status(500).json({ message: 'Error al simular el pago cancelado.', error: error.message });
  }
});

module.exports = router;
