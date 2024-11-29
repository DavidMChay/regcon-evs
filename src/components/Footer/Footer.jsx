import React from "react";
import { FiFacebook, FiTwitter, FiGithub, FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-8 bg-[#C65A1E] pt-9">
      <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
        <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
          {/* Sección de Información */}
          <div className="md:w-[316px]">
            <h1 className="text-white font-extrabold text-[24px]">
              <span className="text-white">RegCon</span>™
            </h1>
            <p className="mt-[18px] text-[15px] font-normal text-white/[80%]">
              RegCon™ es una plataforma para facilitar la administración de registros y datos con un enfoque intuitivo
              y profesional.
            </p>
            <div className="mt-[18px] flex gap-4">
              {/* Redes Sociales */}
              <a
                className="text-white text-facebook hover:text-[#1877F2] transition-all duration-300"
                target="_blank"
                href="#"
              >
                <FiFacebook size={25} />
              </a>
              <a
                className="text-white text-twitter hover:text-[#1DA1F2] transition-all duration-300"
                target="_blank"
                href="#"
              >
                <FiTwitter size={25} />
              </a>
              <a
                className="text-white hover:text-[#333] transition-all duration-300"
                target="_blank"
                href="#"
              >
                <FiGithub size={25} />
              </a>
              <a
                className="text-white text-instagram hover:text-[#E4405F] transition-all duration-300"
                target="_blank"
                href="#"
              >
                <FiInstagram size={25} />
              </a>
            </div>
          </div>

          {/* Sección de Contacto */}
          <div className="md:w-[316px]">
            <div className="mt-[23px] flex">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.8472 14.8554L16.4306 12.8764L16.4184 12.8707C16.1892 12.7727 15.939 12.7333 15.6907 12.7562C15.4424 12.7792 15.2037 12.8636 14.9963 13.002C14.9718 13.0181 14.9484 13.0357 14.9259 13.0545L12.6441 14.9998C11.1984 14.2976 9.70595 12.8164 9.00376 11.3895L10.9519 9.07294C10.9706 9.0495 10.9884 9.02606 11.0053 9.00075C11.1407 8.79384 11.2229 8.55667 11.2445 8.31035C11.2661 8.06402 11.2264 7.81618 11.1291 7.58887V7.57762L9.14438 3.15356C9.0157 2.85662 8.79444 2.60926 8.51362 2.44841C8.2328 2.28756 7.9075 2.22184 7.58626 2.26106C6.31592 2.42822 5.14986 3.05209 4.30588 4.01615C3.4619 4.98021 2.99771 6.21852 3.00001 7.49981C3.00001 14.9436 9.05626 20.9998 16.5 20.9998C17.7813 21.0021 19.0196 20.5379 19.9837 19.6939C20.9477 18.85 21.5716 17.6839 21.7388 16.4136C21.7781 16.0924 21.7125 15.7672 21.5518 15.4864C21.3911 15.2056 21.144 14.9843 20.8472 14.8554ZM16.5 19.4998C13.3185 19.4963 10.2682 18.2309 8.01856 15.9813C5.76888 13.7316 4.50348 10.6813 4.50001 7.49981C4.49648 6.58433 4.82631 5.69887 5.42789 5.00879C6.02947 4.3187 6.86167 3.87118 7.76907 3.74981C7.7687 3.75355 7.7687 3.75732 7.76907 3.76106L9.73782 8.16731L7.80001 10.4867C7.78034 10.5093 7.76247 10.5335 7.74657 10.5589C7.60549 10.7754 7.52273 11.0246 7.5063 11.2825C7.48988 11.5404 7.54035 11.7981 7.65282 12.0307C8.5022 13.7679 10.2525 15.5051 12.0084 16.3536C12.2428 16.465 12.502 16.5137 12.7608 16.495C13.0196 16.4762 13.2692 16.3907 13.485 16.2467C13.5091 16.2305 13.5322 16.2129 13.5544 16.1942L15.8334 14.2498L20.2397 16.2232C20.2397 16.2232 20.2472 16.2232 20.25 16.2232C20.1301 17.1319 19.6833 17.9658 18.9931 18.5689C18.3028 19.172 17.4166 19.5029 16.5 19.4998Z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="ml-[18px]">
                <a href="tel:+911800123444" className="font-Inter text-[14px] font-medium text-white">
                +1 (234) 567-890
                </a>
                <p className="font-Inter text-[12px] font-medium text-white">Telefono</p>
              </div>
            </div>
            <div className="mt-[23px] flex">
              <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 0H1C0.801088 0 0.610322 0.0790178 0.499758 0.207106C0.389194 0.335194 0.351224 0.498157 0.399999 0.661015V14.339C0.449775 14.5019 0.487745 14.6649 0.598309 14.792C0.708873 14.9191 0.899639 14.9981 1.09855 14.9981H19C19.2001 14.9981 19.3912 14.9191 19.5022 14.792C19.6131 14.6649 19.6514 14.5019 19.6007 14.339V0.661015C19.5499 0.498157 19.5119 0.335194 19.4014 0.207106C19.2908 0.0790178 19.1004 0 19 0ZM1 1.5H19C19.0555 1.5 19.1051 1.538 19.1335 1.58918C19.1618 1.64036 19.1709 1.70579 19.1589 1.76969C19.1468 1.83358 19.114 1.88885 19.0658 1.92827C19.0177 1.96769 18.9542 1.97876 18.8907 1.94769C18.8273 1.91663 18.7733 1.8443 18.742 1.75299L13.4638 8.49981L18.742 15.2476C18.7733 15.1359 18.8273 15.0636 18.8907 15.0326C18.9542 15.0015 19.0177 14.9927 19.0658 15.0321C19.114 15.0715 19.1468 15.1268 19.1589 15.1907C19.1709 15.2546 19.1618 15.32 19.1335 15.3712C19.1051 15.4223 19.0555 15.4603 19 15.4603H1C0.944446 15.4603 0.894867 15.4223 0.86651 15.3712C0.838165 15.32 0.829085 15.2546 0.841071 15.1907C0.853057 15.1268 0.885858 15.0715 0.934058 15.0321C0.982256 14.9927 1.04568 14.9817 1.10915 15.0128C1.1733 15.0439 1.22676 15.1154 1.22676 15.2098C1.22676 15.2821 1.22218 15.3395 1.21217 15.3879C1.20216 15.4363 1.18779 15.4685 1.16815 15.4823C1.14851 15.4961 1.12086 15.4909 1.09855 15.4628C1.07625 15.4346 1.06378 15.3908 1.06378 15.3474C1.06378 15.3149 1.09102 15.2854 1.1292 15.2737C1.17811 15.2545 1.23778 15.2648 1.27058 15.3127L6.46621 8.49981L1.27058 1.68707C1.23778 1.73911 1.17811 1.74932 1.1292 1.7301C1.09102 1.71842 1.06378 1.68886 1.06378 1.6564C1.06378 1.61393 1.07625 1.58009 1.09855 1.55199C1.12086 1.52389 1.14851 1.51864 1.16815 1.53241C1.18779 1.54617 1.20216 1.57836 1.21217 1.62674C1.22218 1.67512 1.22676 1.73256 1.22676 1.80482C1.22676 1.89828 1.1733 1.96978 1.10915 1.99983C1.04568 2.03091 0.982256 2.01991 0.934058 1.99083C0.885858 1.9617 0.838165 1.88883 0.841071 1.82597C0.853057 1.76108 0.829085 1.69566 0.841071 1.63176C0.853057 1.56786 0.906088 1.52795 0.973632 1.5185C1.0304 1.5059 1.06197 1.48646 1.06625 1.46088C1.07216 1.43445 1.09434 1.41316 1.12426 1.40965C1.15419 1.40614 1.19294 1.42132 1.21676 1.44888C1.24058 1.47643 1.22628 1.52653 1.20249 1.56134"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div className="ml-[18px]">
                <a href="mailto:contact@regcon.com" className="font-Inter text-[14px] font-medium text-white">
                  contact@regcon.com
                </a>
                <p className="font-Inter text-[12px] font-medium text-white">Correo</p>
              </div>
            </div>
          </div>

          {/* Sección de Derechos Reservados */}
          <div className="mt-[23px] flex flex-col md:w-[316px] md:mt-0">
            <p className="font-Inter text-[12px] font-medium text-white">
              &copy; 2024 RegCon. Todos los derechos reservados.
            </p>
            <div className="mt-2 flex gap-6">
              <Link to="/Términos Y Condiciones" className="font-Inter text-[12px] text-white">
                Términos de Servicio
              </Link>
              <Link to="/Política de Privacidad" className="font-Inter text-[12px] text-white">
                Política de Privacidad
              </Link>
              <Link to="/Acerca de" className="font-Inter text-[12px] text-white">
                Acerca de
              </Link>
              <Link to="/Contáctanos" className="font-Inter text-[12px] text-white">
              Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
