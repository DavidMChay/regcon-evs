// Importar los módulos necesarios de MercadoPago y Express
const express = require('express');
const bodyParser = require('body-parser');
const { MercadoPagoConfig, Preference } = require('mercadopago'); // Importación correcta

// Crear la aplicación Express
const app = express();

// Configurar MercadoPago con tu token de acceso
const client = new MercadoPagoConfig({ 
    accessToken: 'TEST-6337071133563069-112609-549be7b1489f82515a6e797547d5356c-330551929'  // Reemplaza con tu token de acceso
});

// Crear la preferencia de pago
const preference = new Preference(client);

// Middleware para manejar solicitudes JSON
app.use(bodyParser.json());

// Habilitar CORS si estás trabajando en un entorno local (ajustar según sea necesario)
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173', // Cambia por la URL de tu frontend en producción
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Endpoint para crear la preferencia de pago
app.post('/create_preference', async (req, res) => {
    try {
        // Obtener los datos enviados por el frontend
        const { productTitle, quantity, price } = req.body;
        
        // Verificar que los datos necesarios están en la solicitud
        if (!productTitle || !quantity || !price) {
            return res.status(400).send({ error: 'Faltan datos necesarios en la solicitud' });
        }

        // Crear la preferencia de pago con los datos recibidos
        const response = await preference.create({
            body: {
                items: [
                    {
                        title: productTitle, // Título del producto o evento
                        quantity: quantity,   // Cantidad de tickets
                        unit_price: price,    // Precio del producto
                        currency_id: 'MXN',   // Asegúrate de que la moneda sea la correcta
                    },
                ],
                back_urls: {
                    success: 'http://localhost:5173/success',  // URL a la que se redirige después de una compra exitosa
                    failure: 'http://localhost:5173/failure',  // URL si la compra falla
                    pending: 'http://localhost:5173/pending',  // URL si la compra está pendiente
                },
                auto_return: 'approved', // Asegura que el usuario regrese automáticamente al frontend después de la compra
            },
        });
        console.log("Solicitud recibida:", req.body); // Verifica que los datos estén siendo enviados correctamente


        // Verificar si la respuesta contiene la ID de la preferencia
        if (response.body && response.body.id) {
            const paymentLink = response.body.init_point; // URL para iniciar el pago
            return res.status(200).send({ paymentLink });
        } else {
            return res.status(500).send({ error: 'Error al crear la preferencia de pago' });
        }
    } catch (error) {
        console.error('Error al crear la preferencia de pago:', error);
        return res.status(500).send({ error: 'Error al procesar la preferencia' });
    }
});

// Iniciar el servidor en el puerto 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
