import { NextResponse } from "next/server";
import { Twilio } from "twilio";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_SMS_NUMBER = process.env.TWILIO_SMS_NUMBER;

const TwilioClient = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export async function POST(req: Request) {
    try {
        const { to, message } = (await req.json()) as {
            to: string;
            message: string;
        };

        if (!to || !message) {
            return NextResponse.json(
                { error: "El número de teléfono y el mensaje son requeridos" },
                { status: 400 }
            );
        }

        const smsResponse = await TwilioClient.messages.create({
            body: message,
            from: TWILIO_SMS_NUMBER,
            to: to,
        });



        return NextResponse.json({
            message: "SMS enviado correctamente",
            sid: smsResponse.sid,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Error desconocido" },
            { status: 500 }
        );
    }
}
