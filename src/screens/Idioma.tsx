import { useNavigation } from "@react-navigation/native";
import { Button, Center, HStack, Heading, IconButton, Text, VStack, Spacer, Divider, Switch } from "native-base";
import { AppRoutesProps } from "../routes/app.routes";
import { useTranslation } from 'react-i18next';
import { Feather } from "@expo/vector-icons";
import { useAppConfigContext } from "../hooks/useAppConfigContext";
import { LanguageSlug } from "../contexts/AppConfigContext";

export type IIdioma = 'pt' | 'en';

export function Idioma() {
    const navigation = useNavigation<AppRoutesProps>();
    const { t } = useTranslation();

    return (
        <VStack flex={1} bg="#1E1E1E" alignItems='start' paddingTop={12}>
            <IconButton
                icon={<Feather name="arrow-left" color="#b9b9b9" size={50} />}
                onPress={() => navigation.goBack()}
            />
            <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginLeft: 20 }}
                mt={6}
            >
                {t('idioma')}
            </Text>
            {/* <Divider bg={'#494949'} my={5} /> */}
            <VStack mt={4} mb={6} space={4} w='90%' mx='auto'>
                <SelectLanguageButton buttonLanguage={LanguageSlug.EN} nome='English' />
                <SelectLanguageButton buttonLanguage={LanguageSlug.PT} nome='Português' />
            </VStack>
            <Divider bg={'#494949'} mt={2} mb={5} />
        </VStack>
    );
}

function SelectLanguageButton({ buttonLanguage, nome }: { buttonLanguage: LanguageSlug, nome: string }) {
    const { i18n } = useTranslation();
    const { language, setLanguage } = useAppConfigContext();

    function changeLanguage(language: LanguageSlug) {
        i18n.changeLanguage(language);
        setLanguage(language);
    }
    return (
        <Button
            bg="#3f3f3f"
            h={14}
            borderRadius={10}
            onPress={() => changeLanguage(buttonLanguage)}
            justifyContent={'flex-start'}
            paddingLeft={10}
            borderWidth={language === buttonLanguage ? 3 : 0}
            borderColor={language === buttonLanguage ? '#00857a' : 'transparent'}
        >
            <Text
                style={{ color: 'white', fontWeight: 'bold' }}
            >
                {nome}
            </Text>
        </Button>
    );
}