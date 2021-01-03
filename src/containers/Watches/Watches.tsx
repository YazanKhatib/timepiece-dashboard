import React from 'react'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { watch, watchesSlice, watchesState } from './WatchesSlice'

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
    
    // Status options
    const status_options= [
        { value: "approved", label: t("approved") },
        { value: "pending", label: t("pending") }
    ]

    // Get default status value
    const getDefaultStatusValue = (confirmed: boolean) => {
        if (confirmed) return status_options[0];
        else return status_options[1];
    };


    // Redux
    const dispatch = useDispatch()
    const state = useSelector( ( state: { watches: watchesState } ) => state.watches )

    // API
    const ENDPOINTS = new API()

    // Search
    const search = () => {}

    // Fetch Data
    const fetchData = () => {
        
        dispatch( watchesSlice.actions.setIsLoading(true) )
        dispatch( watchesSlice.actions.setIsFetching(true) )

        ENDPOINTS.watches().index( { limit: 100, offset: 0 } )
        .then( (response: any) => {
            
            let watches: { [id: string]: watch } = {}

            response.data.data.getProducts.results.map( (item: any) => {
                watches[item.id] = {
                    description: item.description,
                    model: item.model,
                    condition: item.condition,
                    price: item.price, status: <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                                                    <SelectField defaultValue={getDefaultStatusValue(item.confirmed)} options={status_options} />
                                                </div>,
                    actions: <div className="show-on-hover">
                                <i className="icon-edit" onClick={(e: React.MouseEvent<HTMLLIElement>) => { e.stopPropagation(); alert("Edit " + item.id) }} />
                                <i className="icon-delete" />
                            </div>
                }
            })

            dispatch( watchesSlice.actions.addWatchs(watches) )
            dispatch( watchesSlice.actions.setIsLoading(true) )
            dispatch( watchesSlice.actions.setIsLoaded(true) )
            dispatch( watchesSlice.actions.setIsFetching(true) )
        })

    }

    if( !state.isLoaded && !state.isFetching )
        fetchData()

    return(
        <>
            { state.isLoaded ?
            <>
                <TableActionBar
                    title={t("watches")}
                    search={search}
                    add={() => {}}
                    showFilter={false}
                    addText={t("add_to_watches")}
                    />
                
                <DashboardTable
                    header={[ t("description"), t("model"), t("condition"), t("price"), "" ]}
                    body={state.watches}
                    />
            </> : <div className="center"><EllipsisLoader /></div> }
        </>
    )

}