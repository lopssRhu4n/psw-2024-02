const baseUrl = process.env.API_URL ?? 'http://localhost:3004';


export const http = async (endpoint, customConfig) => {
    const config = { ...customConfig };
    const token = localStorage.getItem('eventese-token');
    if (config.body) {
        config.body = JSON.stringify(config.body);
    }
    config.headers = { "Content-Type": "application/json" }
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }

    return await (await fetch(baseUrl + endpoint, config)).json()
}

