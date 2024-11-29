import React, { useState, useEffect } from "react";
import { FiDownload, FiSettings, FiDatabase, FiPlayCircle, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { FaWindows, FaAndroid, FaApple } from "react-icons/fa"; 

const LocalInstallationGuide = () => {
  // Estado para almacenar el sistema operativo detectado
  const [os, setOs] = useState("");

  useEffect(() => {
    // Función para detectar el sistema operativo
    const detectOS = () => {
      const userAgent = navigator.userAgent;
      if (/Windows/i.test(userAgent)) {
        setOs("Windows");
      } else if (/Android/i.test(userAgent)) {
        setOs("Android");
      } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        setOs("iOS");
      } else {
        setOs("Otros");
      }
    };

    detectOS(); // Detecta el sistema operativo cuando el componente se monta
  }, []);

  return (
    <div data-aos="fade-up">
      <div
        className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-gray-800"
        style={{ backgroundImage: 'url(/src/assets/images/Banner.png)' }}
      >
        {/* Overlay de degradado blanco en la parte superior e inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-90"></div>

        {/* Tarjeta de fondo opaco */}
        <section className="relative z-10 bg-white bg-opacity-80 rounded-lg shadow-lg text-center px-8 py-12 max-w-screen-md mx-auto" data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-tight text-gray-900 drop-shadow-lg">
            ¡Descarga RegCon para {os}!
          </h1>
          <p className="mt-4 text-gray-700 text-2xl max-w-2xl mx-auto drop-shadow-md">
            Instala RegCon en tu dispositivo {os} y comienza a gestionar tus eventos de manera rápida y eficiente.
          </p>

          {/* Botón de descarga */}
          <div className="mt-8 flex justify-center">
            <button
              className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-white rounded-lg bg-gradient-to-br from-red-400 to-orange-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 transition-transform transform hover:scale-105 md:hover:scale-110"
            >
              {os === "Windows" && <FaWindows className="mr-2 w-5 h-5" />}
              {os === "Android" && <FaAndroid className="mr-2 w-5 h-5" />}
              {os === "iOS" && <FaApple className="mr-2 w-5 h-5" />}
              Descargar para {os}
            </button>
          </div>

          {/* Nota sobre compatibilidad */}
          <p className="mt-4 text-gray-600 text-lg drop-shadow-sm">
            Compatible exclusivamente con {os}. La instalación es rápida y sencilla.
          </p>
        </section>
      </div>
      <div className="bg-gray-50 text-gray-800">

        {/* Sección de Introducción */}
        <section className="bg-gray-100 py-12 text-center px-4">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-tight text-gray-800 md:text-4xl lg:text-5xl">
            Guía de Instalación Local
          </h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Instala y configura RegCon en tu equipo {os} en pocos y sencillos pasos.
          </p>
        </section>

        {/* Paso 1: Descargar Instalador */}
        <section className="bg-white py-12">
          <div className="max-w-screen-lg mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Texto e Icono */}
            <div>
              <div className="flex items-center mb-4">
                <FiDownload className="text-[#EB6D1E] w-8 h-8 mr-3" />
                <h2 className="text-2xl font-extrabold text-gray-800">1. Descargar Instalador</h2>
              </div>
              <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                Descarga el archivo <code>RegConInstaller.exe</code> desde el boton "Descargar Para {os}".
              </p>
            </div>
            {/* Imagen */}
            <div>
              <img src="/src/assets/images/descargar.png" alt="Descargar Instalador" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Paso 2: Ejecutar el Instalador */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-screen-lg mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <FiPlayCircle className="text-[#EB6D1E] w-8 h-8 mr-3" />
                <h2 className="text-2xl font-extrabold text-gray-800">2. Ejecutar el Instalador</h2>
              </div>
              <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                Una vez descargado, haz doble clic en <code>RegConInstaller.exe</code> para iniciar la instalación.
              </p>
              <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                Sigue las instrucciones en pantalla. El instalador configurará todo automáticamente.
              </p>
            </div>
            {/* Imagen */}
            <div>
              <img src="/src/assets/images/instalador.png" alt="Ejecutar Instalador" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Paso 3: Finalizar Instalación */}
        <section className="bg-white py-12">
          <div className="max-w-screen-lg mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <FiCheckCircle className="text-[#EB6D1E] w-8 h-8 mr-3" />
                <h2 className="text-2xl font-extrabold text-gray-800">3. Finalizar Instalación</h2>
              </div>
              <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                Cuando la instalación termine, haz clic en "Finalizar". Esto creará un acceso directo en tu escritorio.
              </p>
              <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                Ahora RegCon está listo para usarse.
              </p>
            </div>
            {/* Imagen */}
            <div>
              <img src="/src/assets/images/finalizar.png" alt="Finalizar Instalación" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        {/* Solución de Problemas */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-screen-lg mx-auto px-6 lg:px-8">
            <div className="flex items-center mb-4">
              <FiAlertCircle className="text-[#EB6D1E] w-8 h-8 mr-3" />
              <h2 className="text-2xl font-extrabold text-gray-800">Solución de Problemas Comunes</h2>
            </div>
            <ul className="list-disc list-inside space-y-4 text-gray-700">
              <li><strong>El instalador no se ejecuta:</strong> Verifica que tienes permisos de administrador y que tu antivirus no bloquee el archivo.</li>
              <li><strong>Problemas de inicio:</strong> Reinicia el sistema o verifica el acceso directo creado en el escritorio.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LocalInstallationGuide;
