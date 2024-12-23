import { NextResponse } from "next/server";
import { Twilio } from "twilio";
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;

const TwilioClient = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export async function POST(req: Request) {
    try {
        const { Body, From } = await req.json();

        console.log(`Mensaje recibido de ${From}: ${Body}`);

        // Responder automáticamente a "Hola"
        if (Body.toLowerCase().includes("hola")) {
            await TwilioClient.messages.create({
                from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
                to: From,
                body: "¡Hola! ¿En qué puedo ayudarte?",
            });
        }

        return NextResponse.json({ message: "Mensaje procesado" });
    } catch (error) {
        console.error("Error en el Webhook:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Error desconocido" },
            { status: 500 }
        );
    }
}
