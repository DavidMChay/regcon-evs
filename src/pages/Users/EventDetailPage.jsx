import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { supabase } from "../../services/supabaseClient";
import 'aos/dist/aos.css';
import AOS from 'aos';
import './EventDetailPage.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, } from 'swiper/modules';


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const EventDetailPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const [ticketCategories, setTicketCategories] = useState([]);
    const [ticketCount, setTicketCount] = useState({});
    const [total, setTotal] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [recommendedEvents, setRecommendedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800 });
        fetchEventData();
        fetchRecommendedEvents();
    }, [eventId]);

    useEffect(() => {
        const intervalId = setInterval(updateCountdown, 1000);
        return () => clearInterval(intervalId);
    }, [eventData]);

    const fetchEventData = async () => {
        const { data: eventData, error: eventError } = await supabase
            .from("events")
            .select("id, name, description, event_date, location, image, category_id")
            .eq("id", eventId)
            .single();

        if (eventError) {
            console.error("Error al cargar el evento:", eventError);
            return;
        }

        setEventData(eventData);

        if (eventData.category_id) {
            const { data: ticketsData, error: ticketsError } = await supabase
                .from("ticketcategories")
                .select("id, name, price, description")
                .eq("id", eventData.category_id);

            if (ticketsError) {
                console.error("Error al cargar las categorías de boletos:", ticketsError);
            } else {
                setTicketCategories(ticketsData);
            }
        }
    };

    const fetchRecommendedEvents = async () => {
        // Reemplaza este código con la lógica para obtener eventos recomendados desde tu base de datos
        const { data: recommendedEventsData, error } = await supabase
            .from("events")
            .select("id, name, location, image")
            .limit(5);

        if (error) {
            console.error("Error al cargar eventos recomendados:", error);
        } else {
            setRecommendedEvents(recommendedEventsData);
        }

        setLoading(false);
    };

    const updateCountdown = () => {
        if (eventData) {
            const eventDate = new Date(eventData.event_date).getTime();
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeRemaining({ days, hours, minutes, seconds });
            } else {
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }
    };

    const calculateTotal = () => {
        if (ticketCategories.length > 0) {
            const totalAmount = ticketCategories.reduce((sum, ticket) => {
                return sum + (ticketCount[ticket.id] || 0) * ticket.price;
            }, 0);
            setTotal(totalAmount);
        }
    };

    const handleTicketChange = (ticketId, increment) => {
        setTicketCount((prevCount) => ({
            ...prevCount,
            [ticketId]: Math.max(0, (prevCount[ticketId] || 0) + increment)
        }));
    };

    useEffect(() => {
        calculateTotal();
    }, [ticketCount, ticketCategories]);

    const goToConfirmation = () => {
        const selectedTickets = ticketCategories
            .filter(ticket => ticketCount[ticket.id] > 0)
            .map(ticket => ({
                id: ticket.id,
                name: ticket.name,
                quantity: ticketCount[ticket.id],
                price: ticket.price,
                total: ticket.price * ticketCount[ticket.id]
            }));

        console.log('Datos a enviar a la página de confirmación:', {
            eventData,
            selectedTickets,
            total
        });

        navigate('/ProcesoDeCompra', { state: { eventData, selectedTickets, total } });
    };

    if (!eventData) return <div className="text-gray-800 text-center p-4">Cargando evento...</div>;

    return (
        <div className="bg-gray-200 text-gray-800 p-4 md:p-8 min-h-screen">
             {/* Botón de regresar */}
             <button
                onClick={() => navigate(-1)}  // Función para regresar a la página anterior
                className="flex items-center text-[#EB6D1E] font-semibold mb-4 hover:text-[#B14501] transition-all"
            >
                <FaArrowLeft className="mr-2" />
                Regresar
            </button>
            {/* Encabezado del evento */}
            <h1 className="mb-4 text-3xl text-center font-extrabold tracking-tight text-[#EB6D1E] md:text-4xl lg:text-5xl" data-aos="fade-up">
                {eventData.name}
            </h1>

            {/* Contador */}
            <div className="countdown-container text-center mb-10" data-aos="fade-up">
                <span className="countdown-time">{String(timeRemaining.days).padStart(2, '0')}<span className="countdown-label"> Días </span></span>
                <span className="countdown-time">{String(timeRemaining.hours).padStart(2, '0')}<span className="countdown-label"> Horas </span></span>
                <span className="countdown-time">{String(timeRemaining.minutes).padStart(2, '0')}<span className="countdown-label"> Minutos </span></span>
                <span className="countdown-time">{String(timeRemaining.seconds).padStart(2, '0')}<span className="countdown-label"> Segundos </span></span>
            </div>

            <div className="grid gap-8 md:grid-cols-3" data-aos="fade-up">
                {/* Imagen del evento */}
                <div className="md:col-span-1 flex justify-center" data-aos="zoom-in">
                    <img
                        src={eventData.image || "https://via.placeholder.com/300?text=Imagen+No+Disponible"}
                        alt="Evento"
                        className="rounded-lg shadow-2xl w-3/4 md:w-full"
                    />
                </div>

                {/* Detalles y descripción del evento */}
                <div className="md:col-span-2 space-y-6">
                    {/* Detalles del evento */}
                    <div className="bg-white p-6 rounded-lg shadow-2xl border-t border-gray-300" data-aos="fade-right">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles del Evento</h2>
                        <div className="flex flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0">
                            <div className="flex items-center space-x-3">
                                <FaCalendarAlt className="text-[#EB6D1E] text-lg md:text-xl" />
                                <div>
                                    <span className="text-lg font-semibold block md:inline">Fecha:</span>
                                    <p className="text-base text-gray-600">{new Date(eventData.event_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaClock className="text-[#EB6D1E] text-lg md:text-xl" />
                                <div>
                                    <span className="text-lg font-semibold block md:inline">Hora:</span>
                                    <p className="text-base text-gray-600">{new Date(eventData.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaMapMarkerAlt className="text-[#EB6D1E] text-lg md:text-xl" />
                                <div>
                                    <span className="text-lg font-semibold block md:inline">Ubicación:</span>
                                    <p className="text-base text-gray-600">{eventData.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Descripción del evento */}
                    <div className="bg-white p-6 rounded-lg shadow-2xl border-t border-gray-300" data-aos="fade-left">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Descripción</h2>
                        <p>{eventData.description}</p>
                    </div>
                </div>
            </div>

            <hr className="my-12 border-t border-gray-300" />

            {/* Sección de boletos */}
            {ticketCategories.length > 0 ? (
                <div className="mt-12" data-aos="fade-up">
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">Comprar Boletos</h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Selección de boletos */}
                        <div className="space-y-6">
                            {ticketCategories.map((ticket) => (
                                <div key={ticket.id} className="bg-white p-6 rounded-lg shadow-2xl border-t border-gray-300 flex justify-between items-center" data-aos="zoom-in">
                                    <div>
                                        <h3 className="text-xl font-bold">{ticket.name}</h3>
                                        <p className="text-lg font-semibold text-gray-600">${ticket.price.toFixed(2)}</p>
                                        <p className="text-sm text-gray-500">{ticket.description}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => handleTicketChange(ticket.id, -1)} className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-l">-</button>
                                        <div className="px-4 py-2 bg-gray-100 text-lg font-semibold text-center">{ticketCount[ticket.id] || 0}</div>
                                        <button onClick={() => handleTicketChange(ticket.id, 1)} className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-r">+</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                       {/* Resumen de compra */}
<div className="bg-gray-100 p-6 rounded-lg shadow-2xl border-t border-gray-300" data-aos="zoom-in">
    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Resumen de Compra</h3>
    <p className="text-lg">Subtotal: ${total.toFixed(2)}</p>
    <p className="text-lg">Comisión: $0.00</p>
    <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>

    {/* Botón de confirmación con validación */}
    <button
        className="w-full mt-4 bg-[#EB6D1E] text-white py-2 rounded font-bold hover:bg-[#B14501] transition-all"
        onClick={() => {
            // Validación para asegurarse de que se han seleccionado boletos
            const selectedTickets = ticketCategories
                .filter(ticket => ticketCount[ticket.id] > 0)
                .map(ticket => ({
                    id: ticket.id,
                    name: ticket.name,
                    quantity: ticketCount[ticket.id],
                    price: ticket.price,
                    total: ticket.price * ticketCount[ticket.id]
                }));

            if (selectedTickets.length === 0) {
                alert("Debes seleccionar al menos un boleto para continuar.");
                return; // Detiene el flujo si no hay boletos seleccionados
            }

            // Si hay boletos seleccionados, continuar con la navegación
            console.log('Datos a enviar a la página de confirmación:', {
                eventData,
                selectedTickets,
                total
            });

            // Realizar la navegación hacia la página de confirmación
            navigate('/ProcesoDeCompra', { state: { eventData, selectedTickets, total } });
        }}
    >
        Confirmar Boletos
    </button>
</div>

                    </div>
                </div>
            ) : (
                <div className="mt-12 text-center" data-aos="fade-up">
                    <p className="text-lg text-gray-600">No hay categorías de boletos disponibles para este evento.</p>
                </div>
            )}
            {/* Google Maps Embed 
            <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Ver en el Mapa</h3>
                <iframe
                    width="100%"
                    height="400"
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(eventData.location)}`}
                    allowFullScreen
                    loading="lazy"
                    className="rounded-lg shadow-2xl"
                ></iframe>
            </div>*/}

            <hr className="my-12 border-t border-gray-300" />


            {/* Sección de Eventos Recomendados */}
            <div className="bg-white min-h-screen px-4 py-8 max-w-7xl mx-auto">
                <h2 className="mb-4 text-2xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl" data-aos="fade-right">
                    Eventos recomendados
                </h2>
                <Swiper
                    direction="horizontal"
                    spaceBetween={10}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    modules={[Navigation]}

                    className="w-full " data-aos="fade-down"
                >
                    {recommendedEvents.length > 0 ? (
                        recommendedEvents.map((event) => (
                            <SwiperSlide key={event.id}>
                                <div className="event-card bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                                    <Link to={`/DetallesDeEvento/${event.id}`} className="block">
                                        <div className="overflow-hidden h-48">
                                            <img
                                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                                                src={event.image || "https://via.placeholder.com/300?text=Imagen+No+Disponible"}
                                                alt={event.name}
                                            />
                                        </div>
                                        <div className="p-4 text-center">
                                            <h5 className="text-lg font-bold text-gray-800 truncate">{event.name}</h5>
                                            <p className="text-sm text-gray-600 truncate">{event.location}</p>
                                            <button className="mt-4 bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 w-full transition-transform transform hover:scale-105">
                                                Ver Boletos
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="text-center text-gray-600">No hay eventos recomendados disponibles.</div>
                    )}
                </Swiper>
            </div>



        </div>
    );
};

export default EventDetailPage;
