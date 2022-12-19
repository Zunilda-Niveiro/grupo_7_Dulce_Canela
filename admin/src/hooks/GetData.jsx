import {Fetch} from './Fetch'

export const getData = async (endpoint,method,data) =>{
  
    try {
        let response = await Fetch(endpoint,method,data)
        return response;
    } catch (error) {
        console.log(error)
    }
}