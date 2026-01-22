import axios from 'axios'
import { config } from './config'


export async function login(email, password) {
    try {
        const url = `${config.server}/users/authenticate`
        const body = { email, password }
        const response = await axios.post(url, body)
        return response.data

    }
    catch (ex) {
        return { error: "Invalid Credentials" }
    }
}


export async function register(name, email, password, phone) {
    try {
        const url = `${config.server}/users/register`

        const body = {
            "fullName": name,
            "email": email,
            "password": password,
            "phone": phone
        }
        const response = await axios.post(url, body)
        console.log(response)
        return response.data
    }
    catch (ex) {
        console.log("some error occured : " + ex)
    }
}