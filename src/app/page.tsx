"use client";

import SMSModal from "@/components/SmsModal";
import WhatsAppModal from "@/components/WhatsAppModal";
import { useState } from "react";

export default function Home() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  const closeModal = () => setModalOpen(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8 sm:p-20">
      <h1 className="text-4xl font-bold mb-12 text-center">Enviar Mensajes</h1>

      <div className="flex flex-wrap justify-center gap-8 mb-12">
        <button
          onClick={() => setModalOpen("sms")}
          className="flex items-center gap-3 px-8 py-3 text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-transform"
        >
          <img src="/sms-icon.svg" alt="SMS Icon" className="w-8 h-8" />
          SMS
        </button>
        <button
          onClick={() => setModalOpen("whatsapp")}
          className="flex items-center gap-3 px-8 py-3 text-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-transform"
        >
          <img
            src="/whatsapp-icon.svg"
            alt="WhatsApp Icon"
            className="w-8 h-8"
          />
          WhatsApp
        </button>
        <button
          onClick={() => setModalOpen("email")}
          className="flex items-center gap-3 px-8 py-3 text-lg bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-transform"
        >
          <img src="/email-icon.svg" alt="Email Icon" className="w-8 h-8" />
          Email
        </button>
      </div>
      {/* Modal Email - No Disponible */}
      {modalOpen === "whatsapp" && (
        <WhatsAppModal closeModal={() => setModalOpen(null)} />
      )}
      {modalOpen === "sms" && (
        <SMSModal closeModal={() => setModalOpen(null)} />
      )}
      {modalOpen === "email" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Función No Disponible</h2>
            <p className="text-gray-300">
              La funcionalidad de envío por email aún no está desarrollada.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
