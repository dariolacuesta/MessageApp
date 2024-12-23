"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function SMSModal({ closeModal }: { closeModal: () => void }) {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: phone,
          message: message,
        }),
      });

      if (response.ok) {
        toast.success("¡SMS enviado con éxito!");
        closeModal();
      } else {
        const data = await response.json();
        toast.error(`Error: ${data.error || "Error desconocido"}`);
      }
    } catch (error) {
      toast.error("Error: No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        {/* Botón de Cerrar */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Enviar SMS</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="tel"
            placeholder="Número de teléfono (ej: +541166778899)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none"
          />
          <textarea
            placeholder="Escribe tu mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white font-medium ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition-all`}
          >
            {loading ? "Enviando..." : "Enviar SMS"}
          </button>
        </form>
      </div>
    </div>
  );
}
