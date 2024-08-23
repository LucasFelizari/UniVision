import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "../routes/app.routes";
import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Center, Heading, HStack, Icon, IconButton, Spinner, Stack, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import { useTranslation } from "react-i18next";
import { speak } from "expo-speech";
import getAzureVisionImageDescription from "../services/getImageDescription";
import converterArquivo from "../services/converterAquivo";
import { LanguageSlug } from "../contexts/AppConfigContext";

export function Camera() {
    const navigation = useNavigation<AppRoutesProps>();
    const { t, i18n } = useTranslation();
    const [type, setType] = useState(CameraType.back);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [language, setLanguage] = useState<LanguageSlug>(i18n.language as LanguageSlug);
    const [hasPermission, setHasPermission] = useState<boolean>();
    const camRef = useRef<ExpoCamera>(null);

    async function handleTakePicture() {
        try {
            getImageDescription();
        } catch (error) {
            console.log(error);
            speak(t('erro obter os dados'));
        }
    }

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
            console.log(error);
            setIsLoading(false);
            throw new Error('Camera não encontrada');
        }
    }

    const getImageDescription = useCallback(async () => {
        try {
            setIsLoading(true);
            
            const image = await takePicture();
            if (!image) throw new Error('Erro ao tirar foto');

           const imageDescription = await getAzureVisionImageDescription(image, language);
    
            if (!imageDescription) throw new Error('Erro ao obter descrição da imagem');

            speak(imageDescription);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
            throw new Error('Erro ao obter dados da imagem');
        } finally {
            setIsLoading(false);
        }
    }, [language, i18n.language]);


    useEffect(() => {
        (async () => {
            const { status } = await ExpoCamera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <Center><Heading>Carregando...</Heading></Center>;
    }

    if (hasPermission === false) {
        return <Center><Heading>{t('sem acesso camera')}</Heading></Center>;
    }

    return (
        <Stack flex={1} >
            <ExpoCamera
                style={{ flex: 1 }}
                type={type}
                ref={camRef}
            >
                <Box mt={12} flex={1} justifyContent='space-between'>
                    <HStack justifyContent='space-between' px={4}>
                        <IconButton
                            icon={<Feather name="arrow-left" color="#FFFFFF" size={50} />}

                            onPress={() => navigation.goBack()}
                        />
                        <IconButton
                            icon={<Feather name="rotate-cw" color="#FFFFFF" size={40} />}
                            onPress={() => {
                                setType(
                                    type === CameraType.back
                                        ? CameraType.front
                                        : CameraType.back
                                );
                            }}
                        />
                    </HStack>
                    {isLoading && (
                        <Center>
                            <Spinner
                                size='lg'
                                color='green.500'
                                mt={4}
                            />
                        </Center>
                    )}
                    <Center mb={16} mt={10} >
                        <Button
                            bg='#164eb1'
                            rounded='full'
                            size='lg'
                            onPress={handleTakePicture}
                            p={6}
                            disabled={isLoading}
                        >
                            <Icon as={Feather} name='camera' size={10} color='white' />
                        </Button>
                    </Center>
                </Box>
            </ExpoCamera>
        </Stack>
    );
}