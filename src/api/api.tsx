import axios from "axios";
import { config } from '../config/config';
import firebaseApp from '../config/firebase';

const url_local: string = 'http://localhost:5000/graphql';

const getSuggestions = async (data: string) => {

    const url: string = 'https://limitless-fortress-61614.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json';
    try {
        return await axios.get(url, {
            params: {
                input: data,
                key: config.API_KEY,
                radius: 100000,
                language: 'en',
                //location: '9.0820,8.6753',
                //strictbounds: true
            }
        })
    } catch (err) {
        return err
    }
};

const getPlaces = async (lat: number, lng: number, radius: number, strings: String) => {
    const url: string = 'https://limitless-fortress-61614.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const location: string = `${lat}${' '}${lng}`
    try {
        return await axios.get(url, {
            params: {
                key: config.API_KEY,
                location: location,
                radius: radius,
                type: strings,
                keyword: strings,
                language: 'en'
            }
        })
    } catch (err) {
        return err
    }
}

const getGeoCodes = async (address: string) => {
    const url: string = 'https://limitless-fortress-61614.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json';
    try {
        const { data: results } = await axios.get(url, {
            params: {
                address: address,
                key: config.API_KEY
            }
        });
        return results;
    } catch (err) {
        return err;
    }
}

const saveSearchHistory = async (addr: String) => {
    // const url_local: string = 'http://localhost:5000/api/v1/searches';
    const url: string = 'https://obscure-inlet-96721.herokuapp.com/api/v1/searches';
    try {
        return axios.post(url, { address: addr })
    } catch (err) {
        return err;
    }
}

const getSearchHistory = async () => {
    // const url_local: string = 'http://localhost:5000/api/v1/searches';
    const url: string = 'https://obscure-inlet-96721.herokuapp.com/api/v1/searches';
    try {
        return axios.get(url)
    } catch (err) {
        return err;
    }
}
const saveUser = async (user: String) => {
    const url_local: string = 'http://localhost:5000/api/v1/user';
    // const url: string = 'https://obscure-inlet-96721.herokuapp.com/api/v1/searches';
    try {
        return axios.post(url_local, { username: user })
    } catch (err) {
        return err;
    }
}


const createUser = async (user: any) => {
    
    const queryData = {
        query: `
        mutation{
            createUser(userInput:{username: "${user['uid']}", email:"${user['email']}"}){
              _id
              email
            }
          }
        `
    }
    try {
        return axios.post(url_local, queryData)
    } catch (err) {
        return err;
    }

}

const createSearch = async (address: String, creator: String) => {
    console.log('api/createSearch :=> ',creator)
    console.log('api/createSearch :=> ',address)
    const queryData = {
        query: `
        mutation {
            createSearch(searchInput:{address:"${address}",creator:"${creator}" }){
              _id
            }
          }
        `
    }
    try {
        return await axios.post(url_local, queryData)
    } catch (err) {
        return err;
    }
}

const fetchSearch = async (email: String) => {
    const queryData = {
        query: `
        mutation {
            fetchSearch(fetchInput: {email:"${email}"}){
              address
              _id
            }
          }
        `
    }
    try {
        return axios.post(url_local, queryData)
    } catch (err) {
        return err;
    }
}
export {
    getSuggestions,
    getPlaces,
    getGeoCodes,
    saveSearchHistory,
    getSearchHistory,
    saveUser,
    createUser,
    createSearch,
    fetchSearch 
}