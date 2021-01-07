import React, { useState } from 'react'

// Gird system
import { Col, Row } from 'react-grid-system'

// Translation
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addWatcheSlice, addWatcheState } from '../AddWatchSlice'

// Components
import { InputField, Textarea } from '../../../../components/FormElements/FormElements'

export default () => {

    // Translation
    const t = useTranslation()

    // Hooks
    const [showErrors, setShowErrors] = useState<boolean>(false)

    // Redux
    const dispatch = useDispatch()
    const state = useSelector((state: { add_watch: addWatcheState }) => state.add_watch)

    const nextStep = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if (state.fields["brand"] === "" ||
            state.fields["model"] === "" ||
            state.fields["price"] === "" ||
            state.fields["delivery"] === "" ||
            state.fields["condition"] === "" ||
            state.fields["description"] === "" ||
            state.fields["location"] === "") {
            setShowErrors(true)
            return
        }

        dispatch( addWatcheSlice.actions.setStep(2) )

    }

    return (
        <div className="step1" style={{ width: 500, maxWidth: "90vw" }}>
            <form onSubmit={nextStep}>

                <Row>
                    <Col md={6}>
                        <InputField
                            label={"Brand *"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "brand", value: e.target.value }))}
                            value={state.fields.brand}
                            error={(showErrors && state.fields.brand === "") ? t("required_error") : ""} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={"Model *"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "model", value: e.target.value }))}
                            value={state.fields.model}
                            error={(showErrors && state.fields.model === "") ? t("required_error") : ""} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={"Price *"}
                            type="number"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "price", value: e.target.value }))}
                            value={state.fields.price}
                            error={(showErrors && state.fields.price === "") ? t("required_error") : ""} />
                    </Col>
                    <Col md={6}>
                        <InputField
                            label={"Delivery *"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "delivery", value: e.target.value }))}
                            value={state.fields.delivery}
                            error={(showErrors && state.fields.delivery === "") ? t("required_error") : ""} />
                    </Col>
                    <Col md={12}>
                        <InputField
                            label={"Condition *"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "condition", value: e.target.value }))}
                            value={state.fields.condition}
                            error={(showErrors && state.fields.condition === "") ? t("required_error") : ""} />
                    </Col>
                    <Col md={12}>
                        <Textarea
                            label={"Description *"}
                            rows={3}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "description", value: e.target.value }))}
                            value={state.fields.description}
                            error={(showErrors && state.fields.description === "") ? t("required_error") : ""} />
                    </Col>
                    <Col md={12}>
                        <InputField
                            label={"Location *"}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(addWatcheSlice.actions.set({ field: "location", value: e.target.value }))}
                            value={state.fields.location}
                            error={(showErrors && state.fields.location === "") ? t("required_error") : ""} />
                    </Col>
                </Row>

                <button className="button round bg-gold color-white margin-top-30" style={{ padding: "0 80px", marginBottom: 5 }}>Next</button>

            </form>

        </div>
    )

}