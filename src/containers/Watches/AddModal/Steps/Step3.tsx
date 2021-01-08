import React, { useState } from 'react'

// Gird system
import { Col, Row } from 'react-grid-system'

// Translation
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addWatcheSlice, addWatcheState } from '../AddWatchSlice'
import { watch, watchesSlice } from '../../WatchesSlice'

// API
import API from '../../../../services/api/api'

// Components
import { InputField, SelectField } from '../../../../components/FormElements/FormElements'

export default () => {

    // Translation
    const t = useTranslation()

    // Movement options
    const movement_options = [
        { value: "automatic", label: t("automatic") },
        { value: 'quartz', label: t("quartz") },
        { value: 'manual', label: t("manual") },
    ]
    
    const gender_options = [
        { value: "mens_watch", label: t("mens_watch") },
        { value: 'unisex', label: t("unisex") },
        { value: 'womens_watch', label: t("women") },
    ]

    // Redux
    const dispatch = useDispatch()
    const state = useSelector((state: { add_watch: addWatcheState }) => state.add_watch)

    // API
    const ENDPOINTS = new API()

    const submitWatch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Submit
        dispatch(addWatcheSlice.actions.setIsLoading(true))

        let api_call = state.editId ? ENDPOINTS.watches().update(state.fields, state.editId) : ENDPOINTS.watches().add(state.fields)

        api_call
            .then((response: any) => {
                console.log(response)
                dispatch(addWatcheSlice.actions.setIsLoading(false))
                dispatch(addWatcheSlice.actions.setIsSuccess(true))

                setTimeout(() => {
                    dispatch( addWatcheSlice.actions.init() )
                    dispatch(watchesSlice.actions.setOpenAddModal(false))
                }, 2000);

                // Add to table
                let watch: watch = {
                    id: state.editId ? String(response.data.data.updateProduct.id) : String(response.data.data.addProduct.id),
                    name: String(state.fields.brand ? state.fields.brand : "N/A"),
                    model: String(state.fields.model ? state.fields.model : "N/A"),
                    description: String(state.fields.description ? state.fields.description : "N/A"),
                    condition: String(state.fields.condition ? state.fields.condition : "N/A"),
                    location: String(state.fields.location ? state.fields.location : "N/A"),
                    featured: false,
                    confirmed: false,
                    delivery: String(state.fields.delivery ? state.fields.delivery : "N/A"),
                    price: Number(state.fields.price),
                    production_year: Number(state.fields.production_year),
                    case_material: String(state.fields.case_material ? state.fields.case_material : "N/A"),
                    movement: String(state.fields.movement ? state.fields.movement : "N/A"),
                    bracelet_material: String(state.fields.bracelet_material ? state.fields.bracelet_material : "N/A"),
                    gender: String(state.fields.gender ? state.fields.gender : "N/A"),
                    calibar: String(state.fields.calibar ? state.fields.calibar : "N/A"),
                    base_calibar: String(state.fields.base_calibar ? state.fields.base_calibar : "N/A"),
                    power_reserve: Number(state.fields.power_reserve),
                    jewels: Number(state.fields.jewels),
                    case_diameter: Number(state.fields.case_diameter),
                    water_resistance: Number(state.fields.water_resistance),
                    bezel_material: String(state.fields.bezel_material ? state.fields.bezel_material : "N/A"),
                    crystal: String(state.fields.crystal ? state.fields.crystal : "N/A"),
                    dial: String(state.fields.dial ? state.fields.dial : "N/A"),
                    dial_numbers: String(state.fields.dial_numbers ? state.fields.dial_numbers : "N/A"),
                    bracelet_color: String(state.fields.bracelet_color ? state.fields.bracelet_color : "N/A"),
                    clasp: String(state.fields.clasp ? state.fields.clasp : "N/A"),
                    clasp_material: String(state.fields.clasp_material ? state.fields.clasp_material : "N/A"),
                }

                if( state.editId )
                    dispatch(watchesSlice.actions.updateWatch(watch))
                else
                    dispatch(watchesSlice.actions.addWatches([watch]))

            })

    }

    return (
        <div className="step2" style={{ width: 500, maxWidth: "90vw" }}>
            <form onSubmit={submitWatch}>

                <Row>
                    <Col md={6}>
                        <InputField
                            label={t("calibar")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "calibar", value: e.target.value }))}
                            value={state.fields.calibar} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("base_calibar")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "base_calibar", value: e.target.value }))}
                            value={state.fields.base_calibar} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("power_reserve")}
                            type="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "power_reserve", value: e.target.value }))}
                            value={state.fields.power_reserve} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("water_resistance")}
                            type="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "water_resistance", value: e.target.value }))}
                            value={state.fields.water_resistance} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("dial")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "dial", value: e.target.value }))}
                            value={state.fields.dial} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("dial_numbers")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "dial_numbers", value: e.target.value }))}
                            value={state.fields.dial_numbers} />
                    </Col>
                    <Col md={6}>
                        <SelectField
                            placeholder={t("gender")}
                            value={state.fields.gender ? gender_options.find( option => option.value === state.fields.gender ) : null}
                            onChange={(option: { value: string }) => dispatch(addWatcheSlice.actions.set({ field: "gender", value: option.value }))}
                            options={gender_options} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("production_year")}
                            type="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "production_year", value: e.target.value }))}
                            value={state.fields.production_year} />
                    </Col>
                    <Col md={12}>
                        <SelectField
                            placeholder={t("movement")}
                            value={state.fields.movement ? movement_options.find( option => option.value === state.fields.movement ) : null}
                            onChange={(option: { value: string }) => dispatch(addWatcheSlice.actions.set({ field: "movement", value: option.value }))}
                            options={movement_options} />
                    </Col>
                </Row>

                <button className="button round bg-gray color-gold margin-top-30" style={{ padding: "0 70px" }}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();
                        dispatch(addWatcheSlice.actions.setStep(2))
                    }}
                >Back</button>
                <span className="margin-20"></span>
                <button className="button round bg-gold color-white margin-top-30" style={{ padding: "0 80px", marginBottom: 5 }}>Submit</button>

            </form>

        </div>
    )

}