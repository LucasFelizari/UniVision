import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "../routes/app.routes";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Center, Heading, HStack, Icon, IconButton, Spinner, Stack, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import { speak } from "expo-speech";

import getImageDescription from "../services/getImageDescription";
import { Alert } from "react-native";

export function Camera() {
    const navigation = useNavigation<AppRoutesProps>();
    const [type, setType] = useState(CameraType.back);
    const [description, setDescription] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState<boolean>();
    const camRef = useRef<ExpoCamera>(null);

    async function handleTakePicture() {
        try {
            try {
                setIsLoading(true);

                const image = await takePicture();
                if (!image) throw new Error('Erro ao tirar foto');

                const imageDescription = await getImageDescription(image);
                if (imageDescription) {
                    setDescription(imageDescription);
                }

                speak(imageDescription);

            } catch (error) {
                Alert.alert('Ocorreu um erro');
                console.log(error);
            } finally {
                setIsLoading(false);
            }

        } catch (error) {
            console.log(error);
            //speak(t('erro obter os dados'));
        }
    }

    async function takePicture() {
        try {
            if (camRef?.current) {
                const { base64 } = await camRef?.current?.takePictureAsync({
                    base64: true,
                    quality: 0.6,
                });
                if (!base64) throw new Error('Erro ao tirar foto');

                return base64;
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            throw new Error('Camera não encontrada');
        }
    }

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
        return <Center><Heading>{'Sem acesso à câmera'}</Heading></Center>;
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
                                color='blue.500'
                                mt={4}
                            />
                        </Center>
                    )}

                    <VStack>
                        {description && (
                            <VStack
                                alignItems='center'
                                borderColor='#164eb1'
                                borderWidth={2}
                                padding={2}
                                margin={2}
                                borderRadius={16}
                            >
                                <Heading color='white' size='sm'>
                                    {description}
                                </Heading>
                            </VStack>
                        )}

                        <Center mb={16} mt={10} >
                            <Button
                                bg='#164eb1'
                                rounded='full'
                                size={32}
                                onPress={handleTakePicture}
                                p={6}
                                disabled={isLoading}
                            >
                                <Icon as={Feather} name='camera' size={16} color='white' />
                            </Button>
                        </Center>
                    </VStack>
                </Box>
            </ExpoCamera>
        </Stack>
    );
}