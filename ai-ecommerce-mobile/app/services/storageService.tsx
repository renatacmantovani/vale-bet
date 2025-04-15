import AsyncStorage from '@react-native-async-storage/async-storage';

const storageService = {
    save: async (key: string, item: string) => {
        await AsyncStorage.setItem(key, item)
    },
    getItem: async (key: string) => {
        try{
            const item: any = await AsyncStorage.getItem(key)
            return JSON.parse(item)
        } catch (error) {
            return null
        }
    }
}

export default storageService