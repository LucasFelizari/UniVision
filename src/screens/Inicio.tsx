import { Button, Center, Icon, Image, Spacer, VStack } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { AppRoutesProps } from "../routes/app.routes";
const logo = require('../../assets/logo.png');
const appName = require('../../assets/app-name.png');

export function Inicio() {
    const navigation = useNavigation<AppRoutesProps>();

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

            <VStack width="full" mb={12} mt={10}>
                <Button
                    borderRadius={20}
                    bg="#1632ca"

                    onPress={() => navigation.navigate('Camera')}
                    shadow={'5'}
                >
                    <Icon
                        as={<FontAwesome name="camera-retro" />}
                        size={16}
                        m={16}
                        color="white"
                    />
                </Button>
            </VStack>
        </Center>
    );
}
