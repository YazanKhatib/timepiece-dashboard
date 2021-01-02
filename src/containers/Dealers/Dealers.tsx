import React from 'react'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { dealer, dealersSlice, dealersState } from './DealersSlice'

// API
import API from '../../services/api/api'

// Components
import TableActionBar from '../../components/TableActionBar/TableActionBar'
import { DashboardTable } from '../../components/Table/Table'
import { EllipsisLoader } from '../../components/Loader/Loader'
import { SelectField } from '../../components/FormElements/FormElements'

export default () => {

    // Translation
    const t = useTranslation()

    // Redux
    const dispatch = useDispatch()
    const state = useSelector( ( state: { dealers: dealersState } ) => state.dealers )

    // API
    const ENDPOINTS = new API()

    // Status options
    const status_options = [
        { value: "approved", label: t("approved") },
        { value: "pending", label: t("pending") },
        { value: "blocked", label: t("blocked") }
    ]

    // Search
    const search = () => {}

    // Fetch Data
    const fetchData = () => {
        
        dispatch( dealersSlice.actions.setIsLoading(true) )
        dispatch( dealersSlice.actions.setIsFetching(true) )

        ENDPOINTS.dealers().index( { limit: 100, offset: 0 } )
        .then( (response: any) => {
            
            let dealers: { [id: string]: dealer } = {}

            response.data.data.getUsers.results.map( (item: any) => {
                dealers[item.id] = {
                    username: item.username,
                    name: ( !item.first_name && !item.last_name ) ? "N/A" : item.first_name + " " + item.last_name,
                    email: <>{item.email} { item.confirmed ? <span style={{ color: "#2ecc71" }}>( {t("confirmed")} )</span> : <span style={{ color: "#e67e22" }}>( {t("pending")} )</span> }</>,
                    status: <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                                <SelectField defaultValue={{ value: "approved", label: t("approved") }} options={status_options} />
                            </div>,
                    actions: <div className="show-on-hover">
                                <i className="icon-edit" onClick={(e: React.MouseEvent<HTMLLIElement>) => { e.stopPropagation(); alert("Edit " + item.id) }} />
                                <i className="icon-delete" />
                            </div>
                }
            })

            dispatch( dealersSlice.actions.addDealers(dealers) )
            dispatch( dealersSlice.actions.setIsLoading(true) )
            dispatch( dealersSlice.actions.setIsLoaded(true) )
            dispatch( dealersSlice.actions.setIsFetching(true) )
        })

    }

    if( !state.isLoaded && !state.isFetching )
        fetchData()

    return(
        <>
            { state.isLoaded ?
            <>
                <TableActionBar
                    title={t("dealers")}
                    search={search}
                    add={() => {}}
                    showFilter={false}
                    addText={t("add_to_dealers")}
                    />
                
                <DashboardTable
                    header={[ t("username"), t("name"), t("email"), t("status"), "" ]}
                    body={state.dealers}
                    />
            </> : <div className="center"><EllipsisLoader /></div> }
        </>
    )

}