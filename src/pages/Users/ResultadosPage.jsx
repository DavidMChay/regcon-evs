import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Para acceder a los parámetros de la URL
import { useSupabase } from "../../context/SupabaseContext"; // Supabase para obtener los datos
import { Link } from "react-router-dom"; // Para redirigir a la página de detalles del evento

const ResultadosPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // Acceder a los parámetros de la URL
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get("query") || ""; // Obtenemos el término de búsqueda

    const supabase = useSupabase();

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("events")
                .select("id, name, event_date, location, image");

            if (error) {
                console.error("Error al cargar los eventos:", error);
            } else {
                setEvents(data);
            }
            setLoading(false);
        };

        fetchEvents();
    }, [supabase]);

    // Filtrar eventos según el término de búsqueda
    const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white min-h-screen px-4 py-8 max-w-7xl mx-auto">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-3xl lg:text-4xl" data-aos="fade-right">
                Resultados de búsqueda: "{searchTerm}"
            </h2>

            {loading ? (
                <p>Cargando eventos...</p>
            ) : filteredEvents.length === 0 ? (
                <p>No se encontraron eventos para "{searchTerm}".</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-4" data-aos="fade-down">
                    {filteredEvents.map((event) => (
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
                                    <button className="mt-4 bg-gray-900 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800 w-full transition-transform transform hover:scale-105">
                                        Ver Boletos
                                    </button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResultadosPage;
