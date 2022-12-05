import React from 'react'
const apiUrlBase = "http://localhost:4000/api";


export const Fetch = async (endpoint, method="GET",data) => {
    
    const url = `${apiUrlBase}${endpoint}`;
    let response = await fetch(url);
    let result = await response.json();

    return result
}

