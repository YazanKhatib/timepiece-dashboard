import React, { useState } from 'react'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { user, usersSlice, usersState } from './UsersSlice'

// Models
import { User } from '../../services/models/models'

// API
import API from '../../services/api/api'

// Mapbox map
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { setRTLTextPlugin } from 'mapbox-gl';
import marker from '../../assets/images/vector/marker.png'

// Components
import TableActionBar from '../../components/TableActionBar/TableActionBar'
import { DashboardTable } from '../../components/Table/Table'
import { EllipsisLoader, WhiteboxLoader } from '../../components/Loader/Loader'
import { SelectField } from '../../components/FormElements/FormElements'
import DetailsModal from '../../components/DetailsModal/DetailsModal'
import { useEffect } from 'react'

export default () => {

    // Translation
    const t = useTranslation()

    // Redux
    const dispatch = useDispatch()
    const state = useSelector( ( state: { users: usersState } ) => state.users )

    // API
    const ENDPOINTS = new API()

    // Status options
    const status_options = [
        { value: false, label: t("approved") },
        { value: true, label: t("pending") }
    ]

    // Map
    const Map = ReactMapboxGl({
        accessToken:
            'pk.eyJ1IjoibWFqZHNoYW1tYSIsImEiOiJja3E1Z2dpeXkxM2c2MnBvMHExdzNnZ2xxIn0.8WIFOZkv9ivooX6OzFMvzQ',
        attributionControl: true,
        scrollZoom: true
    });

    // Search
    const search = () => {}

    // Get default status value
    const getDefaultStatusValue = (confirmed: boolean) => {
        if (confirmed) return status_options[0];
        else return status_options[1];
    };

    // Fetch Data
    const fetchData = (page: number, page_size: number = 10) => {
        
        dispatch( usersSlice.actions.setIsFetching(true) )

        ENDPOINTS.users().index( { limit: page_size, offset: page - 1 } )
        .then( (response: any) => {
            
            // Has more
            if( response.data?.data?.getUsers?.total <= page * page_size )
                dispatch( usersSlice.actions.setHasMore(false) )
            
            let users: user[] = []

            response.data?.data?.getUsers?.results?.map( (item: any) => {
                users.push({
                    id: String(item.id),
                    username: String(item.username),
                    name: String(( !item.first_name && !item.last_name ) ? "N/A" : item.first_name + " " + item.last_name),
                    email: String(item.email),
                    email_status: Boolean(item.confirmed),
                    status: Boolean(item.blocked),
                    phone: String(item.phone ? item.phone : "N/A"),
                    birth: String(item.birth ? item.birth : "N/A"),
                    gender: String(item.gender ? item.gender : "N/A"),
                    address: String(item.address ? item.address : "N/A")
                })
            })

            dispatch( usersSlice.actions.addUsers(users) )
            dispatch( usersSlice.actions.setIsLoaded(true) )
            dispatch( usersSlice.actions.setIsFetching(false) )
        })

    }

    interface tableDataType { [key: string]: { [key: string]: any } }
    const generateData: () => tableDataType = () => {
        let data: tableDataType = {}
        state.users.map( (item, index) => {
            data[item.id] = {
                username: item.username,
                name: item.name,
                email: <>{item.email} { item.email_status ? <span style={{ color: "#2ecc71" }}>( {t("confirmed")} )</span> : <span style={{ color: "#e67e22" }}>( {t("pending")} )</span> }</>,
                phone: item.phone,
                actions: <div className="show-on-hover">
                            <i className="icon-info" onClick={(e: React.MouseEvent<HTMLLIElement>) => showDetails(e, item.id) } />
                            <i className="icon-delete" onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                                e.stopPropagation()
                                remove(item.id)
                            }} />

                        </div>
            }
        })
        return data
    }

    // Details Modal
    const showDetails = (e: React.MouseEvent<HTMLLIElement>, id: string) => {
        e.stopPropagation();
        dispatch( usersSlice.actions.setDetailsIsOpen(true) )
        dispatch( usersSlice.actions.setActiveUser(id) )
    }

    const getAddress = (address: string) => {
        if (!address)
            return "N/A"
        let address_object = JSON.parse(address)
        if (address_object.length === 0)
            return "N/A"
        return (
            <div>
                {/* <Map
                    style="mapbox://styles/mapbox/light-v10"
                    containerStyle={{
                        height: '300px',
                        width: '500px'
                    }}
                    center={[address_object[0].coordinates.lng, address_object[0].coordinates.lat]}
                    zoom={[15]}
                >
                    <Marker
                        coordinates={[address_object[0].coordinates.lng, address_object[0].coordinates.lat]}
                        anchor="bottom" style={{ pointerEvents: 'none' }}>
                        <img src={marker} style={{ maxWidth: 30, pointerEvents: 'none' }} />
                    </Marker>
                </Map> */}
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


    // Toggle Selected id
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const toggleSelectedId = (id: string) => {
        let index = selectedIds.findIndex(selectedId => selectedId === id)
        if( index !== -1 ) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
        } else
            setSelectedIds([...selectedIds, id])
    }

    // Delete
    const remove = (id? :string) => {
        
        dispatch( usersSlice.actions.setIsLoading(true) )

        ENDPOINTS.users().delete(id ? [id] : selectedIds)
        .then(() => {
            dispatch( usersSlice.actions.setIsLoading(false) )
            dispatch( usersSlice.actions.deleteUsers(id ? [id] : selectedIds) )
            if(!id) setSelectedIds([])
        })

    }


    // First fetch
    if( !state.isLoaded && !state.isFetching )
        fetchData(1)

    return(
        <>
            { state.isLoaded ?
            <>
                { state.isLoading ? <WhiteboxLoader /> : ""}
                <TableActionBar
                    title={t("users")}
                    search={search}
                    showFilter={false}
                    showDelete={selectedIds.length > 0}
                    delete={remove}
                    />
                
                <DashboardTable
                    header={[ t("username"), t("name"), t("email"), t("phone"), "" ]}
                    body={generateData()}
                    onSelect={toggleSelectedId}
                    hasMore={state.hasMore}
                    loadMore={fetchData}
                    />
                
                <DetailsModal isOpen={state.detailsIsOpen} toggle={() => dispatch( usersSlice.actions.setDetailsIsOpen(false) )} data={getActiveUser()} title={t("user_details")} />
            </> : <div className="center"><EllipsisLoader /></div> }
        </>
    )

}