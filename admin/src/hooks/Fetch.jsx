
const apiUrlBase = process.env.REACT_APP_API_URL_BASE;


export const Fetch = async (endpoint, method,data) => {
    
    const url = `${apiUrlBase}${endpoint}`;
    let response;
    switch (method) {
        case "GET":
            response = await fetch(url);
            break;
        case "POST":
            response = await fetch(url,{
                method,
                body : JSON.stringify(data),
                headers : {"Content-type" : "application/json"}
            })
               break;
        case "PATCH":
            response = await fetch(url,{
                method,
                body : JSON.stringify(data),
                headers : {"Content-type" : "application/json"}
            })
                break;      
        default:
            break;
    }

    let result = await response.json();
    
    return result
}

