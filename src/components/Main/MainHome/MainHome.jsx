import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useSupabase } from "../../../context/SupabaseContext";
import 'swiper/css';
import 'swiper/css/navigation';
import './MainHome.css';

const MainHome = () => {
    const supabase = useSupabase();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const images = [
        "https://cdn.eticket.mx/imagenes/artistas/240912210036645_performer_img_cat1Pue.jpg",
        "/src/assets/images/Banner3.png",
        "https://cdn.eticket.mx/imagenes/artistas/241008232315962_performer_img_cat1Jurgen.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const today = new Date();
            const upcomingDate = new Date();
            upcomingDate.setDate(today.getDate() + 3);

            const { data: upcomingData, error: upcomingError } = await supabase
                .from("events")
                .select("id, name, event_date, location, image")
                .gte("event_date", today.toISOString().split("T")[0])
                .lte("event_date", upcomingDate.toISOString().split("T")[0]);

            if (upcomingError) {
                console.error("Error al cargar eventos próximos:", upcomingError);
            } else {
                setUpcomingEvents(upcomingData);
            }

            const { data: allData, error: allError } = await supabase
                .from("events")
                .select("id, name, event_date, location, image");

            if (allError) {
                console.error("Error al cargar todos los eventos:", allError);
            } else {
                setAllEvents(allData);
            }

            setLoading(false);
        };

        fetchEvents();
    }, [supabase]);

    const handleLoadMore = () => {
        setShowMore(true);
    };

    return (
        <div>
            {/* Carrusel de imágenes */}
            <div id="fade-carousel" className="relative w-full">
                <div className="relative h-56 overflow-hidden md:h-96">
                    {images.map((img, index) => (
                        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}>
                            <img src={img} className="block w-full h-full object-cover" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>

                {/* Indicadores del carrusel */}
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-2">
                    {Array(images.length).fill().map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-1 ${index === currentIndex ? "bg-gray-800" : "bg-gray-300"} rounded-sm`}
                            aria-current={index === currentIndex}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => setCurrentIndex(index)}
                        ></button>
                    ))}
                </div>

                <button
                    type="button"
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white"
                    onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
                >
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                    </svg>
                </button>
                <button
                    type="button"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white"
                    onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
                >
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
                    </svg>
                </button>
            </div>

            {/* Sección de Próximos Eventos */}
            <div className="bg-white min-h-screen px-4 py-8 max-w-7xl mx-auto" >
                <h2 className="mb-4 text-2xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl" data-aos="fade-right">Próximos Eventos</h2>
                <Swiper
                    direction="horizontal"
                    spaceBetween={10}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    className="w-full " data-aos="fade-down"
                >
                    {upcomingEvents.map((event) => (
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
                                        <button className="mt-4 bg-gray-800 text-white font-semibold py-2 px-4 rounded-md  hover:bg-gray-600 w-full transition-transform transform hover:scale-105">
                                            Ver Boletos
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Sección de Todos los Eventos */}
                <div className="my-10">
                    <hr className="border-t-2 border-gray-300 my-4" />
                    <h2 className="mb-4 text-2xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl" data-aos="fade-right">Todos los Eventos</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-4" data-aos="fade-down">
                    {loading ? (
                        <p>Cargando eventos...</p>
                    ) : (
                        allEvents.slice(0, showMore ? allEvents.length : 4).map((event) => (
                            <div key={event.id} className="event-card bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                                <Link to={`/DetallesDeEvento/${event.id}`} className="block">
                                    <div className="overflow-hidden h-56">
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                                            src={event.image || "https://via.placeholder.com/300?text=Imagen+No+Disponible"}
                                            alt={event.name}
                                        />
                                    </div>
                                    <div className="p-4 text-center">
                                        <h5 className="text-lg font-bold text-gray-800 truncate">{event.name}</h5>
                                        <p className="text-sm text-gray-600 truncate">{event.location}</p>
                                        <button className="mt-4 bg-gray-900 text-white font-semibold py-2 px-4 rounded-md  hover:bg-gray-800 w-full transition-transform transform hover:scale-105">
                                            Ver Boletos
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>

                {!showMore && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleLoadMore}
                            className="w-100 md:w-auto flex items-center justify-center px-4 py-2 bg-[#EB6D1E] text-white font-semibold rounded-md hover:bg-[#B14501] focus:ring-2 focus:ring-[#EB6D1E] transition-transform transform hover:scale-100"
                        >
                            Cargar más
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainHome;
