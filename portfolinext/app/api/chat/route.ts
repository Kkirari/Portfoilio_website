import { NextResponse } from 'next/server';
import { generateChatResponse } from '@/services/geminiLLM';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // format messages for gemini API
        // Front-end sends: [{ from: 'user' | 'bot', text: '...' }]
        // Gemini expects: [{ role: 'user' | 'model', parts: [{ text: '...' }] }]

        // We pop the last message as the "new message", and keep the rest as history
        if (!messages || messages.length === 0) {
            return NextResponse.json({ error: "No messages provided" }, { status: 400 });
        }

        // Gemini requires the first message in history to be from a "user".
        // Our sample messages start with a 'bot' greeting. This breaks the API.
        // We will remove leading 'bot' messages to ensure history starts with 'user'.
        let validMessages = messages.slice(0, -1);
        while (validMessages.length > 0 && validMessages[0].from === 'bot') {
            validMessages.shift();
        }

        const formattedHistory = validMessages.map((msg: any) => ({
            role: msg.from === 'bot' ? 'model' : 'user',
            parts: [{ text: msg.text }]
        }));

        const lastMessage = messages[messages.length - 1].text;

        const aiResponse = await generateChatResponse(formattedHistory, lastMessage);

        return NextResponse.json({ response: aiResponse });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Failed to generate response." },
            { status: 500 }
        );
    }
}
