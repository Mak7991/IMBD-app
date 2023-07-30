import axios from 'axios';

const get_Movies_Series = (query = '') => {
    return axios.get(
        `/3/search/multi?query=${query}`
    );
};

const add_To_Favourite = (data) => {
    return axios.post(
        `/3/account/20224719/favorite`, data
    );
}

const get_Favourite_Movies = () => {
    return axios.get(
        `/3/account/20224719/favorite/movies
        `
    );
}

const get_Favourite_Tv = () => {
    return axios.get(
        `/3/account/20224719/favorite/tv
        `
    );
}

export {
    get_Movies_Series,
    add_To_Favourite,
    get_Favourite_Movies,
    get_Favourite_Tv
}