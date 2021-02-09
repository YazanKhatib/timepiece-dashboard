import React, { useState } from 'react'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { dealer, dealersSlice, dealersState } from './DealersSlice'

// Models
import { User } from '../../services/models/models'

// API
import API from '../../services/api/api'

// Components
import TableActionBar from '../../components/TableActionBar/TableActionBar'
import { DashboardTable } from '../../components/Table/Table'
import { EllipsisLoader, WhiteboxLoader } from '../../components/Loader/Loader'
import { SelectField } from '../../components/FormElements/FormElements'
import DetailsModal from '../../components/DetailsModal/DetailsModal'

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
        { value: false, label: t("approved") },
        { value: true, label: t("pending") }
    ]

    // Search
    const search = () => {}

    // Get default status value
    const getDefaultStatusValue = (confirmed: boolean) => {
        if (!confirmed) return status_options[0];
        return status_options[1];
    };

    // Change dealer status
    const changeStatus = (selected: boolean, id: string) => {
        dispatch( dealersSlice.actions.addToLoadingStatuses(id) )
        ENDPOINTS.users().update( { id: Number(id), blocked: selected } )
        .then( () => {
            dispatch( dealersSlice.actions.removeFromLoadingStatuses(id) )
            dispatch( dealersSlice.actions.setBlocked({ id: id, blocked: selected }) )
        })
    }

    // Fetch Data
    const fetchData = (page: number, page_size: number = 10) => {
        
        dispatch( dealersSlice.actions.setIsFetching(true) )

        ENDPOINTS.dealers().index( { limit: page_size, offset: page - 1 } )
        .then( (response: any) => {
            
            // Has more
            if( response.data?.data?.getUsers?.total <= page * page_size )
                dispatch( dealersSlice.actions.setHasMore(false) )

            let dealers: dealer[] = []

            response.data?.data?.getUsers?.results?.map( (item: any) => {
                dealers.push({
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

            dispatch( dealersSlice.actions.addDealers(dealers) )
            dispatch( dealersSlice.actions.setIsLoaded(true) )
            dispatch( dealersSlice.actions.setIsFetching(false) )
        })

    }

    interface tableDataType { [key: string]: { [key: string]: any } }
    const generateData: () => tableDataType = () => {
        let data: tableDataType = {}
        state.dealers.map( (item, index) => {
            data[item.id] = {
                username: item.username,
                name: item.name,
                email: <>{item.email} { item.email_status ? <span style={{ color: "#2ecc71" }}>( {t("confirmed")} )</span> : <span style={{ color: "#e67e22" }}>( {t("pending")} )</span> }</>,
                status: <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                            <SelectField isLoading={state.loadingStatuses.includes(item.id)} defaultValue={getDefaultStatusValue(item.status)} onChange={ (selected: { value: boolean }) => changeStatus( selected.value, item.id ) } options={status_options} />
                        </div>,
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
        dispatch( dealersSlice.actions.setDetailsIsOpen(true) )
        dispatch( dealersSlice.actions.setActiveDealer(id) )
    }
    
    const getActiveDealer = (): { [key: string]: any } => {
        let activeDealer = state.dealers[state.dealers.findIndex(dealer => dealer.id === state.activeDealer)]
        
        if(!activeDealer)
            return {}

        let dealer: User = {
            username: activeDealer.username,
            name: activeDealer.name,
            email: activeDealer.email,
            phone: activeDealer.phone,
            birth: activeDealer.birth,
            gender: activeDealer.gender,
            address: activeDealer.address
        }
        return dealer
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
        
        dispatch( dealersSlice.actions.setIsLoading(true) )

        ENDPOINTS.users().delete(id ? [id] : selectedIds)
        .then(() => {
            dispatch( dealersSlice.actions.setIsLoading(false) )
            dispatch( dealersSlice.actions.deleteDealers(id ? [id] : selectedIds) )
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
                    title={t("dealers")}
                    search={search}
                    showFilter={false}
                    showDelete={selectedIds.length > 0}
                    delete={remove}
                    />
                
                <DashboardTable
                    header={[ t("username"), t("name"), t("email"), t("status"), "" ]}
                    body={generateData()}
                    onSelect={toggleSelectedId}
                    hasMore={state.hasMore}
                    loadMore={fetchData}
                    />
                
                <DetailsModal isOpen={state.detailsIsOpen} toggle={() => dispatch( dealersSlice.actions.setDetailsIsOpen(false) )} data={getActiveDealer()} title={t("dealer_details")} />
            </> : <div className="center"><EllipsisLoader /></div> }
        </>
    )

}