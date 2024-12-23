import { NextResponse } from "next/server";
import { Twilio } from "twilio";
import templates from "@/utils/data/whatsapp-templates.json";


const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;

const TwilioClient = new Twilio(
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN
);

export async function POST(req: Request) {
    try {
        const { to, templateName, variables } = (await req.json()) as {
            to: string;
            templateName: keyof typeof templates;
            variables: string[];
        };

        const template = templates[templateName];
        if (!template) {
            return NextResponse.json(
                { error: "Plantilla no encontrada" },
                { status: 400 }
            );
        }
        const formattedVariables = variables.reduce((acc, value, index) => {
            acc[index + 1] = value;
            return acc;
        }, {} as Record<string, string>);
        await TwilioClient.messages.create({
            from: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
            contentSid: template.id,
            to: `whatsapp:${to}`,
            contentVariables: JSON.stringify(formattedVariables),
        });

        return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}
