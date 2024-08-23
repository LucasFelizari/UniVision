import axios from "axios";
import { LanguageSlug } from "../contexts/AppConfigContext";


export default async function getAzureVisionImageDescription(imagem: Buffer, idioma: LanguageSlug): Promise<string> {
    if (!imagem) throw new Error('Imagem não encontrada');

    const subscriptionKey = 'a823b2509f464696b072577d96bd03e4';
    const uriBase = 'https://brazilsouth.api.cognitive.microsoft.com/vision/v3.2/describe';
    const params = {
        maxCandidates: 1,
        language: idioma,
        'model-version': 'latest'
    };

    const headers = {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': subscriptionKey
    };

    try {
        const response = await axios.post(uriBase, imagem, {
            params,
            headers,
            responseType: 'json',
            transformResponse: [(data) => JSON.parse(data)],
        }
        );

        console.log(response);
        
        const { captions } = response.data.description;
        return captions[0].text;
    }
    catch (error: any) {
        console.log(error.response);
        throw new Error("Não foi possivel capturar a descrição da imagem");
    }
}