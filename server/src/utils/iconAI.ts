import { GoogleGenerativeAI } from '@google/generative-ai';


export const getAutoIconWithAI = async (categoryName: string): Promise<string> => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
        
      const prompt = `
            You are a system that maps category names to a single emoji.
            Given the category "${categoryName}", reply with EXACTLY ONE EMOJI representing the best match.
            Rules: Return ONLY the emoji character. Do not use words. Fallback to "📦".
        `;

        const result = await model.generateContent(prompt);

        const cleanIcon = result.response.text().trim();
        
        return cleanIcon || '📦';
    } catch (error) {
        console.error("AI Icon Generation Failed:", error instanceof Error ? error.message : error);
        return '📦'; 
    }
};