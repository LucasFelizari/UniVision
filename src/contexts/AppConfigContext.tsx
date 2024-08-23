import { Camera as ExpoCamera } from 'expo-camera'
import { createContext, ReactNode, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import converterArquivo from '../services/converterAquivo';
import { speak } from 'expo-speech';
import getAzureVisionImageDescription from '../services/getImageDescription';

export enum LanguageSlug {
    PT = 'pt',
    EN = 'en',
}

export type AppConfigContextProps = {
    isLoading: boolean;
    language: string;
    camRef?: React.RefObject<ExpoCamera>;
    setLanguage: (idioma: LanguageSlug) => void;
    getImageDescription: () => Promise<void>;
}

type AppConfigProviderProps = {
    children: ReactNode;
}

export const AppConfigContext = createContext<AppConfigContextProps>({} as AppConfigContextProps);

export function ChromaFinderProvider({ children }: AppConfigProviderProps) {
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [language, setLanguage] = useState<LanguageSlug>(i18n.language as LanguageSlug);
    const camRef = useRef<ExpoCamera>(null);

    const getImageDescription = useCallback(async () => {
        try {
            setIsLoading(true);
            
            console.log(`ta batendo aqui`);
            const image = await takePicture();
            if (!image) throw new Error('Erro ao tirar foto');

           const imageDescription = await getAzureVisionImageDescription(image, language);
    
            if (!imageDescription) throw new Error('Erro ao obter descrição da imagem');

            speak(imageDescription);

        } catch (error) {
            throw new Error('Erro ao obter dados da imagem');
        } finally {
            setIsLoading(false);
        }
    }, [language, i18n.language]);

    async function takePicture() {
        try {
            if (camRef?.current) {
                const { base64 } = await camRef?.current?.takePictureAsync({
                    base64: true,
                    quality: 0.8,
                });
                if (!base64) throw new Error('Erro ao tirar foto');
                const imagemConvertida = await converterArquivo(base64);
                if (!imagemConvertida) throw new Error('Erro ao converter imagem');
                return imagemConvertida;
            }
        } catch (error) {
            throw new Error('Camera não encontrada');
        }
    }

    return (
        <AppConfigContext.Provider value={{
            isLoading,
            language,
            setLanguage,
            getImageDescription
        }}>
            {children}
        </AppConfigContext.Provider>
    );
}