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
     * Analytics APIs
     * @param {}
     */
    analytics() {
        var endpoints: { users: Function, dealers: Function, watches: Function } = { users: Function, dealers: Function, watches: Function };

        endpoints.users = () => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `query {
                            getUsers(dealer: false) { total }
                        }`
            }
        })

        endpoints.dealers = () => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `query {
                            getUsers(dealer: true) { total }
                        }`
            }
        })

        endpoints.watches = () => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `query {
                            getProducts(featured: false) { total }
                        }`
            },
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYwOTcwMDcwMSwiZXhwIjoxNjA5NzAyNTAxfQ.bF13bbAMgdguNRM0E0JOzMGs74rXcNiIL7g4uJpuGBg"
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
                                    confirmed,
                                    phone,
                                    birth,
                                    gender,
                                    address
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
                                    confirmed,
                                    phone,
                                    birth,
                                    gender,
                                    address
                                }
                            }
                        }`
            }
        })

        return endpoints
    }

    
    /**
     * Watches APIs
     * @param {}
     */
    watches() {
        var endpoints: { index: Function } = { index: Function };

        endpoints.index = (data: pagination) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `query {
                            getProducts(featured: false, limit: ${data.limit}, offset: ${data.offset}) {
                                results {
                                    id,
                                    name,
                                    model,
                                    description,
                                    condition,
                                    location,
                                    featured,
                                    confirmed,
                                    delivery,
                                    price,
                                    production_year,
                                    case_material,
                                    movement,
                                    bracelet_material,
                                    gender,
                                    brand_id,
                                    calibar,
                                    base_calibar,
                                    power_reserve,
                                    jewels,
                                    case_diameter,
                                    water_resistance,
                                    bezel_material,
                                    crystal,
                                    dial,
                                    dial_numbers,
                                    bracelet_color,
                                    clasp,
                                    clasp_material
                                }
                            }
                        }`
            },
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYwOTc5MDkxNiwiZXhwIjoxNjA5NzkyNzE2fQ.Q3Kv7IAvG4N_ff04S17oYm-fA85J055V_Kbetbh1wk0"
            }
        })

        return endpoints
    }

}

export default API