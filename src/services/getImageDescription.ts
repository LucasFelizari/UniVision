import axios from "axios";
import { OPENAI_API_URL, OPENAI_API_KEY } from '@env';

export default async function getImageDescription(base64Image: string): Promise<string> {
    if (!OPENAI_API_URL) {
        throw new Error("URL do ChatGPT não configurada.");
    }

    if (!OPENAI_API_KEY) {
        throw new Error("API Key do ChatGPT não configurada.");
    }

    const body = {
        "model": "gpt-4o-mini", 
        "messages": [
            {
                "role": "system",
                "content": "Você é um assistente para deficientes visuais que oferece breves descrições de imagens. Descreva as imagens com uma frase curta. Descreva a imagem diretamente, não comece com 'A imagem mostra...'."
            },
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Descreva esta imagem:"
                      },
                      {
                        "type": "image_url",
                        "image_url": {
                            "url": `data:image/jpeg;base64,${base64Image}`
                        }
                      }
                ]
            }
        ]
    };

    try {
        const response = await axios.post(OPENAI_API_URL, body, { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
         });
        const description = response.data.choices[0].message.content;  

        return description;
        
    } catch (error: any) {
        console.log(error.response);
        throw new Error("Não foi possível capturar a descrição da imagem.");
    }


}