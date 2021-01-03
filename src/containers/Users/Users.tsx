import React from 'react'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { user, usersSlice, usersState } from './UsersSlice'

// API
import API from '../../services/api/api'

// Components
import TableActionBar from '../../components/TableActionBar/TableActionBar'
import { DashboardTable } from '../../components/Table/Table'
import { EllipsisLoader } from '../../components/Loader/Loader'

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
                                <i className="icon-edit" onClick={(e: React.MouseEvent<HTMLLIElement>) => { e.stopPropagation(); alert("Edit " + item.id) }} />
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

    if( !state.isLoaded && !state.isFetching )
        fetchData()

    return(
        <>
            { state.isLoaded ?
            <>
                <TableActionBar
                    title={t("users")}
                    search={search}
                    add={() => {}}
                    showFilter={false}
                    addText={t("add_to_users")}
                    />
                
                <DashboardTable
                    header={[ t("username"), t("name"), t("email"), t("phone"), "" ]}
                    body={state.users}
                    />
            </> : <div className="center"><EllipsisLoader /></div> }
        </>
    )

}