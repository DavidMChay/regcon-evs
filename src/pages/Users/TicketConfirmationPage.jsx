import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaRegClock } from 'react-icons/fa';
import axios from 'axios';

const TicketConfirmationPage = () => {
    const { state } = useLocation();
    const { eventData, selectedTickets, total } = state;
    const navigate = useNavigate();

    console.log('Datos recibidos en la página de confirmación:', state);

    const [timeRemaining, setTimeRemaining] = useState(10 * 60); // 10 minutos en segundos
    const [preferenceId, setPreferenceId] = useState(null); // Guardar el preferenceId aquí

    // Temporizador
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    alert("El tiempo ha expirado. Redirigiendo a la página de selección.");
                    navigate(-1); // Redirigir al usuario a la página anterior
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    // Formatear tiempo para mostrar en el temporizador
    const formatTime = (time) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // Función que se ejecuta al hacer clic en el botón de pago
    const handlePaymentClick = async () => {
        // Verificar los datos antes de enviarlos
        console.log('Datos a enviar:', {
            productTitle: eventData.name, // Usar eventData.name como productTitle
            quantity: selectedTickets.length,
            price: total
        });

        // Validación de datos
        if (!eventData?.name || !selectedTickets || selectedTickets.length === 0 || total <= 0) {
            alert('Faltan datos necesarios para realizar la solicitud de pago');
            console.log('Datos inválidos:', {
                productTitle: eventData?.name, // Asegurarse de enviar el nombre del evento
                quantity: selectedTickets.length,
                price: total
            });
            return;
        }

        // Comprobación de los datos de los tickets seleccionados
        selectedTickets.forEach(ticket => {
            if (!ticket.name || !ticket.quantity || !ticket.total) {
                alert('Algunos boletos seleccionados tienen datos incompletos');
                console.log('Datos de boleto incompletos:', ticket);
            }
        });

        try {
            // Enviar los datos al backend para crear la preferencia de pago
            const response = await axios.post('http://localhost:3001/create_preference', {
                productTitle: eventData.name, // Enviar el nombre del evento
                quantity: selectedTickets.length,
                price: total,
            });

            console.log("Preferencia de pago creada con éxito:", response.data);

            // Si la respuesta tiene el preferenceId, configurar el pago
            if (response.data.paymentLink) {
                setPreferenceId(response.data.preferenceId);
            }
        } catch (error) {
            console.error("Error al crear la preferencia de pago:", error);
            alert('Hubo un error al crear la preferencia de pago. Intenta nuevamente.');
        }
    };

    // Cargar el SDK de MercadoPago solo si preferenceId está disponible
    useEffect(() => {
        if (preferenceId) {
            const script = document.createElement('script');
            script.src = "https://sdk.mercadopago.com/js/v2";
            script.onload = () => {
                const mp = new MercadoPago('TEST-b6b1e459-c38e-4b30-bc43-b45b6ce06f6b', { locale: 'es-MX' });
                mp.bricks().create("wallet", "wallet_container", {
                    initialization: {
                        preferenceId: preferenceId, // Usamos el preferenceId generado en el backend
                    },
                });
            };
            document.body.appendChild(script);
        }
    }, [preferenceId]);

    // Validar si hay datos de evento y boletos seleccionados
    if (!eventData || !selectedTickets) {
        return <p>No hay información del evento o de los boletos.</p>;
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-200 dark:bg-gray-800 min-h-screen p-4 flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
                {/* Botón de retroceso */}
                <div className="flex items-center cursor-pointer mb-6" onClick={() => navigate(-1)}>
                    <FaArrowLeft className="text-[#EB6D1E] mr-2" />
                    <span className="text-[#EB6D1E] font-semibold">Regresar</span>
                </div>

                {/* Encabezado */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-white">Confirmación de Boletos</h2>
                    <p className="text-gray-600 dark:text-gray-400">Revisa tus boletos seleccionados y completa la información de pago.</p>
                </div>

                {/* Temporizador */}
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-center mb-8">
                    <h3 className="text-lg font-bold text-red-600">TIEMPO RESTANTE</h3>
                    <p className="text-2xl font-bold text-red-700 flex justify-center items-center">
                        <FaRegClock className="mr-2" /> {formatTime(timeRemaining)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Tienes un tiempo limitado para completar tu compra.</p>
                </div>

                {/* Resumen de boletos seleccionados */}
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Boletos Seleccionados</h3>
                    <table className="w-full text-left text-gray-700 dark:text-gray-300">
                        <thead>
                            <tr>
                                <th className="border-b pb-2">Tipo</th>
                                <th className="border-b pb-2 text-center">Cantidad</th>
                                <th className="border-b pb-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedTickets.map(ticket => (
                                <tr key={ticket.id}>
                                    <td className="py-2">{ticket.name}</td>
                                    <td className="py-2 text-center">{ticket.quantity}</td>
                                    <td className="py-2 text-right">${ticket.total.toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr className="font-bold">
                                <td className="py-2">Subtotal</td>
                                <td></td>
                                <td className="py-2 text-right">${total.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Botón de pago */}
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Selecciona tu método de pago</h3>
                    <button
                        onClick={handlePaymentClick}
                        className="p-4 w-full text-center bg-[#EB6D1E] text-white font-semibold rounded-lg shadow-md"
                    >
                        Pagar con Mercado Pago
                    </button>
                </div>

                {/* Contenedor del widget de Mercado Pago */}
                {preferenceId && (
                    <div id="wallet_container" className="mt-8"></div>
                )}
            </div>
        </div>
    );
};

export default TicketConfirmationPage;
