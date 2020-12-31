import React from 'react'

import './Table.css'

interface DashboardTableProps {
    header: string[], // Table header data
    body: [ // Rows
        { 
            id?: string, // Row id
            data: string[] // Cells
        }
    ],
    onSelect?: Function // Fire this function when the user selects a raw
}

export const DashboardTable = (props: DashboardTableProps) => {

    const selectRow = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        // Toggle active class
        if (e.currentTarget.classList.contains("active"))
            e.currentTarget.classList.remove("active")
        else
            e.currentTarget.classList.add("active")

        // Fire select function
        if( props.onSelect )
            props.onSelect(id)
    }

    return (
        <div className="dashboard-table">
            <table>
                <thead>
                    <tr>
                        {props.header.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.body.map((tr, tr_index) => (
                        <tr key={tr_index} onClick={(e: React.MouseEvent<HTMLTableRowElement>) => {
                            if(tr.id) selectRow(e, tr.id)
                        } }>
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