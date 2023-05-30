// reset Password

import axios from "axios";
import { API_URL } from "../../config";

export async function resetPassword(credentials) {
    const response = await axios.post(
        `${API_URL}/account/resetpassword`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response;
}

//  send mail for forgot password

export async function sendMail(email) {
    const response = await axios.post(
        `${API_URL}/account/forgotpassword`,
        email,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response;
}