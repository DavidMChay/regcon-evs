// Home.jsx
import React, { useState } from "react";
import MainHome from "../../components/Main/MainHome/MainHome";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (term) => {
        setSearchTerm(term);  // Actualizamos el término de búsqueda
    };

    return (
        <div>
            
            
            <MainHome  searchTerm={searchTerm}/>
        </div>
    );
};

export default Home;
