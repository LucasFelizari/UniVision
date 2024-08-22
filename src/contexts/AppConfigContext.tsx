import { Camera as ExpoCamera } from 'expo-camera'
import { createContext, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

export enum LanguageSlug {
    PT = 'pt',
    EN = 'en',
}

export type AppConfigContextProps = {
    isLoading: boolean;
    language: string;
    camRef?: React.RefObject<ExpoCamera>;
    setLanguage: (idioma: LanguageSlug) => void;
}

type AppConfigProviderProps = {
    children: ReactNode;
}

export const AppConfigContext = createContext<AppConfigContextProps>({} as AppConfigContextProps);

export function ChromaFinderProvider({ children }: AppConfigProviderProps) {
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>(i18n.language as LanguageSlug);

    return (
        <AppConfigContext.Provider value={{
            isLoading,
            language,
            setLanguage,
        }}>
            {children}
        </AppConfigContext.Provider>
    );
}