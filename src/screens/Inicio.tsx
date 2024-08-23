import { Box, Button, Center, Heading, Icon, Image, Spacer, Text, VStack } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "../routes/app.routes";
import { useTranslation } from 'react-i18next';
const logo = require('../../assets/logo.png');
const appName = require('../../assets/app-name.png');

export function Inicio() {
    const navigation = useNavigation<AppRoutesProps>();

    const { t, i18n } = useTranslation();

    return (
        <Center
            height="full"
            p={12}
            bg="#1E1E1E"
        >
            <VStack space={16}>

                <Center mt={20} >
                    <Image
                        source={logo}
                        alt="Univision" size="xl"
                    />
                </Center>
                <Center  >
                    <Image
                        source={appName}
                        alt="Univision" size="xs" minW={300}
                    />
                </Center>
            </VStack>

            <Spacer />
            <VStack width="150px" space={3}>
                <Button
                    bg="#1632ca"
                    borderRadius={8}
                    onPress={() => navigation.navigate('Idioma')}
                    py={4}
                >
                    <Text
                        style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}
                        fontFamily="body"
                    >
                        {t('configuracoes')}
                    </Text>
                </Button>
            </VStack>
            <VStack width="full" mb={12} mt={10}>
                <Button
                    borderRadius={20}
                    bg="#1632ca"

                    onPress={() => navigation.navigate('Camera')}
                    shadow={'5'}
                >
                    <Icon
                        as={<FontAwesome name="camera-retro" />}
                        size={12}
                        m={8}
                        color="white"
                    />
                </Button>
            </VStack>
        </Center>
    );
}
