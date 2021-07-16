import React, { useState } from 'react'

// Translation
import { useTranslation } from 'react-multi-lang'

// Stylesheet
import './Notifications.css'

// Assets
import notifications from '../../assets/images/vector/notifications.svg'

// Components
import { InputField, Textarea } from '../../components/FormElements/FormElements'
import { WhiteboxLoader } from '../../components/Loader/Loader'
import API from '../../services/api/api'

export default () => {

    // Translation
    const t = useTranslation()

    // React Hooks
    const [notificationTitle, setNotificationTitle] = useState<string>("")
    const [notification, setNotification] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // API
    const ENDPOINTS = new API()

    const sendNotification = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setIsLoading(true)

        ENDPOINTS.notifications().send({ title: notificationTitle, body: notification })
        .then((response: any) => {
            setIsLoading(false)
            setNotificationTitle("")
            setNotification("")
        })

    }

    return(
        <div className="notifications">
            { isLoading ? <WhiteboxLoader /> : "" }
            <img src={notifications} />
            <form className="margin-top-30" onSubmit={sendNotification}>
                <InputField
                    value={notificationTitle}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotificationTitle(e.target.value)}
                    placeholder={t("notification_title")} />
                <Textarea
                    value={notification}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotification(e.target.value)}
                    placeholder={t("notification_text")}
                    rows={4} />
                <button className="button bg-gold color-white round margin-top-20" style={{ padding: "0 50px" }}>{t("send_notification")}</button>
            </form>
        </div>
    )

} 