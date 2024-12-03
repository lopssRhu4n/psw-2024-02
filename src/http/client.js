const baseUrl = 'http://localhost:3004';


export const http = async (endpoint, customConfig) => {
    const config = { ...customConfig };
    if (config.body) {
        config.body = JSON.stringify(config.body);
    }
    return await (await fetch(baseUrl + endpoint, config)).json()
}

