import React, { useState } from 'react'

// Gird system
import { Col, Row } from 'react-grid-system'

// Translation
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { addWatcheSlice, addWatcheState } from '../AddWatchSlice'

// Components
import { InputField, SelectField, Textarea } from '../../../../components/FormElements/FormElements'
import { BrandsMenu } from '../../../../components/PredefinedMenus/PredefinedMenus'



export default () => {

    // Translation
    const t = useTranslation()

    // Hooks
    const [showErrors, setShowErrors] = useState<boolean>(false)

    // Condition options
    const condition_options = [
        { value: "new", label: t("new") },
        { value: "unworn", label: t("unworn") },
        { value: "excellent", label: t("excellent") },
        { value: "good", label: t("good") },
        { value: "fair", label: t("fair") }
    ]
    const delivery_options = [
        { value: "original_box", label: t("original_box") },
        { value: "original_papers", label: t("original_papers") },
    ]
    const location_options = [
        { value: "qatar", label: t("qatar") },
        { value: "kuwait", label: t("kuwait") },
        { value: "uae", label: t("uae") },
    ]

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

    const getDeliveryOptions = (): { value: string, label: string }[] => {
        let selected_options = state.fields.delivery.split(", ")
        let options: any[] = []
        selected_options.map( ( selected_option ) => {
            options.push( delivery_options.find( option => option.value === selected_option ) )
        })
        return options
    }

    return (
        <div className="step1" style={{ width: 500, maxWidth: "90vw" }}>
            <form onSubmit={nextStep}>

                <Row>
                    <Col md={6}>
                        <BrandsMenu
                            placeholder={t("Brand *")}
                            value={state.fields.brand ? { label: state.fields.brand, value: state.fields.brand } : null}
                            onChange={(option: { value: string }) => dispatch(addWatcheSlice.actions.set({ field: "brand", value: option.value }))}
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
                        <SelectField
                            placeholder={t("Condition *")}
                            value={state.fields.condition ? condition_options.find( option => option.value === state.fields.condition ) : null}
                            onChange={(option: { value: string }) => dispatch(addWatcheSlice.actions.set({ field: "condition", value: option.value }))}
                            error={(showErrors && state.fields.condition === "") ? t("required_error") : ""}
                            options={condition_options} />
                    </Col>
                    <Col md={12}>
                        <SelectField
                            placeholder={t("Scope of delivery *")}
                            isMulti
                            value={state.fields.delivery ? getDeliveryOptions() : null}
                            onChange={(option: {value: string}[]) => {
                                if(option) {
                                    let joined_value = option.map( (item) => ( item.value )).join(", ")
                                    dispatch(addWatcheSlice.actions.set({ field: "delivery", value: joined_value }))
                                } else if( state.fields.delivery !== "" )
                                    dispatch(addWatcheSlice.actions.set({ field: "delivery", value: "" }))
                            }}
                            error={(showErrors && state.fields.delivery === "") ? t("required_error") : ""}
                            options={delivery_options} />
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
                        <SelectField
                            placeholder={t("location")}
                            value={state.fields.location ? location_options.find( option => option.value === state.fields.location ) : null}
                            onChange={(option: { value: string }) => dispatch(addWatcheSlice.actions.set({ field: "location", value: option.value }))}
                            error={(showErrors && state.fields.location === "") ? t("required_error") : ""}
                            options={location_options} />
                    </Col>
                </Row>

                <button className="button round bg-gold color-white margin-top-30" style={{ padding: "0 80px", marginBottom: 5 }}>Next</button>

            </form>

        </div>
    )

}