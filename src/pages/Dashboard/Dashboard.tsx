import React from 'react'
import { useTranslation } from 'react-multi-lang'

// Components
import { SideNav, TopNav } from '../../components/Nav/Nav'
import Analytics from '../../containers/Analytics/Analytics'
import Dealers from '../../containers/Dealers/Dealers'
import Users from '../../containers/Users/Users'
import Watches from '../../containers/Watches/Watches'
import Orders from '../../containers/Orders/Orders'
import Offers from '../../containers/Offers/Offers'
import Certificates from '../../containers/Certificates/Certificates'
import Brands from '../../containers/Brands/Brands'

// Stylesheet
import './Dashboard.css'
import Notifications from '../../containers/Notifications/Notifications'

export default (props: any) => {

    const t = useTranslation()

    const navList = [
        {
            icon: "icon-analysis",
            name: t("analytics"),
            link: "/analytics"
        },
        {
            icon: "icon-username-1",
            name: t("dealers"),
            link: "/dealers"
        },
        {
            icon: "icon-time-1",
            name: t("watches"),
            link: "/watches"
        },
        {
            icon: "icon-users",
            name: t("users"),
            link: "/users"
        },
        {
            icon: "icon-product",
            name: t("orders"),
            link: "/orders"
        },
        {
            icon: "icon-orders",
            name: t("offers"),
            link: "/offers"
        },
        {
            icon: "icon-orders",
            name: t("certificates"),
            link: "/certificates"
        },
        {
            icon: "icon-categories-1",
            name: t("brands"),
            link: "/brands"
        },
        {
            icon: "icon-notification-1",
            name: t("notifications"),
            link: "/notifications"
        },
    ]

    let section = props.match.params.section ? props.match.params.section.toLowerCase() : "analytics"
    
    const dashboardContent = () => {
        switch (section) {
            case "analytics":
                return(<Analytics />)
            case "dealers":
                return(<Dealers />)
            case "watches":
                return(<Watches />)
            case "users":
                return(<Users />)
            case "orders":
                return(<Orders />)
            case "offers":
                return(<Offers />)
            case "certificates":
                return(<Certificates />)
            case "brands":
                return(<Brands />)
            case "notifications":
                return(<Notifications />)
            default:
                break;

        }
    }

    return(
        <div className="dashboard-page">
            <SideNav list={navList} active={section} />
            <div className="main-side">

                <TopNav />

                <div className="content">
                    { dashboardContent() }
                </div>

            </div>
        </div>
    )
}