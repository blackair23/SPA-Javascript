import { clearUserData, getUserData } from "../util.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    };


    if(data != undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if(userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        
        const res = await fetch(host + url, options);
    
        if(res.ok === false) {
            if (res.status == 403){
                clearUserData();
            }
            const error = await res.json();
            throw new Error(error.message); 
        }

        //check if No Content because res.json() throw exeption 
        if(res.status == 204) {
            return res;
        } else {
            return res.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
};

export async function get(url) {
    return request('GET', url)
}

export async function post(url, data) {
    return request('POST', url, data);
}

export async function put(url, data) {
    return request('PUT', url, data)
}

export async function del(url) {
    return request('DELETE', url)
}