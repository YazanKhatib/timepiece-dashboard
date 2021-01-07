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

    const nextStep = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch( addWatcheSlice.actions.setStep(3) )
    }

    return (
        <div className="step2" style={{ width: 500, maxWidth: "90vw" }}>
            <form onSubmit={nextStep}>

                <Row>
                <Col md={6}>
                        <InputField
                            label={t("clasp")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "clasp", value: e.target.value }))}
                            value={state.fields.clasp} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("clasp_material")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "clasp_material", value: e.target.value }))}
                            value={state.fields.clasp_material} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("bracelet_color")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "bracelet_color", value: e.target.value }))}
                            value={state.fields.bracelet_color} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("bracelet_material")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "bracelet_material", value: e.target.value }))}
                            value={state.fields.bracelet_material} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("case_material")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "case_material", value: e.target.value }))}
                            value={state.fields.case_material} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("case_diameter")}
                            type="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "case_diameter", value: e.target.value }))}
                            value={state.fields.case_diameter} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("jewels")}
                            type="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "jewels", value: e.target.value }))}
                            value={state.fields.jewels} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={t("crystal")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "crystal", value: e.target.value }))}
                            value={state.fields.crystal} />
                    </Col>
                    <Col md={12}>
                        <InputField
                            label={t("bezel_material")}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "bezel_material", value: e.target.value }))}
                            value={state.fields.bezel_material} />
                    </Col>
                </Row>

                <button className="button round bg-gray color-gold margin-top-30" style={{ padding: "0 70px" }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    dispatch( addWatcheSlice.actions.setStep(1) )
                }}
                >Back</button>
                <span className="margin-20"></span>
                <button className="button round bg-gold color-white margin-top-30" style={{ padding: "0 80px", marginBottom: 5 }}>Next</button>

            </form>

        </div>
    )

}