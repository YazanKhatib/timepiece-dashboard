import React, { useState } from 'react'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { user, watch, ordersSlice, ordersState } from './OrdersSclice'

// Models
import { User, Watch } from '../../services/models/models'

// API
import API from '../../services/api/api'

// Components
import TableActionBar from '../../components/TableActionBar/TableActionBar'
import { DashboardTable } from '../../components/Table/Table'
import { EllipsisLoader, WhiteboxLoader } from '../../components/Loader/Loader'
import { SelectField } from '../../components/FormElements/FormElements'
import DetailsModal from '../../components/DetailsModal/DetailsModal'

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default () => {

    // Translation
    const t = useTranslation()

    // Redux
    const dispatch = useDispatch()
    const state = useSelector( ( state: { orders: ordersState } ) => state.orders )

    // API
    const ENDPOINTS = new API()

    // Status options
    const status_options = [
        { value: false, label: t("approved") },
        { value: true, label: t("pending") }
    ]

    // Search
    const search = () => {}

    // Get default status value
    const getDefaultStatusValue = (confirmed: boolean) => {
        if (confirmed) return status_options[0];
        else return status_options[1];
    };

    // Fetch Data
    const fetchData = () => {
        
        dispatch( ordersSlice.actions.setIsLoading(true) )
        dispatch( ordersSlice.actions.setIsFetching(true) )

        ENDPOINTS.orders().index()
        .then( (response: any) => {
            
            let users: user[] = []
            let orders: watch[] = []

            response.data?.data?.getOrders?.map( (item: any) => {
                item.orders.map((watch: any) => {
                   orders.push({
                    id: String(watch.id),
                    name: String(watch.name ? watch.name : "N/A"),
                    model: String(watch.model ? watch.model : "N/A"),
                    description: String(watch.description ? watch.description : "N/A"),
                    condition: String(watch.condition ? watch.condition : "N/A"),
                    location: String(watch.location ? watch.location : "N/A"),
                    delivery: String(watch.delivery ? watch.delivery : "N/A"),
                    price: Number(watch.price),
                    proposed_price: Number(watch.proposed_price ? watch.proposed_price : 0),
                    production_year: Number(watch.production_year),
                    case_material: String(watch.case_material ? watch.case_material : "N/A"),
                    movement: String(watch.movement ? watch.movement : "N/A"),
                    bracelet_material: String(watch.bracelet_material ? watch.bracelet_material : "N/A"),
                    gender: String(watch.gender ? watch.gender : "N/A"),
                    calibar: String(watch.calibar ? watch.calibar : "N/A"),
                    base_calibar: String(watch.base_calibar ? watch.base_calibar : "N/A"),
                    power_reserve: Number(watch.power_reserve),
                    jewels: Number(watch.jewels),
                    case_diameter: Number(watch.case_diameter),
                    water_resistance: Number(watch.water_resistance),
                    bezel_material: String(watch.bezel_material ? watch.bezel_material : "N/A"),
                    crystal: String(watch.crystal ? watch.crystal : "N/A"),
                    dial: String(watch.dial ? watch.dial : "N/A"),
                    dial_numbers: String(watch.dial_numbers ? watch.dial_numbers : "N/A"),
                    bracelet_color: String(watch.bracelet_color ? watch.bracelet_color : "N/A"),
                    clasp: String(watch.clasp ? watch.clasp : "N/A"),
                    clasp_material: String(watch.clasp_material ? watch.clasp_material : "N/A"),
                   });
                })
                users.push({
                    id: String(item.id),
                    username: String(item.username),
                    name: String(( !item.first_name && !item.last_name ) ? "N/A" : item.first_name + " " + item.last_name),
                    email: String(item.email),
                    phone: String(item.phone ? item.phone : "N/A"),
                    birth: String(item.birth ? item.birth : "N/A"),
                    gender: String(item.gender ? item.gender : "N/A"),
                    address: String(item.address ? item.address : "N/A"),
                    orders: orders,
                })
                orders = [];
            })

            dispatch( ordersSlice.actions.addUsers(users) )
            dispatch( ordersSlice.actions.setIsLoading(false) )
            dispatch( ordersSlice.actions.setIsLoaded(true) )
            dispatch( ordersSlice.actions.setIsFetching(false) )
        })

    }

    interface tableDataType { [key: string]: { [key: string]: any } }
    const generateData: () => tableDataType = () => {
        let data: tableDataType = {}
        // TODO Delete x;
        let x : number = 0;
        state.users.map( (item) => {
            item.orders.map((watch, index) => {
                data[x] = {
                    id: item.id,
                    username: item.username,
                    email: item.email,
                    phone: item.phone,
                    model: watch.model,
                    price: watch.price,
                    proposed_price: <strong>{watch.proposed_price}</strong>,
                    actions: <div className="show-on-hover">
                                <i className="icon-checkmark" onClick={(e: React.MouseEvent<HTMLLIElement>) => approveOrder(e, true, watch.id) }  />
                                <i className="icon-close" onClick={(e: React.MouseEvent<HTMLLIElement>) => approveOrder(e, false, watch.id) } />
                                <i className="icon-username-1" onClick={(e: React.MouseEvent<HTMLLIElement>) => showUserDetails(e, item.id) } />
                                <i className="icon-time" onClick={(e: React.MouseEvent<HTMLLIElement>) => showWatchDetails(e, item.id, watch.id) } />
                            </div>
                }
                x++;
            })
        })
        return data
    }

    

    // Details Modal
    const showUserDetails = (e: React.MouseEvent<HTMLLIElement>, userId: string) => {
        e.stopPropagation()
        dispatch( ordersSlice.actions.setUserDetailsIsOpen(true) )
        dispatch( ordersSlice.actions.setActiveUser(userId) )
    }

    
    const showWatchDetails = (e: React.MouseEvent<HTMLLIElement>, userId: string, watchId: string) => {
        e.stopPropagation()
        dispatch( ordersSlice.actions.setWatchDetailsIsOpen(true) )
        dispatch( ordersSlice.actions.setActiveUser(userId) )
        dispatch( ordersSlice.actions.setActiveWatch(watchId) )
    }

    
    const approveOrder = (e: React.MouseEvent<HTMLLIElement>,approved: boolean, watchId: string) => {
        dispatch( ordersSlice.actions.setIsLoading(true) )
        e.stopPropagation()
        ENDPOINTS.orders().approve(approved, watchId)
        .then(() => {
            dispatch( ordersSlice.actions.setIsLoading(false) )
            toast(`Order #${watchId} has been ${ approved ? "approved" : "denied" }`, {
                position: "bottom-center",
                type: approved ? "success" : "error"
            });
        });
    }

    
    const getAddress = (address: string) => {
        if (!address)
            return "N/A"
        let address_object = JSON.parse(address)
        if (address_object.length === 0)
            return "N/A"
        return (
            <div>
                <iframe style={{ width: "100%", minHeight: 300, border: 'none' }} src={`https://maps.google.com/maps?q=${address_object[0].coordinates.lat},${address_object[0].coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`} />
            </div>
        )
    }


    const getActiveUser = (): { [key: string]: any } => {
        let activeUser = state.users[state.users.findIndex(user => user.id === state.activeUser)]
        
        if(!activeUser)
            return {}

        let user: User = {
            username: activeUser.username,
            name: activeUser.name,
            email: activeUser.email,
            phone: activeUser.phone,
            birth: activeUser.birth,
            gender: activeUser.gender,
            address: getAddress(activeUser.address)
        }
        return user
    }
    
    const getActiveWatch = (): { [key: string]: any } => {
        if( state.activeUser === "" )
            return {}
        let activeWatch = state.users.find( user => user.id === state.activeUser )?.orders.find( watch => watch.id === state.activeWatch )
        
        if(!activeWatch)
            return {}
        
            

        let watch: Watch = {
            name: activeWatch.name,
            model: activeWatch.model,
            description: activeWatch.description,
            condition: activeWatch.condition,
            location: activeWatch.location,
            delivery: activeWatch.delivery,
            price: activeWatch.price,
            production_year: activeWatch.production_year,
            case_material: activeWatch.case_material,
            movement: activeWatch.movement,
            bracelet_material: activeWatch.bracelet_color,
            gender: activeWatch.gender,
            calibar: activeWatch.calibar,
            base_calibar: activeWatch.base_calibar,
            power_reserve: activeWatch.power_reserve,
            jewels: activeWatch.jewels,
            case_diameter: activeWatch.case_diameter,
            water_resistance: activeWatch.water_resistance,
            bezel_material: activeWatch.bezel_material,
            crystal: activeWatch.crystal,
            dial: activeWatch.dial,
            dial_numbers: activeWatch.dial_numbers,
            bracelet_color: activeWatch.bracelet_color,
            clasp: activeWatch.clasp,
            clasp_material: activeWatch.clasp_material,
        }
        return watch;
    }


    // Toggle Selected id
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const toggleSelectedId = (id: string) => {
        let index = selectedIds.findIndex(selectedId => selectedId === id)
        if( index !== -1 ) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
        } else
            setSelectedIds([...selectedIds, id])
    }


    // First fetch
    if( !state.isLoaded && !state.isFetching )
        fetchData()

    return(
        <>
            { state.isLoaded ?
            <>
                { state.isLoading ? <WhiteboxLoader /> : "" }
                <TableActionBar
                    title={t("orders")}
                    search={search}
                    showFilter={false}
                    showDelete={selectedIds.length > 0}
                    />
                
                <DashboardTable
                    header={[ "#", t("username"), t("email"), t("phone"), t("model"), t("price"), t("proposed_price"), "" ]}
                    body={generateData()}
                    onSelect={toggleSelectedId}
                    />
                
                <DetailsModal isOpen={state.userDetailsIsOpen} toggle={() => dispatch( ordersSlice.actions.setUserDetailsIsOpen(false) )} data={getActiveUser()} title={t("user_details")} />
                
                <DetailsModal isOpen={state.watchDetailsIsOpen} toggle={() => dispatch( ordersSlice.actions.setWatchDetailsIsOpen(false) )} data={getActiveWatch()} title={t("watch_details")} />

                <ToastContainer />
            </> : <div className="center"><EllipsisLoader /></div> }
        </>
    )

}