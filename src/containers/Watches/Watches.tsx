import React, { useState } from 'react'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { watch, watchesSlice, watchesState } from './WatchesSlice'

// Models
import { Watch } from '../../services/models/models'

// API
import API from '../../services/api/api'

// Components
import TableActionBar from '../../components/TableActionBar/TableActionBar'
import { DashboardTable } from '../../components/Table/Table'
import { EllipsisLoader } from '../../components/Loader/Loader'
import { SelectField } from '../../components/FormElements/FormElements'
import DetailsModal from '../../components/DetailsModal/DetailsModal'
import AddWatchModal from './AddModal/AddWatchModal'

export default () => {

    // Translation
    const t = useTranslation()

    // Redux
    const dispatch = useDispatch()
    const state = useSelector( ( state: { watches: watchesState } ) => state.watches )

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

    // Change watch status
    const changeStatus = (selected: boolean, id: string) => {
        dispatch( watchesSlice.actions.addToLoadingStatuses(id) )
        setTimeout(() => {
            dispatch( watchesSlice.actions.removeFromLoadingStatuses(id) )
        }, 5000);
    }

    // Fetch Data
    const fetchData = () => {
        
        dispatch( watchesSlice.actions.setIsLoading(true) )
        dispatch( watchesSlice.actions.setIsFetching(true) )

        ENDPOINTS.watches().index( { limit: 100, offset: 0 } )
        .then( (response: any) => {
            
            let watches: watch[] = []

            response.data.data.getProducts.results.map( (item: any) => {
                watches.push({
                    id: String(item.id),
                    name: String(item.name ? item.name : "N/A"),
                    model: String(item.model ? item.model : "N/A"),
                    description: String(item.description ? item.description : "N/A"),
                    condition: String(item.condition ? item.condition : "N/A"),
                    location: String(item.location ? item.location : "N/A"),
                    featured: Boolean(item.featured),
                    confirmed: Boolean(item.confirmed),
                    delivery: String(item.delivery ? item.delivery : "N/A"),
                    price: Number(item.price),
                    production_year: Number(item.production_year),
                    case_material: String(item.case_material ? item.case_material : "N/A"),
                    movement: String(item.movement ? item.movement : "N/A"),
                    bracelet_material: String(item.bracelet_material ? item.bracelet_material : "N/A"),
                    gender: String(item.gender ? item.gender : "N/A"),
                    calibar: String(item.calibar ? item.calibar : "N/A"),
                    base_calibar: String(item.base_calibar ? item.base_calibar : "N/A"),
                    power_reserve: Number(item.power_reserve),
                    jewels: Number(item.jewels),
                    case_diameter: Number(item.case_diameter),
                    water_resistance: Number(item.water_resistance),
                    bezel_material: String(item.bezel_material ? item.bezel_material : "N/A"),
                    crystal: String(item.crystal ? item.crystal : "N/A"),
                    dial: String(item.dial ? item.dial : "N/A"),
                    dial_numbers: String(item.dial_numbers ? item.dial_numbers : "N/A"),
                    bracelet_color: String(item.bracelet_color ? item.bracelet_color : "N/A"),
                    clasp: String(item.clasp ? item.clasp : "N/A"),
                    clasp_material: String(item.clasp_material ? item.clasp_material : "N/A"),
                })
            })

            dispatch( watchesSlice.actions.addWatches(watches) )
            dispatch( watchesSlice.actions.setIsLoading(false) )
            dispatch( watchesSlice.actions.setIsLoaded(true) )
            dispatch( watchesSlice.actions.setIsFetching(false) )
        })

    }

    interface tableDataType { [key: string]: { [key: string]: any } }
    const generateData: () => tableDataType = () => {
        let data: tableDataType = {}
        state.watches.map( (item, index) => {
            data[item.id] = {
                name: item.name,
                condition: item.condition,
                price: item.price,
                status: <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                            <SelectField isLoading={state.loadingStatuses.includes(item.id)} defaultValue={getDefaultStatusValue(item.confirmed)} onChange={ (selected: { value: boolean }) => changeStatus( selected.value, item.id ) } options={status_options} />
                        </div>,
                actions: <div className="show-on-hover">
                            <i className="icon-info" onClick={(e: React.MouseEvent<HTMLLIElement>) => showDetails(e, item.id) } />
                            <i className="icon-delete" />
                        </div>
            }
        })
        return data
    }

    // Details Modal
    const showDetails = (e: React.MouseEvent<HTMLLIElement>, id: string) => {
        e.stopPropagation();
        dispatch( watchesSlice.actions.setDetailsIsOpen(true) )
        dispatch( watchesSlice.actions.setActiveWatch(id) )
    }
    
    const getActiveWatch = (): { [key: string]: any } => {
        let activeWatch = state.watches[state.watches.findIndex(watch => watch.id === state.activeWatch)]
        
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
        return watch
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
                <TableActionBar
                    title={t("watches")}
                    search={search}
                    showFilter={false}
                    showDelete={selectedIds.length > 0}
                    add={() => dispatch( watchesSlice.actions.setOpenAddModal(true) )}
                    addText={t("add_to_watches")}
                    />
                
                <DashboardTable
                    header={[ t("name"), t("condition"), t("price"), t("status"), "" ]}
                    body={generateData()}
                    onSelect={toggleSelectedId}
                    />
                
                <DetailsModal isOpen={state.detailsIsOpen} toggle={() => dispatch( watchesSlice.actions.setDetailsIsOpen(false) )} data={getActiveWatch()} title={t("watch_details")} />

                <AddWatchModal />

            </> : <div className="center"><EllipsisLoader /></div> }
        </>
    )

}