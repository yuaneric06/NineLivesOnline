import './CatCam.css'
import { useRef } from 'react'
import { GoogleGenAI } from "@google/genai";
import geminiApiKey from '/src/hidden.js'
import * as fs from "node:fs";

const ai = new GoogleGenAI({ apiKey: geminiApiKey });
async function generateImage() {
    console.log("generating first response");

    console.log("generating second response");

    const prompt = "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme";

    const response2 = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: prompt,
    });
    for (const part of response2.candidates[0].content.parts) {
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync("gemini-native-image.png", buffer);
            console.log("Image saved as gemini-native-image.png");
        }
    }
}

export default function CatCam() {
    const textRef = useRef(null);

    console.log("generating image");
    generateImage();

    return (
        <main className="cat-cam-main">
            <header className="cat-cam-header">
                <h1>Generate an image of a cat!</h1>
                <p>What would you like the cat to do?</p>
                <textarea
                    ref={textRef}
                    className="cat-cam-input"
                    type="text"
                />
            </header>
            <button
                className="cat-cam-button"
                onClick={() => console.log(textRef.current.value)} />
        </main>
    )
}