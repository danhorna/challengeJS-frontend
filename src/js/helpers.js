import axios from 'axios';

export async function checkLogin() {
    let data;
    let token = localStorage.getItem("loginToken");
    if (token) {
        await axios.post(process.env.REACT_APP_BACK_URL + '/api/users/check', { token })
            .then(res => {
                data = true
            })
            .catch(err => {
                localStorage.removeItem("loginToken")
                data = false
            })
    } else {
        data = false
    }
    return data;
}

export function validateEmail(email) {
    let emailtest = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (emailtest.test(email))
        return true
    else
        return false
}

export async function getUser() {
    let data;
    let token = localStorage.getItem("loginToken");
    if (token) {
        await axios.post(process.env.REACT_APP_BACK_URL + '/api/users/check', { token })
            .then(res => {
                data = res.data
            })
            .catch(err => {
                localStorage.removeItem("loginToken")
                data = false
            })
    } else {
        data = false
    }
    return data;
}