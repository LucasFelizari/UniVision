import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Inicio } from '../screens/Inicio';
import { Camera } from '../screens/Camera';
import { Idioma } from '../screens/Idioma';

type AppRoutes = {
    Inicio: undefined;
    Camera: undefined;
}

export type AppRoutesProps = NativeStackNavigationProp<AppRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} >
            <Screen
                name="Inicio"
                component={Inicio}
            />
            <Screen
                name="Camera"
                component={Camera}
            />
        </Navigator>
    );
}