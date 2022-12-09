import {Fetch} from './Fetch'

export const getData = async (endpoint) =>{
    try {
        let response = await Fetch(endpoint)
        return response;
    } catch (error) {
        console.log(error)
    }
}