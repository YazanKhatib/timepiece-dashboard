import React from 'react'
import { SimpleCheckbox } from '../FormElements/FormElements'

import './Table.css'

interface DashboardTableProps {
    header: string[], // Table header data
    body: { 
            id?: string, // Row id
            data: string[] // Cells
        }[], // Rows
    onSelect?: Function // Fire this function when the user selects a raw
}

export const DashboardTable = (props: DashboardTableProps) => {

    const selectRow = (e: React.MouseEvent<HTMLTableRowElement>, id?: string) => {
        // Toggle active class
        e.currentTarget.classList.toggle("active")

        // Toggle checkbox
        let checkbox: HTMLInputElement | null = e.currentTarget.querySelector("input[type='checkbox']")
        checkbox?.click()

        // Fire select function
        if( props.onSelect && id )
            props.onSelect(id)
    }

    return (
        <div className="dashboard-table">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {props.header.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.body.map((tr, tr_index) => (
                        <tr key={tr_index} onClick={(e: React.MouseEvent<HTMLTableRowElement>) => selectRow(e, tr.id) }>
                            <td width="50"><SimpleCheckbox className="select-row" onClick={(e: React.MouseEvent<HTMLTableDataCellElement>) => e.stopPropagation()} /></td>
                            { tr.data.map((td, td_index) => (
                                <td key={tr_index + "_" + td_index}>{td}</td>
                            )) }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}