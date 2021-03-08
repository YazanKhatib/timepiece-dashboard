import axios from 'axios';
import { useCookies, withCookies } from 'react-cookie';
import { addWatchFields } from '../../containers/Watches/AddModal/AddWatchSlice';
import { addToDate } from '../hoc/helpers';

interface pagination {
    offset: number;
    limit: number;
}

class API {
    url: string;

    constructor() {
        this.url = 'https://dev.timepiece.qa/graphql';

        const [cookies, setCookie, removeCookie] = useCookies();
        console.log(cookies)
        // Add Auth header
        axios.interceptors.request.use(async (config) => {
            if (cookies.userinfo && !config.headers.skipInterceptors) {
                if (cookies.token)
                    config.headers['Authorization'] =
                        'Bearer ' + cookies.token.accessToken;
                else {
                    // Rrefresh token
                    if (cookies.refresh_token) {
                        await axios({
                            url: 'https://dev.timepiece.qa/refresh_token',
                            method: 'post',
                            data: {},
                            headers: {
                                skipInterceptors: true,
                                refreshToken: cookies.refresh_token.refreshToken,
                            },
                        }).then((response) => {
                            setCookie(
                                'token',
                                { accessToken: response.data.accessToken },
                                { expires: addToDate(new Date(), 'minutes', 29) },
                            );
                            // setCookie('refresh_token', {
                            //     refreshToken: response.data.refreshToken,
                            // });
                            config.headers['Authorization'] =
                                'Bearer ' + response.data.accessToken;
                        });
                    } else {
                        removeCookie('userinfo');
                        removeCookie('token');
                        removeCookie('refresh_token');
                    }
                }
            }
            return config;
        });
    }

    /**
     * Authentication APIs
     * @param {}
     */
    auth() {
        var endpoints: { login: Function } = { login: Function };

        endpoints.login = (data: { username: string; password: string }) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                            loginAdmin(username: "${data.username}", password: "${data.password}") { user { id, username, email }, accessToken, refreshToken }
                        }`,
                },
            });

        return endpoints;
    }

    /**
     * Analytics APIs
     * @param {}
     */
    analytics() {
        var endpoints: { users: Function; dealers: Function; watches: Function } = {
            users: Function,
            dealers: Function,
            watches: Function,
        };

        endpoints.users = () =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `query {
                            getUsers(dealer: false) { total }
                        }`,
                },
            });

        endpoints.dealers = () =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `query {
                            getUsers(dealer: true) { total }
                        }`,
                },
            });

        endpoints.watches = () =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `query {
                            getProducts { total }
                        }`,
                },
            });

        return endpoints;
    }

    /**
     * Dealers APIs
     * @param {}
     */
    dealers() {
        var endpoints: { index: Function } = { index: Function };

        endpoints.index = (data: pagination) =>
            axios({
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
                        }`,
                },
            });

        return endpoints;
    }

    /**
     * Users APIs
     * @param {}
     */
    users() {
        var endpoints: { index: Function; update: Function; delete: Function } = {
            index: Function,
            update: Function,
            delete: Function,
        };

        endpoints.index = (data: pagination) =>
            axios({
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
                        }`,
                },
            });

        endpoints.update = (data: { blocked: boolean; id: number }) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                            updateUserbyId(id: ${data.id}, blocked: ${data.blocked}) {
                                blocked
                            }
                        }`,
                },
            });

        endpoints.delete = (data: string[]) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                            deleteUsers( ids: [${data.join(', ')}] )
                        }`,
                },
            });

        return endpoints;
    }

    /**
     * Watches APIs
     * @param {}
     */
    watches() {
        var endpoints: {
            index: Function;
            search: Function;
            add: Function;
            update: Function;
            updateStatus: Function;
            setFeatured: Function;
            delete: Function;
        } = {
            index: Function,
            search: Function,
            add: Function,
            update: Function,
            updateStatus: Function,
            setFeatured: Function,
            delete: Function,
        };

        endpoints.index = (data: pagination) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `query {
                            getProducts(limit: ${data.limit}, offset: ${data.offset}) {
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
                        }`,
                },
            });

        endpoints.search = (keyword: string) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `query {
                            searchProducts(brand: "${keyword}") {
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
                        }`,
                },
            });

        endpoints.add = (data: addWatchFields) =>
            axios({
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
                    }`,
                },
            });

        endpoints.update = (data: addWatchFields, id: string) =>
            axios({
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
                                water_resistance: ${Number(
                        data.water_resistance,
                    )},
                                case_diameter: ${Number(data.case_diameter)},
                                jewels: ${Number(data.jewels)},
                                power_reserve: ${Number(data.power_reserve)},
                                base_calibar: "${data.base_calibar}",
                                calibar: "${data.calibar}",
                                gender: "${data.gender}",
                                production_year: ${Number(
                        data.production_year,
                    )},
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
                        }`,
                },
            });

        endpoints.updateStatus = (data: { confirmed: boolean; id: string }) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                            updateProduct(id: "${data.id}", confirmed: ${data.confirmed}) {
                                confirmed
                            }
                        }`,
                },
            });

        endpoints.setFeatured = (data: { featured: boolean; id: string }) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                            updateProduct(id: "${data.id}", featured: ${data.featured}) {
                                featured
                            }
                        }`,
                },
            });

        endpoints.delete = (data: string[]) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                            deleteProducts( ids: [${data.join(', ')}] )
                        }`,
                },
            });

        return endpoints;
    }

    /**
     * Offers APIs
     * @param {}
     */
    offers() {
        var endpoints: { index: Function; approve: Function } = {
            index: Function,
            approve: Function,
        };

        endpoints.index = (data: pagination) =>
            axios({
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
                }`,
                },
            });

        endpoints.approve = (approved: boolean, watchId: number, id: number) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                    approveOffer( approved: ${approved}, watchId: ${watchId}, id: ${id}) 
                  }`,
                },
            });

        return endpoints;
    }

    /**
     * Orders APIs
     * @param {}
     */
    orders() {
        var endpoints: { index: Function; approve: Function } = {
            index: Function,
            approve: Function,
        };

        endpoints.index = (data: pagination) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `query {
                         getOrders {
                            id,
                            username,
                            first_name,
                            last_name,
                            email,
                            phone,
                            birth,
                            gender,
                            address,
                            orders {
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
                }`,
                },
            });

        endpoints.approve = (approved: boolean, watchId: number) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                    approveOrder( approved: ${approved}, watchId: ${watchId}) 
                  }`,
                },
            });

        return endpoints;
    }

    /**
     * Certificates APIs
     * @param {}
     */
    certificates() {
        var endpoints: { index: Function; fulfillCertificate: Function } = {
            index: Function,
            fulfillCertificate: Function,
        };

        endpoints.index = () =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `query {
                            getCertificates {
                                id,
                                fulfilled,
                                user {
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
                  }`,
                },
            });

        endpoints.fulfillCertificate = (id: number) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                    fulfillCertificate(id: ${id})
                  }`,
                },
            });

        return endpoints;
    }

    /**
     * Brands APIs
     * @param {}
     */
    brands() {
        var endpoints: {
            index: Function;
            add: Function;
            update: Function;
            delete: Function;
        } = { index: Function, add: Function, update: Function, delete: Function };

        endpoints.index = (data: pagination) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `query {
                            getBrands(limit: ${data.limit}, offset: ${data.offset}) {
                                total,
                                results {
                                    id,
                                    name,
                                }
                            }
                        }`,
                },
            });

        endpoints.add = (name: string) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                        createBrand(
                            name: "${name}",
                        ) { id }
                    }`,
                },
            });

        endpoints.update = (name: string, id: string) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                            updateBrand(
                                id: "${id}",
                                name: "${name}",
                            ) { id }
                        }`,
                },
            });

        endpoints.delete = (data: string[]) =>
            axios({
                url: this.url,
                method: 'post',
                data: {
                    query: `mutation {
                            deleteBrands( ids: [${data.join(', ')}] )
                        }`,
                },
            });

        return endpoints;
    }
}

export default API;
