import React, {useState} from 'react'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { user, usersSlice, usersState, detailedUser } from './UsersSlice'

// API
import API from '../../services/api/api'

// Components
import TableActionBar from '../../components/TableActionBar/TableActionBar'
import { DashboardTable } from '../../components/Table/Table'
import { EllipsisLoader } from '../../components/Loader/Loader'
import DetailsModal from '../../components/DetailsModal/DetailsModal'


export default () => {

    // Translation
    const t = useTranslation()

    // Redux
    const dispatch = useDispatch()
    const state = useSelector( ( state: { users: usersState } ) => state.users )

    // API
    const ENDPOINTS = new API()

    // Search
    const search = () => {}

    // Fetch Data
    const fetchData = () => {
        
        dispatch( usersSlice.actions.setIsLoading(true) )
        dispatch( usersSlice.actions.setIsFetching(true) )

        ENDPOINTS.users().index( { limit: 100, offset: 0 } )
        .then( (response: any) => {
            
            let users: { [id: string]: user } = {}

            response.data.data.getUsers.results.map( (item: any) => {
                users[item.id] = {
                    username: item.username,
                    name: ( !item.first_name && !item.last_name ) ? "N/A" : item.first_name + " " + item.last_name,
                    email: <>{item.email} { item.confirmed ? <span style={{ color: "#2ecc71" }}>( {t("confirmed")} )</span> : <span style={{ color: "#e67e22" }}>( {t("pending")} )</span> }</>,
                    phone: item.phone,
                    actions: <div className="show-on-hover">
                                <i className="icon-info" onClick={(e: React.MouseEvent<HTMLLIElement>) => showDetails(e, item.id) } />
                                <i className="icon-delete" />
                            </div>
                }
            })

            dispatch( usersSlice.actions.addUsers(users) )
            dispatch( usersSlice.actions.setIsLoading(false) )
            dispatch( usersSlice.actions.setIsLoaded(true) )
            dispatch( usersSlice.actions.setIsFetching(false) )
        })

    }

    // Details Modal
    const showDetails = (e: React.MouseEvent<HTMLLIElement>, id: string) => {
        e.stopPropagation();
        dispatch( usersSlice.actions.setDetailsIsOpen(true) )
        let dealer: detailedUser = {
            username: "majd",
            name: "Majd Shamma",
            email: "majd.sh42@gmail.com",
            phone: "0992159732",
            birth: "1-8-1997",
            gender: "Male",
            address: "Damascus, Syria, Some other information about address goes here."
        }
        setTimeout(() => {
            dispatch( usersSlice.actions.setUser( dealer ) )
            dispatch( usersSlice.actions.setIsLoadingUser( false ) )
        }, 2000);
    }

    if( !state.isLoaded && !state.isFetching )
        fetchData()

    return(
        <>
            { state.isLoaded ?
            <>
                <TableActionBar
                    title={t("users")}
                    search={search}
                    showFilter={false}
                    />
                
                <DashboardTable
                    header={[ t("username"), t("name"), t("email"), t("phone"), "" ]}
                    body={state.users}
                    />

                <DetailsModal 
                    isLoading={state.isLoadingUser} isOpen={state.detailsIsOpen} 
                    toggle={() => dispatch( usersSlice.actions.setDetailsIsOpen(false) )} 
                    data={state.user} title={"User details"} />

            </> : <div className="center"><EllipsisLoader /></div> }
        </>
    )

}