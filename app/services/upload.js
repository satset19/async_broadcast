const url = import.meta.env.VITE_API_DB_URL;
const token = import.meta.env.VITE_TOKEN
import { nanoid } from "nanoid"

export const upload = async (file) => {

    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('key', nanoid());
    formdata.append('folder', 'timkado1');


    const options = {
        method: 'POST',
        headers: {
            token,
        },
        body: formdata,
    };
    const response = await fetch(`${url}/api/v1/s3`, options);
    return response.json();
}