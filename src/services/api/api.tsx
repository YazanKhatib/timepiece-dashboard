import axios from 'axios';

interface pagination {
    offset: number,
    limit: number
}

class API {

    url: string;

    constructor() {
        this.url = "https://timepiecenodejs.herokuapp.com/graphql"
    }


    /**
     * Authentication APIs
     * @param {}
     */
    auth() {
        var endpoints: { login: Function } = { login: Function };

        endpoints.login = (data: { username: string, password: string }) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `mutation {
                            loginAdmin(username: "${data.username}", password: "${data.password}") { id, username, email, token }
                        }`
            }
        })

        return endpoints
    }


    /**
     * Dealers APIs
     * @param {}
     */
    dealers() {
        var endpoints: { index: Function } = { index: Function };

        endpoints.index = (data: pagination) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `query {
                            getUsers(dealer: false, limit: ${data.limit}, offset: ${data.offset}) {
                                results {
                                    id,
                                    username,
                                    first_name,
                                    last_name,
                                    email,
                                    confirmed
                                }
                            }
                        }`
            }
        })

        return endpoints
    }

    
    /**
     * Users APIs
     * @param {}
     */
    users() {
        var endpoints: { index: Function } = { index: Function };

        endpoints.index = (data: pagination) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `query {
                            getUsers(dealer: false, limit: ${data.limit}, offset: ${data.offset}) {
                                results {
                                    id,
                                    username,
                                    first_name,
                                    last_name,
                                    email,
                                    confirmed
                                }
                            }
                        }`
            }
        })

        return endpoints
    }

}

export default API