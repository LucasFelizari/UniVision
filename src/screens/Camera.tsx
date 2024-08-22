import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "../routes/app.routes";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Center, Heading, HStack, Icon, IconButton, Spinner, Stack, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";
import { Camera as ExpoCamera, CameraType } from 'expo-camera';
import { useTranslation } from "react-i18next";

export function Camera() {
    const navigation = useNavigation<AppRoutesProps>();
    const camRef = useRef<ExpoCamera>(null);
    const [type, setType] = useState(CameraType.back);
    const [isLoading, setIsLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean>();
    const { t } = useTranslation();

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
                            bg='#00857a'
                            rounded='full'
                            size='lg'
                            // onPress={handleTakePicture}
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