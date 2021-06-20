import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import { useTranslation } from 'react-multi-lang'
import { EllipsisLoader } from '../Loader/Loader'
import Modal from '../Modal/Modal'

import './DetailsModal.css'

interface DetailsModalProps {
    isOpen: boolean,
    toggle: Function,
    isLoading?: boolean,
    title?: string,
    data: {
        [key: string]: any
    }
}


export default (props: DetailsModalProps) => {
    // Translation
    const t = useTranslation()
    return <Modal open={props.isOpen} toggle={props.toggle}>
        { props.isLoading ?
        <div className="center"><EllipsisLoader /></div> :
        <>
        { props.title ? <h3 className="details-modal-title">{props.title}</h3> : "" }
        <table className="details-table">
            { Object.keys(props.data).map( (key, index) => (
                <>
                { props.data[key] && props.data[key].length > 0 || key === "address" ?
                <tr key={key}>
                    <td>{t(key)}</td>
                    { key === "images" ?
                    <td>
                        <SimpleImageSlider
                                showNavs={true}
                                showBullets={true}
                                width={500}
                                height={700}
                                images={props.data[key]?.map((image: string) => ({ url: image }))}
                            />
                    </td> :
                    <td>{props.data[key]}</td> }
                </tr> : "" }
                </>
            )) }
        </table>
        </> }
    </Modal>
}