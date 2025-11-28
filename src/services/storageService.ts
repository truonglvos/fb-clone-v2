const TOKEN_KEY = "access_token";

export const storeService = {
    get(key: string){
        const value = localStorage.getItem(key);
        try{
            return value? JSON.parse(value) : null
        }catch{
            return value;
        }
    },
    set(key: string, value: unknown){
        localStorage.setItem(key, JSON.stringify(value))
    },
    remove(key: string){
        localStorage.removeItem(key);
    }
}

export const getAccessToken = () => storeService.get(TOKEN_KEY);
export const setAccessToken = (value: unknown) => storeService.set(TOKEN_KEY, value);
export const removeAccessToken = () => storeService.remove(TOKEN_KEY);