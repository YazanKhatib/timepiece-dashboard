import React, { useState } from 'react'

// Gird system
import { Col, Row } from 'react-grid-system'

// Translation
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { brandsSlice, brandsState, brand } from '../BrandsSlice'
import { addBrandSlice, addBrandState } from './AddBrandSlice'

// API
import API from '../../../services/api/api'

// Components
import Modal from '../../../components/Modal/Modal'
import { SuccessMark, WhiteboxLoader } from '../../../components/Loader/Loader'
import { InputField } from '../../../components/FormElements/FormElements'


export default () => {

    // Translation
    const t = useTranslation()
    
    // Redux
    const dispatch = useDispatch()
    const brandsState = useSelector( ( state: { brands: brandsState } ) => state.brands )
    const addState = useSelector( ( state: { add_brand: addBrandState } ) => state.add_brand )

    // Hooks
    const [ nameError, setNameError ] = useState<string>("")

    // API
    const ENDPOINTS = new API()

    const toggle = () => {
        dispatch( brandsSlice.actions.setOpenAddModal(false) )
        dispatch( addBrandSlice.actions.init() )
        setNameError("")
    }

    const submitBrand = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if( addState.name === "" ) {
            setNameError(t("required_error"))
            return
        }

        // Submit
        dispatch(addBrandSlice.actions.setIsLoading(true))

        let api_call = addState.editId ? ENDPOINTS.brands().update(addState.name, addState.editId) : ENDPOINTS.brands().add(addState.name)

        api_call
            .then((response: any) => {
                
                dispatch(addBrandSlice.actions.setIsLoading(false))
                
                if(response.data?.errors) {
                    setNameError(t("brand_already_exists"))
                    return
                }

                dispatch(addBrandSlice.actions.setIsSuccess(true))

                setTimeout(() => {
                    dispatch( addBrandSlice.actions.init() )
                    dispatch(brandsSlice.actions.setOpenAddModal(false))
                }, 2000);

                // Add to table
                let brand: brand = {
                    id: addState.editId ? String(response.data?.data?.updateBrand?.id) : String(response.data?.data?.createBrand?.id),
                    name: String(addState.name ? addState.name : "N/A"),
                }

                if( addState.editId )
                    dispatch(brandsSlice.actions.updateBrand(brand))
                else
                    dispatch(brandsSlice.actions.addBrands([brand]))

            })

    }

    return(
        <Modal open={brandsState.openAddModal} toggle={toggle}>
            
            { addState.isLoading ? <WhiteboxLoader /> : "" }
            { addState.isSuccess ? <SuccessMark /> : "" }

            <h2 className="text-center" style={{ margin: "0 0 20px" }}>
                {t("brand_information")}
            </h2>

            
        <div className="step2" style={{ width: 500, maxWidth: "90vw" }}>
            <form onSubmit={submitBrand}>

                <Row>
                    <Col md={12} className="add-brand">
                        <InputField
                            label={t("name")}
                            error={nameError}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(addBrandSlice.actions.set({ name: e.target.value }))
                                setNameError("")
                            }}
                            value={addState.name} />
                    </Col>
                </Row>

                <button className="button round bg-gold color-white margin-top-30" style={{ padding: "0 80px", marginBottom: 5 }}>{t("submit")}</button>

            </form>

        </div>

        </Modal>
    )

}