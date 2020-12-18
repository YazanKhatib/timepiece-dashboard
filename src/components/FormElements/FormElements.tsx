import { uid } from '../../hoc/helpers';
import './FormElements.css'

export const InputField = (props: any) => {
    
    let field: object = (({ type, onChange, defaultValue, disabled, max, min, value }) => ({ type, onChange, defaultValue, disabled, max, min, value }))(props);
    let inputLabel: string = props.placeholder ? props.placeholder : props.label ? props.label : '';
    let id = uid('input')

    return(
        <div className="input-box">
            <input { ...field } id={id} />
            { inputLabel ? <label className={props.value ? "active" : ''} htmlFor={id}>{inputLabel}</label> : '' }
        </div>
    )

}

export const Textarea = (props: any) => {
    let field: object = (({ onChange, defaultValue, disabled, value, rows }) => ({ onChange, defaultValue, disabled, value, rows }))(props);
    let inputLabel: string = props.placeholder ? props.placeholder : props.label ? props.label : '';
    let id = uid('input')

    return(
        <div className="input-box">
            <textarea { ...field } id={id} />
            { inputLabel ? <label className={props.value ? "active" : ''} htmlFor={id}>{inputLabel}</label> : '' }
        </div>
    )
}

export const Checkbox = (props: any) => {

    let field: object = (({ onChange, disabled }) => ({ onChange, disabled }))(props);
    let inputLabel: string = props.label;
    let id = uid('input')

    return(
        <div className="checkbox">
            <input { ...field } type="checkbox" id={id} />
            <div>
                <i className="icon-checkmark" />
                { inputLabel ? <label className={props.value ? "active" : ''} htmlFor={id}>{inputLabel}</label> : '' }
            </div>
        </div>
    )

}