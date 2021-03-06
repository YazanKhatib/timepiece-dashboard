import React, { useState } from 'react'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { watch, watchesSlice, watchesState } from './WatchesSlice'
import { addWatcheSlice } from './AddModal/AddWatchSlice'

// Models
import { Watch } from '../../services/models/models'

// API
import API from '../../services/api/api'

// Components
import TableActionBar from '../../components/TableActionBar/TableActionBar'
import { DashboardTable } from '../../components/Table/Table'
import { EllipsisLoader, WhiteboxLoader } from '../../components/Loader/Loader'
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
        { value: true, label: t("approved") },
        { value: false, label: t("pending") }
    ]

    // Certfieid options
    const certified_options = [
        { value: true, label: t("certified") },
        { value: false, label: t("not_certified") }
    ]

    // Search
    const search = (keyword: string) => {
        if(keyword === "") {
            dispatch( watchesSlice.actions.setFilteredWatches([]) )
            return
        }
        dispatch(watchesSlice.actions.setIsLoading(true))

        ENDPOINTS.watches().search(keyword)
        .then( (response: any) => {
            
            let watches: watch[] = []

            response.data?.data?.searchProducts?.map( (item: any) => {
                watches.push({
                    id: String(item.id),
                    name: String(item.name ? item.name : "N/A"),
                    model: String(item.model ? item.model : "N/A"),
                    description: String(item.description ? item.description : "N/A"),
                    condition: String(item.condition ? item.condition : "N/A"),
                    location: String(item.location ? item.location : "N/A"),
                    featured: Boolean(item.featured),
                    confirmed: Boolean(item.confirmed),
                    certified: Boolean(item.certified),
                    images: item.images?.map((image: {url: string;}) => "https://dev.timepiece.qa/" + image.url),
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

            dispatch( watchesSlice.actions.setFilteredWatches(watches) )
            dispatch(watchesSlice.actions.setIsLoading(false))

        })

    }

    // Get default status value
    const getDefaultStatusValue = (confirmed: boolean) => {
        if (confirmed) return status_options[0];
        else return status_options[1];
    };

    // Get default certified value
    const getDefaultCertifiedValue = (confirmed: boolean) => {
        if (confirmed) return certified_options[0];
        else return certified_options[1];
    };

    // Change watch status
    const changeStatus = (selected: boolean, id: string) => {
        dispatch( watchesSlice.actions.addToLoadingStatuses(id) )
        ENDPOINTS.watches().updateStatus( { id, confirmed: selected } )
        .then( () => {
            dispatch( watchesSlice.actions.removeFromLoadingStatuses(id) )
            dispatch( watchesSlice.actions.setConfirmed({ id: id, confirmed: selected }) )
        })
    }

    // Change watch certified
    const changeCertified = (selected: boolean, id: string) => {
        dispatch( watchesSlice.actions.addToLoadingCertified(id) )
        ENDPOINTS.watches().updateCertified( { id, certified: selected } )
        .then( () => {
            dispatch( watchesSlice.actions.removeFromLoadingCertified(id) )
            dispatch( watchesSlice.actions.setCertified({ id: id, certified: selected }) )
        })
    }

    // Fetch Data
    const fetchData = (page: number, page_size: number = 10) => {
        
        dispatch( watchesSlice.actions.setIsFetching(true) )

        ENDPOINTS.watches().index( { limit: page_size, offset: page - 1 } )
        .then( (response: any) => {

            // Has more
            if( response.data?.data?.getProducts?.total <= page * page_size )
                dispatch( watchesSlice.actions.setHasMore(false) )
            
            let watches: watch[] = []

            response.data?.data?.getProducts?.results?.map( (item: any) => {
                watches.push({
                    id: String(item.id),
                    name: String(item.name ? item.name : "N/A"),
                    model: String(item.model ? item.model : "N/A"),
                    description: String(item.description ? item.description : "N/A"),
                    condition: String(item.condition ? item.condition : "N/A"),
                    location: String(item.location ? item.location : "N/A"),
                    featured: Boolean(item.featured),
                    confirmed: Boolean(item.confirmed),
                    certified: Boolean(item.certified),
                    images: item.images?.map((image: {url: string;}) => "https://dev.timepiece.qa/" + image.url),
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
            dispatch( watchesSlice.actions.setIsLoaded(true) )
            dispatch( watchesSlice.actions.setIsFetching(false) )
        })

    }

    interface tableDataType { [key: string]: { [key: string]: any } }
    const generateData: () => tableDataType = () => {
        let data: tableDataType = {}
        let watchesToIndex = state.filteredWatches.length > 0 ? state.filteredWatches : state.watches
        watchesToIndex.map( (item, index) => {
            data[item.id] = {
                id: item.id,
                name: item.name,
                condition: item.condition,
                price: item.price,
                status: <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                            <SelectField isLoading={state.loadingStatuses.includes(item.id)} defaultValue={getDefaultStatusValue(item.confirmed)} onChange={ (selected: { value: boolean }) => changeStatus( selected.value, item.id ) } options={status_options} />
                        </div>,
                certified: <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                            <SelectField isLoading={state.loadingCertified.includes(item.id)} defaultValue={getDefaultCertifiedValue(item.certified)} onChange={ (selected: { value: boolean }) => changeCertified( selected.value, item.id ) } options={certified_options} />
                        </div>,
                featured: <i className={ "icon-star-" + ( item.featured ? "2" : "o" ) } onClick={(e: React.MouseEvent<HTMLLIElement>) => toggleFeatured(e, item.id, item.featured) } />,
                actions: <div className="show-on-hover">
                            <i className="icon-info" onClick={(e: React.MouseEvent<HTMLLIElement>) => showDetails(e, item.id) } />
                            <i className="icon-edit" onClick={(e: React.MouseEvent<HTMLLIElement>) => edit(e, item.id) } />
                            <i className="icon-delete" onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                                e.stopPropagation()
                                remove(item.id)
                            }} />
                        </div>
            }
        })
        return data
    }


    // Toggle featured
    const toggleFeatured = (e: React.MouseEvent<HTMLLIElement>, id: string, currentValue: boolean) => {
        e.stopPropagation()
        
        ENDPOINTS.watches().setFeatured({ id, featured: !currentValue })
        .then((response: any) => {
            // In case somthing went wrong
            let watches = state.filteredWatches.length > 0 ? state.filteredWatches : state.watches
            let watchToEdit = watches.find( watch => watch.id === id )
            if( watchToEdit && watchToEdit.featured !== response.data?.data?.updateProduct?.featured )
                dispatch( watchesSlice.actions.setFeatured({ id, featured: response.data?.data?.updateProduct?.featured }) )
        })

        dispatch( watchesSlice.actions.setFeatured({ id, featured: !currentValue }) )
    }

    // Edit
    const edit = (e: React.MouseEvent<HTMLLIElement>, id: string) => {
        e.stopPropagation()
        let watches = state.filteredWatches.length > 0 ? state.filteredWatches : state.watches
        let watchToEdit = watches.find(watch => watch.id === id)
        if(watchToEdit) {
            dispatch( addWatcheSlice.actions.setAll({
                clasp_material: watchToEdit.clasp_material,
                clasp: watchToEdit.clasp,
                bracelet_color: watchToEdit.bracelet_color,
                dial_numbers: watchToEdit.dial_numbers,
                dial: watchToEdit.dial,
                crystal: watchToEdit.crystal,
                bezel_material: watchToEdit.bezel_material,
                water_resistance: String(watchToEdit.water_resistance),
                case_diameter: String(watchToEdit.case_diameter),
                jewels: String(watchToEdit.jewels),
                power_reserve: String(watchToEdit.power_reserve),
                base_calibar: watchToEdit.base_calibar,
                calibar: watchToEdit.calibar,
                gender: watchToEdit.gender,
                production_year: String(watchToEdit.production_year),
                bracelet_material: watchToEdit.bracelet_material,
                case_material: watchToEdit.case_material,
                movement: watchToEdit.movement,
                location: watchToEdit.location,
                description: watchToEdit.description,
                condition: watchToEdit.condition,
                delivery: watchToEdit.delivery,
                price: String(watchToEdit.price),
                model: watchToEdit.model,
                brand: watchToEdit.name
            }) )
            dispatch( addWatcheSlice.actions.setEditId(watchToEdit.id) )
            dispatch( watchesSlice.actions.setOpenAddModal(true) )
        }

    }

    // Details Modal
    const showDetails = (e: React.MouseEvent<HTMLLIElement>, id: string) => {
        e.stopPropagation();
        dispatch( watchesSlice.actions.setDetailsIsOpen(true) )
        dispatch( watchesSlice.actions.setActiveWatch(id) )
    }
    
    const getActiveWatch = (): { [key: string]: any } => {
        let watches = state.filteredWatches.length > 0 ? state.filteredWatches : state.watches
        let activeWatch = watches.find(watch => watch.id === state.activeWatch)
        
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
            images: activeWatch.images
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

    // Delete
    const remove = (id? :string) => {
        
        dispatch( watchesSlice.actions.setIsLoading(true) )

        ENDPOINTS.watches().delete(id ? [id] : selectedIds)
        .then(() => {
            dispatch( watchesSlice.actions.setIsLoading(false) )
            dispatch( watchesSlice.actions.deleteWatches(id ? [id] : selectedIds) )
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
                    title={t("watches")}
                    search={search}
                    showFilter={false}
                    showDelete={selectedIds.length > 0}
                    add={() => dispatch( watchesSlice.actions.setOpenAddModal(true) )}
                    addText={t("add_to_watches")}
                    delete={remove}
                    />
                
                <DashboardTable
                    header={[ "#", t("name"), t("condition"), t("price"), t("status"), t("certified"), t("featured"), "" ]}
                    body={generateData()}
                    onSelect={toggleSelectedId}
                    hasMore={state.hasMore && state.filteredWatches.length === 0}
                    loadMore={fetchData}
                    />
                
                <DetailsModal isOpen={state.detailsIsOpen} toggle={() => dispatch( watchesSlice.actions.setDetailsIsOpen(false) )} data={getActiveWatch()} title={t("watch_details")} />

                <AddWatchModal />

            </> : <div className="center"><EllipsisLoader /></div> }
        </>
    )

}