import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [productTitle, setProductTitle] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [email, setEmail] = useState('');
  const [preferenceId, setPreferenceId] = useState('');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expirationMonth: '',
    expirationYear: '',
    securityCode: '',
    cardholderName: '',
    docType: 'DNI',
    docNumber: ''
  });

  useEffect(() => {
    // Cargar el script de Mercado Pago para el procesamiento del pago
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => {
      const mp = new window.Mercadopago('TEST-6337071133563069-112609-549be7b1489f82515a6e797547d5356c-330551929');
      mp.checkout({
        preference: {
          id: preferenceId,
        },
        render: {
          container: '#button-checkout',
          label: 'Pagar con Mercado Pago',
        }
      });
    };
    document.body.appendChild(script);
  }, [preferenceId]);

  // Función para manejar el pago
  const handlePayment = async (e) => {
    e.preventDefault();

    // Validación básica de los campos
    if (!productTitle || !price || !email) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      // Llamada al backend para crear la preferencia de pago
      const response = await axios.post('http://localhost:3000/create_preference', {
        product_title: productTitle,
        quantity,
        price,
        email,
      });

      // Guardar el ID de la preferencia
      setPreferenceId(response.data.id);
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
      alert('Error al procesar el pago');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Formulario de Pago</h1>
      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label htmlFor="product_title" className="block text-gray-700 font-semibold">Producto</label>
          <input
            type="text"
            id="product_title"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 font-semibold">Cantidad</label>
          <input
            type="number"
            id="quantity"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold">Precio</label>
          <input
            type="number"
            id="price"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold">Correo electrónico</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-700 font-semibold">Número de tarjeta</label>
          <input
            type="text"
            id="cardNumber"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            value={cardInfo.cardNumber}
            onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expirationMonth" className="block text-gray-700 font-semibold">Mes de vencimiento</label>
          <input
            type="text"
            id="expirationMonth"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            value={cardInfo.expirationMonth}
            onChange={(e) => setCardInfo({ ...cardInfo, expirationMonth: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="expirationYear" className="block text-gray-700 font-semibold">Año de vencimiento</label>
          <input
            type="text"
            id="expirationYear"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            value={cardInfo.expirationYear}
            onChange={(e) => setCardInfo({ ...cardInfo, expirationYear: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="securityCode" className="block text-gray-700 font-semibold">Código de seguridad</label>
          <input
            type="text"
            id="securityCode"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            value={cardInfo.securityCode}
            onChange={(e) => setCardInfo({ ...cardInfo, securityCode: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cardholderName" className="block text-gray-700 font-semibold">Nombre del titular</label>
          <input
            type="text"
            id="cardholderName"
            className="w-full p-2 mt-2 border border-gray-300 rounded"
            value={cardInfo.cardholderName}
            onChange={(e) => setCardInfo({ ...cardInfo, cardholderName: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg mt-4"
        >
          Pagar
        </button>
      </form>

      {/* Aquí se añadirá el botón de pago de Mercado Pago dinámicamente */}
      <div id="button-checkout" className="mt-4"></div>
    </div>
  );
};

export default PaymentForm;
