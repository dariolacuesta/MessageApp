"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function WhatsAppTemplateModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>(
    "appointment_confirmation"
  );
  const [variables, setVariables] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  // Define los templates disponibles
  type TemplateKey =
    | "appointment_confirmation"
    | "appointment_reminder"
    | "appointment_canceled";

  const templates: Record<
    TemplateKey,
    { name: string; placeholders: string[] }
  > = {
    appointment_confirmation: {
      name: "Confirmación de Cita",
      placeholders: [
        "Nombre del cliente",
        "Tipo de servicio",
        "Nombre del establecimiento",
        "Fecha",
        "Hora",
      ],
    },
    appointment_reminder: {
      name: "Recordatorio de Cita",
      placeholders: [
        "Nombre del cliente",
        "Nombre del establecimiento",
        "Hora",
      ],
    },
    appointment_canceled: {
      name: "Cita Cancelada",
      placeholders: [
        "Nombre del cliente",
        "Nombre del establecimiento",
        "Fecha",
      ],
    },
  };

  const handleVariableChange = (index: number, value: string) => {
    const updatedVariables = [...variables];
    updatedVariables[index] = value;
    setVariables(updatedVariables);
  };

  const handleTemplateChange = (templateKey: TemplateKey) => {
    setSelectedTemplate(templateKey);
    setVariables(Array(templates[templateKey].placeholders.length).fill(""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: phone,
          templateName: selectedTemplate,
          variables: variables,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("¡Mensaje enviado con éxito!"); // Notificación exitosa
        closeModal();
      } else {
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
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Enviar WhatsApp</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            value={selectedTemplate}
            onChange={(e) =>
              handleTemplateChange(e.target.value as TemplateKey)
            }
            className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {Object.entries(templates).map(([key, template]) => (
              <option key={key} value={key}>
                {template.name}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Número de teléfono (ej: +541166778899)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none"
          />
          {templates[selectedTemplate]?.placeholders.map(
            (placeholder, index) => {
              if (placeholder.toLowerCase().includes("fecha")) {
                return (
                  <input
                    key={index}
                    type="date"
                    value={variables[index] || ""}
                    onChange={(e) =>
                      handleVariableChange(index, e.target.value)
                    }
                    required
                    className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none"
                  />
                );
              } else if (placeholder.toLowerCase().includes("hora")) {
                return (
                  <input
                    key={index}
                    type="time"
                    value={variables[index] || ""}
                    onChange={(e) =>
                      handleVariableChange(index, e.target.value)
                    }
                    required
                    className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none"
                  />
                );
              }
              return (
                <input
                  key={index}
                  type="text"
                  placeholder={placeholder}
                  value={variables[index] || ""}
                  onChange={(e) => handleVariableChange(index, e.target.value)}
                  required
                  className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none"
                />
              );
            }
          )}

          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white font-medium ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } transition-all`}
          >
            {loading ? "Enviando..." : "Enviar Mensaje"}
          </button>
        </form>

        {responseMessage && (
          <p
            className={`mt-4 text-center ${
              responseMessage.includes("Error")
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
}
