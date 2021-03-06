import React from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { watchesSlice, watchesState } from '../WatchesSlice'
import { addWatcheSlice, addWatcheState } from './AddWatchSlice'

// Components
import Modal from '../../../components/Modal/Modal'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import Step3 from './Steps/Step3'
import { SuccessMark, WhiteboxLoader } from '../../../components/Loader/Loader'
import { t } from 'react-multi-lang'

export default () => {
    
    // Redux
    const dispatch = useDispatch()
    const watchesState = useSelector( ( state: { watches: watchesState } ) => state.watches )
    const addState = useSelector( ( state: { add_watch: addWatcheState } ) => state.add_watch )

    const toggle = () => {
        dispatch( watchesSlice.actions.setOpenAddModal(false) )
        dispatch( addWatcheSlice.actions.init() )
    }

    return(
        <Modal open={watchesState.openAddModal} toggle={toggle}>
            
            { addState.isLoading ? <WhiteboxLoader /> : "" }
            { addState.isSuccess ? <SuccessMark /> : "" }

            {/* Steps */}
            <h2 className="text-center" style={{ margin: "0 0 20px" }}>
            {
                addState.step === 1 ? t("basic_information") :
                addState.step === 2 ? t("watch_materials") :
                t("advanced_information")
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