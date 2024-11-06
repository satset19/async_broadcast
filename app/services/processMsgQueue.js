import axios from "axios"


export const processMessageQueue = async (data) => {
    const Authorization = import.meta.env.VITE_AUTH

    return axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}/app/chat`,
        data,
        headers: {
            Authorization,
            "x-api-key": import.meta.env.VITE_X_API_KEY,
            jwt: import.meta.env.VITE_JWT,
            "Content-Type": "application/json",

        },
    })

}