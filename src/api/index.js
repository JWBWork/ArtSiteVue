import axios from "axios";

export default {
    search(searchQuery) {
        // component passes 'this' value for 'cthis', i.e. component this
        return new Promise((resolve, reject) => {
            axios.get(
                '/search',
                { params: { searchQuery: searchQuery } }
            ).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }
}