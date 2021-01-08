import axios from 'axios';
import { useCookies, withCookies } from 'react-cookie';
import { addWatchFields } from '../../containers/Watches/AddModal/AddWatchSlice';
import { addToDate } from '../hoc/helpers';

interface pagination {
    offset: number,
    limit: number
}

class API {

    url: string;

    constructor() {
        this.url = "https://timepiecenodejs.herokuapp.com/graphql"

        const [cookies, setCookie] = useCookies();

        // Add Auth header
        axios.interceptors.request.use(async (config) => {
            if (cookies.userinfo && !config.headers.skipInterceptors) {
                if (cookies.token)
                    config.headers["Authorization"] = "Bearer " + cookies.token.accessToken;
                else {
                    // Rrefresh token
                    await axios({
                        url: this.url,
                        method: 'post',
                        data: {
                            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            // !!!!!!!!! Should be replaced with refreshToken query !!!!!!!!!
                            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                            query: `mutation {
                                            loginAdmin(username: "admin", password: "123456") { user { id, username, email }, accessToken, refreshToken }
                                        }`
                        },
                        headers: {
                            "skipInterceptors": true
                        }
                    }).then((response) => {
                        setCookie("token", { accessToken: response.data.data.loginAdmin.accessToken, refreshToken: response.data.data.loginAdmin.refreshToken }, { expires: addToDate( new Date(), "minutes", 29 ) })
                        config.headers["Authorization"] = "Bearer " + response.data.data.loginAdmin.accessToken;
                    })
                }
            }
            return (config);

        })
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
                            loginAdmin(username: "${data.username}", password: "${data.password}") { user { id, username, email }, accessToken, refreshToken }
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
                            getUsers(dealer: true, limit: ${data.limit}, offset: ${data.offset}) {
                                total,
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
                                    address,
                                    blocked
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
        var endpoints: { index: Function, update: Function, delete: Function } = { index: Function, update: Function, delete: Function };

        endpoints.index = (data: pagination) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `query {
                            getUsers(dealer: false, limit: ${data.limit}, offset: ${data.offset}) {
                                total,
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

        endpoints.update = (data: {blocked: boolean, id: number}) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `mutation {
                            updateUserbyId(id: ${data.id}, blocked: ${data.blocked}) {
                                blocked
                            }
                        }`
            }
        })

        endpoints.delete = ( data: string[] ) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `mutation {
                            deleteUsers( ids: [${data.join(", ")}] )
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
        var endpoints: { index: Function, add: Function, update: Function, updateStatus: Function, setFeatured: Function, delete: Function } = { index: Function, add: Function, update: Function, updateStatus: Function, setFeatured: Function, delete: Function };

        endpoints.index = (data: pagination) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `query {
                            getProducts(featured: false, limit: ${data.limit}, offset: ${data.offset}) {
                                total,
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
            }
        })

        endpoints.add = (data: addWatchFields) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `mutation {
                        addProduct(
                            clasp_material: "${data.clasp_material}",
                            clasp: "${data.clasp}",
                            bracelet_color: "${data.bracelet_color}",
                            dial_numbers: "${data.dial_numbers}",
                            dial: "${data.dial}",
                            crystal: "${data.crystal}",
                            bezel_material: "${data.bezel_material}",
                            water_resistance: ${Number(data.water_resistance)},
                            case_diameter: ${Number(data.case_diameter)},
                            jewels: ${Number(data.jewels)},
                            power_reserve: ${Number(data.power_reserve)},
                            base_calibar: "${data.base_calibar}",
                            calibar: "${data.calibar}",
                            gender: "${data.gender}",
                            production_year: ${Number(data.production_year)},
                            bracelet_material: "${data.bracelet_material}",
                            case_material: "${data.case_diameter}",
                            movement: "${data.movement}",
                            location: "${data.location}",
                            description: "${data.description}",
                            condition: "${data.condition}",
                            delivery: "${data.delivery}",
                            price: ${Number(data.price)},
                            model: "${data.model}",
                            brand: "${data.brand}"
                        ) { id }
                    }`
            }
        })

        endpoints.update = (data: addWatchFields, id: string) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `mutation {
                            updateProduct(
                                id: "${id}",
                                clasp_material: "${data.clasp_material}",
                                clasp: "${data.clasp}",
                                bracelet_color: "${data.bracelet_color}",
                                dial_numbers: "${data.dial_numbers}",
                                dial: "${data.dial}",
                                crystal: "${data.crystal}",
                                bezel_material: "${data.bezel_material}",
                                water_resistance: ${Number(data.water_resistance)},
                                case_diameter: ${Number(data.case_diameter)},
                                jewels: ${Number(data.jewels)},
                                power_reserve: ${Number(data.power_reserve)},
                                base_calibar: "${data.base_calibar}",
                                calibar: "${data.calibar}",
                                gender: "${data.gender}",
                                production_year: ${Number(data.production_year)},
                                bracelet_material: "${data.bracelet_material}",
                                case_material: "${data.case_diameter}",
                                movement: "${data.movement}",
                                location: "${data.location}",
                                description: "${data.description}",
                                condition: "${data.condition}",
                                delivery: "${data.delivery}",
                                price: ${Number(data.price)},
                                model: "${data.model}",
                                brand: "${data.brand}"
                            ) { id }
                        }`
            }
        })

        endpoints.updateStatus = (data: {confirmed: boolean, id: string}) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `mutation {
                            updateProduct(id: "${data.id}", confirmed: ${data.confirmed}) {
                                confirmed
                            }
                        }`
            }
        })

        endpoints.setFeatured = (data: {featured: boolean, id: string}) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `mutation {
                            updateProduct(id: "${data.id}", featured: ${data.featured}) {
                                featured
                            }
                        }`
            }
        })

        endpoints.delete = ( data: string[] ) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `mutation {
                            deleteProducts( ids: [${data.join(", ")}] )
                        }`
            }
        })

        return endpoints
    }

    /**
     * Offers APIs
     * @param {}
     */
    offers() {
        var endpoints: { index: Function } = { index: Function };

        endpoints.index = (data: pagination) => axios({
            url: this.url,
            method: 'post',
            data: {
                query: `query {
                         getOffers {
                            id,
                            username,
                            first_name,
                            last_name,
                            email,
                            phone,
                            birth,
                            gender,
                            address,
                            offers {
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
                                    proposed_price,
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
            }
        })

        return endpoints
    }

}


export default API