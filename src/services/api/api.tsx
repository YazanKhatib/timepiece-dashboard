import axios from 'axios';

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

        endpoints.login = ( data: { username: string, password: string } ) => axios({
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

}

export default API