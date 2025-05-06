import { useCookies } from '@vueuse/integrations/useCookies.mjs';
const Tokenkey = 'admin-token'
const cookies = useCookies()

export const getToken = () => {return cookies.get(Tokenkey)}

export const setToken = (token) => {return cookies.set(Tokenkey, token)}

export const removeToken = () => {return cookies.remove(Tokenkey)}

