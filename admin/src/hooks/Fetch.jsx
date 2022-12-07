
const apiUrlBase = process.env.REACT_APP_API_URL_BASE;


export const Fetch = async (endpoint, method="GET",data) => {
    
    const url = `${apiUrlBase}${endpoint}`;
    let response = await fetch(url);
    let result = await response.json();

    return result
}

