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

    const response = await fetch(baseUrl + endpoint, config)
    if (response.ok) {
        return await response.json();
    }

    return Promise.reject({ code: response.status, data: await response.json() })

}

export const httpFormData = async (endpoint, customConfig, data) => {
    const token = localStorage.getItem('eventese-token');
    const config = { ...customConfig, headers: { 'Authorization': 'Bearer ' + token } };
    // config.headers['Authorization'] = 'Bearer ' + token;

    const response = await fetch(baseUrl + endpoint, {
        method: "POST",
        body: data,
        ...config
    });

    if (response.ok) {
        return await response.json();
    }

    return Promise.reject({ code: response.status, data: await response.json() });


}
