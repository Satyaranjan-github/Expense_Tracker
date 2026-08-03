import { GoogleGenerativeAI } from '@google/generative-ai';


export const getAutoIconWithAI = async (categoryName: string): Promise<string> => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    console.log("Generating icon for category:", categoryName);
    console.log("My API Key is:",genAI);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
        
        const prompt = `
            You are a system that maps category names to exact Lucide React icon names.
            Given the category "${categoryName}", reply with EXACTLY ONE WORD representing the best matching icon.
            Rules: Only return the exact PascalCase name. Do not use markdown. Fallback to "CircleDot".
        `;

        const result = await model.generateContent(prompt);
        const cleanIconName = result.response.text().replace(/[^a-zA-Z]/g, '').trim();
        
        return cleanIconName || 'CircleDot';
    } catch (error) {
        console.error("AI Icon Generation Failed:", error instanceof Error ? error.message : error);
        return 'CircleDot'; 
    }
};