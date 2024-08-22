import { Box, Button, Center, Heading, Icon, Image, Spacer, Text, VStack } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "../routes/app.routes";
import { useTranslation } from 'react-i18next';
//const logo = require('../../assets/logo.png');

export function Inicio() {
    const navigation = useNavigation<AppRoutesProps>();

    const { t, i18n } = useTranslation();

    return (
        <Center
            height="full"
            p={12}
            bg="#1E1E1E"
        >
            <Center mt={20} >
                {/* <Image
                  source={logo}  
                alt="Chroma Finder" size="2xl" 
                /> */}
            </Center>

            <Spacer />
            <VStack width="150px" space={3}>
                <Button
                    bg="#00857a"
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
                    bg="#00857a"

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
