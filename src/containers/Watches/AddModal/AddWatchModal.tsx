import React from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { watchesSlice, watchesState } from '../WatchesSlice'
import { addWatcheState } from './AddWatchSlice'

// Components
import Modal from '../../../components/Modal/Modal'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import Step3 from './Steps/Step3'

export default () => {
    
    // Redux
    const dispatch = useDispatch()
    const watchesState = useSelector( ( state: { watches: watchesState } ) => state.watches )
    const addState = useSelector( ( state: { add_watch: addWatcheState } ) => state.add_watch )

    return(
        <Modal open={watchesState.openAddModal} toggle={() => dispatch( watchesSlice.actions.setOpenAddModal(false) )}>
            
            {/* Steps */}
            <h2 className="text-center" style={{ margin: "0 0 20px" }}>
            {
                addState.step === 1 ? "Basic information" :
                addState.step === 2 ? "Watch materials" :
                "Advanced information"
            }
            </h2>
            {
                addState.step === 1 ? <Step1 /> :
                addState.step === 2 ? <Step2 /> :
                <Step3 />
            }

        </Modal>
    )

}