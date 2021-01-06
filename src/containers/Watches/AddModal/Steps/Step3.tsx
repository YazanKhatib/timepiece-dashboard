import React, { useState } from 'react'

// Gird system
import { Col, Row } from 'react-grid-system'

// Translation
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addWatcheSlice, addWatcheState } from '../AddWatchSlice'

// Components
import { InputField } from '../../../../components/FormElements/FormElements'

export default () => {

    // Translation
    const t = useTranslation()

    // Redux
    const dispatch = useDispatch()
    const state = useSelector((state: { add_watch: addWatcheState }) => state.add_watch)

    const submitWatch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // Submit

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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "power_reserve", value: e.target.value }))}
                            value={state.fields.power_reserve} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("water_resistance")}
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
                        <InputField
                            label={t("gender")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "gender", value: e.target.value }))}
                            value={state.fields.gender} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("production_year")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "production_year", value: e.target.value }))}
                            value={state.fields.production_year} />
                    </Col>
                    <Col md={12}>
                        <InputField
                            label={t("movement")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "movement", value: e.target.value }))}
                            value={state.fields.movement} />
                    </Col>
                </Row>

                <button className="button round bg-gray color-gold margin-top-30" style={{ padding: "0 70px" }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    dispatch( addWatcheSlice.actions.setStep(2) )
                }}
                >Back</button>
                <span className="margin-20"></span>
                <button className="button round bg-gold color-white margin-top-30" style={{ padding: "0 80px" }}>Submit</button>

            </form>

        </div>
    )

}