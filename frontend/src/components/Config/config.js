import Cookies from 'universal-cookie';

const cookies = new Cookies()
const maxTime = 60 * 60 * 1
const TokenName = "Pseudo"

const TokenService = {
    setToken(setToken) {
        cookies.set(TokenName, setToken, {
            maxAge: maxTime,
            sameSite: "lax",
            secure: false,
            httpOnly: false
        })
    },

    deleteToken() {
        sessionStorage.clear()
        cookies.remove(TokenName)
    },

    getToken() {
        return cookies.get(TokenName)
    },

    isLogged() {
        if (TokenService.getToken() === null ||
            TokenService.getToken() === undefined) {
            return false
        } else {
            return true
        }
    }
}

export default TokenService;
