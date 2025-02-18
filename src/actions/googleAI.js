'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


export async function generateContentAI(prompt) {
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
    })

    const result = await model.generateContent(prompt)

    const response = await result.response
    const text = response.text()

    // Nettoyage de la réponse pour supprimer tout markdown
    const cleanResponse = text.trim()
        .replace(/^```json\n|```$/g, "")
        .replace(/[\x00-\x1F\x7F-\x9F]/g, "")

    try {
        const parsedResponse = JSON.parse(cleanResponse)
        return parsedResponse
    } catch (error) {
        console.log("Erreur pendant la genération: ", error);
        console.log("Raw response: ", text)
        throw new Error("Impossible de générer le contenu. Veuillez réessayer.")
    }
}