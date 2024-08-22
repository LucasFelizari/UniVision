import * as Speech from 'expo-speech';

export default function speak(texto: string, language: string = 'pt-BR') {
    Speech.speak(texto, { language: language });
}