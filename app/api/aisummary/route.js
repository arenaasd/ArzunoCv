import { GoogleGenAI } from '@google/genai'

export async function POST(req) {
  try {
    const { prompt } = await req.json()

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    })

    const config = {
      responseMimeType: 'application/json',
    }

    const model = 'gemini-2.0-flash'

    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ]

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    })

    const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text || ''

    return Response.json({ summary: aiText })
  } catch (error) {
    console.error('AI Summary generation error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate summary' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
