//Archivo para usar Supabase en todo el proyecto
import React, { createContext, useContext } from "react";
import { supabase } from "../services/supabaseClient"; 

// Crea el contexto de Supabase
const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Hook personalizado para acceder a supabase desde cualquier componente
export const useSupabase = () => {
  return useContext(SupabaseContext);
};
