import React, { useState } from 'react'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { brand, brandsSlice, brandsState } from './BrandsSlice'
import { addBrandSlice } from './AddModal/AddBrandSlice'

// API
import API from '../../services/api/api'

// Components
import TableActionBar from '../../components/TableActionBar/TableActionBar'
import { DashboardTable } from '../../components/Table/Table'
import { EllipsisLoader, WhiteboxLoader } from '../../components/Loader/Loader'
import { SelectField } from '../../components/FormElements/FormElements'
import AddBrandModal from './AddModal/AddBrandModal'

export default () => {

    // Translation
    const t = useTranslation()

    // Redux
    const dispatch = useDispatch()
    const state = useSelector( ( state: { brands: brandsState } ) => state.brands )

    // API
    const ENDPOINTS = new API()

    // Search
    const search = () => {}

    // Fetch Data
    const fetchData = (page: number, page_size: number = 10) => {
        
        dispatch( brandsSlice.actions.setIsFetching(true) )

        ENDPOINTS.brands().index( { limit: page_size, offset: page - 1 } )
        .then( (response: any) => {

            // Has more
            if( response.data?.data?.getBrands?.total <= page * page_size )
                dispatch( brandsSlice.actions.setHasMore(false) )
            
            let brands: brand[] = []

            response.data?.data?.getBrands?.results?.map( (item: any) => {
                brands.push({
                    id: String(item.id),
                    name: String(item.name ? item.name : "N/A"),
                })
            })

            dispatch( brandsSlice.actions.addBrands(brands) )
            dispatch( brandsSlice.actions.setIsLoaded(true) )
            dispatch( brandsSlice.actions.setIsFetching(false) )
        })

    }

    interface tableDataType { [key: string]: { [key: string]: any } }
    const generateData: () => tableDataType = () => {
        let data: tableDataType = {}
        state.brands.map( (item, index) => {
            data[item.id] = {
                name: item.name,
                actions: <div className="show-on-hover">
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

    // Edit
    const edit = (e: React.MouseEvent<HTMLLIElement>, id: string) => {
        e.stopPropagation()
        let brandToEdit = state.brands.find(brand => brand.id === id)
        if(brandToEdit) {
            dispatch( addBrandSlice.actions.set({
                name: brandToEdit.name,
            }) )
            dispatch( addBrandSlice.actions.setEditId(brandToEdit.id) )
            dispatch( brandsSlice.actions.setOpenAddModal(true) )
        }

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
        
        dispatch( brandsSlice.actions.setIsLoading(true) )

        ENDPOINTS.brands().delete(id ? [id] : selectedIds)
        .then(() => {
            dispatch( brandsSlice.actions.setIsLoading(false) )
            dispatch( brandsSlice.actions.deleteBrands(id ? [id] : selectedIds) )
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
                    title={t("brands")}
                    search={search}
                    showFilter={false}
                    showDelete={selectedIds.length > 0}
                    add={() => dispatch( brandsSlice.actions.setOpenAddModal(true) )}
                    addText={t("add_to_brands")}
                    delete={remove}
                    />
                
                <DashboardTable
                    header={[ t("name"), "" ]}
                    body={generateData()}
                    onSelect={toggleSelectedId}
                    hasMore={state.hasMore}
                    loadMore={fetchData}
                    />
                
                <AddBrandModal />

            </> : <div className="center"><EllipsisLoader /></div> }
        </>
    )

}