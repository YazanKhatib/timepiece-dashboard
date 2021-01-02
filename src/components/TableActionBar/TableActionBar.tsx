import React from 'react'
import { useTranslation } from 'react-multi-lang'

import './TableActionBar.css'

interface ActionBarProps {
    title?: string,
    search?: Function,
    delete?: Function,
    add?: Function,
    addText?: string,
    showDelete?: boolean,
    showFilter?: boolean
}

export default (props: ActionBarProps) => {

    const t = useTranslation()

    return(
        <div className="action-bar">
            { props.title ? <h2>{props.title}</h2> : "" }
            <div className="search">
                <input type="text" placeholder={t('search')} />
                <i className="icon-search"></i>
            </div>
            <div className="actions">
                { props.showDelete ? <button className="delete"><i className="icon-delete"></i></button> : "" }
                { props.showFilter === false ?  "" : <button className="filter"><i className="icon-filter-2"></i> {t("filter")}</button> }
                { props.add ? <button className="add" onClick={() => { if(props.add) props.add() }}><i className="icon-plus"></i> {props.addText}</button> : "" }
            </div>
        </div>
    )

}