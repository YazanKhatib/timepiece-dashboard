import React, { useState } from 'react'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { user, certificate, certificatesSlice, certificatesState } from './CertificatesSlice'

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
    const state = useSelector( ( state: { certificates: certificatesState } ) => state.certificates )

    // API
    const ENDPOINTS = new API()

    // Search
    const search = () => {}

    // Fetch Data
    const fetchData = () => {
        
        dispatch( certificatesSlice.actions.setIsFetching(true) )

        ENDPOINTS.certificates().index()
        .then( (response: any) => {
            console.log('Response: ', response)
            let certificates: certificate[] = []
            if(!response.data.data)
                return
            response.data.data.getCertificates.map( (item: any) => {
                certificates.push({
                    id: String(item.id),
                    fulfilled: Boolean(item.fulfilled),
                    user: {
                        id: String(item.user.id),
                        username: String(item.user.username),
                        name: String(( !item.user.first_name && !item.user.last_name ) ? "N/A" : item.user.first_name + " " + item.user.last_name),
                        email: String(item.user.email),
                        email_status: Boolean(item.user.confirmed),
                        status: Boolean(item.user.blocked),
                        phone: String(item.user.phone ? item.user.phone : "N/A"),
                        birth: String(item.user.birth ? item.user.birth : "N/A"),
                        gender: String(item.user.gender ? item.user.gender : "N/A"),
                        address: String(item.user.address ? item.user.address : "N/A")
                    }
                })
            })

            dispatch( certificatesSlice.actions.addCertificates(certificates) )
            dispatch( certificatesSlice.actions.setIsLoaded(true) )
            dispatch( certificatesSlice.actions.setIsFetching(false) )
        })

    }

    interface tableDataType { [key: string]: { [key: string]: any } }
    const generateData: () => tableDataType = () => {
        let data: tableDataType = {}
        state.certificates.map( (certificate, index) => {
            data[certificate.id] = {
                username: certificate.user.username,
                name: certificate.user.name,
                email: certificate.user.email,
                fulfilled: certificate.fulfilled ? t('yes') : t('no'),
                actions: <div className="show-on-hover">
                            {!certificate.fulfilled ? <i className="icon-checkmark" onClick={(e: React.MouseEvent<HTMLLIElement>) => fulfilled(e, certificate.id) }  /> : ''}
                            <i className="icon-info" onClick={(e: React.MouseEvent<HTMLLIElement>) => showDetails(e, certificate.id) } />
                        </div>
            }
        })
        
        return data
    }

    // Details Modal
    const showDetails = (e: React.MouseEvent<HTMLLIElement>, certificateId: string) => {
        e.stopPropagation();
        dispatch( certificatesSlice.actions.setDetailsIsOpen(true) )
        dispatch( certificatesSlice.actions.setActiveCertificate(certificateId) )
    }
    
    const fulfilled = (e: React.MouseEvent<HTMLLIElement>, certificateId: string) => {
        dispatch( certificatesSlice.actions.setIsLoading(true) )
        e.stopPropagation()
        ENDPOINTS.certificates().fulfillCertificate(certificateId)
        .then((response: any) => {
            dispatch( certificatesSlice.actions.setIsLoading(false) )
            dispatch(certificatesSlice.actions.setFulfilled({ id: certificateId, fulfilled: response.data.data.fulfillCertificate }))
        });
    }
    
    const getActiveUser = (): { [key: string]: any } => {
        let activeUser = state.certificates.find(certificate => certificate.id === state.activeCertificate)?.user
        
        if(!activeUser)
            return {}

        let user: User = {
            username: activeUser.username,
            name: activeUser.name,
            email: activeUser.email,
            phone: activeUser.phone,
            birth: activeUser.birth,
            gender: activeUser.gender,
            address: activeUser.address
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


    // First fetch
    if( !state.isLoaded && !state.isFetching )
        fetchData()

    return(
        <>
            { state.isLoaded ?
            <>
                { state.isLoading ? <WhiteboxLoader /> : ""}
                
                <TableActionBar
                    title={t("certificates")}
                    search={search}
                    showFilter={false}
                    showDelete={false}
                    />
                
                <DashboardTable
                    header={[ t("username"), t("name"), t("email"), t("fulfilled"), "" ]}
                    body={generateData()}
                    onSelect={toggleSelectedId}
                    loadMore={fetchData}
                    />
                
                <DetailsModal isOpen={state.detailsIsOpen} toggle={() => dispatch( certificatesSlice.actions.setDetailsIsOpen(false) )} data={getActiveUser()} title={t("dealer_details")} />
            </> : <div className="center"><EllipsisLoader /></div> }
        </>
    )

}