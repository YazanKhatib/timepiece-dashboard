import React from 'react'
import { useTranslation } from 'react-multi-lang'
import { SelectField } from '../../components/FormElements/FormElements'
import Modal from '../../components/Modal/Modal'

// Components
import { SideNav, TopNav } from '../../components/Nav/Nav'
import { DashboardTable } from '../../components/Table/Table'
import TableActionBar from '../../components/TableActionBar/TableActionBar'
import Analytics from '../../containers/Analytics/Analytics'

// Stylesheet
import './Dashboard.css'

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
                return(
                    <>
                    <TableActionBar title={t("dealers")} add={() => {alert("Add clicked!")}} addText={"Add to dealers"} showDelete={true} />
                    <DashboardTable
                        header={[ "Basic info", "Company", "Lead score", "phone", "Tags", "Status", "" ]}
                        body={
                            [
                                {
                                    data: [ "Majd Shamma", "Jaiasoft", "09.0", "09123456789", "Test tags",
                                    <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                                    <SelectField options={[
                                        { value: "approved", label: "Approved" },
                                        { value: "suspended", label: "Suspended" }
                                    ]} /></div>,
                                    <div className="show-on-hover">
                                        <i className="icon-edit" />
                                        <i className="icon-delete" />
                                    </div>
                                ]
                                },
                                {
                                    data: [ "Majd Shamma", "Jaiasoft", "09.0", "09123456789", "Test tags",
                                    <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                                    <SelectField options={[
                                        { value: "approved", label: "Approved" },
                                        { value: "suspended", label: "Suspended" }
                                    ]} /></div>,
                                    <div className="show-on-hover">
                                        <i className="icon-edit" />
                                        <i className="icon-delete" />
                                    </div>
                                ]
                                },
                                {
                                    data: [ "Majd Shamma", "Jaiasoft", "09.0", "09123456789", "Test tags",
                                    <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                                    <SelectField options={[
                                        { value: "approved", label: "Approved" },
                                        { value: "suspended", label: "Suspended" }
                                    ]} /></div>,
                                    <div className="show-on-hover">
                                        <i className="icon-edit" />
                                        <i className="icon-delete" />
                                    </div>
                                ]
                                },
                                {
                                    data: [ "Majd Shamma", "Jaiasoft", "09.0", "09123456789", "Test tags",
                                    <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                                    <SelectField options={[
                                        { value: "approved", label: "Approved" },
                                        { value: "suspended", label: "Suspended" }
                                    ]} /></div>,
                                    <div className="show-on-hover">
                                        <i className="icon-edit" />
                                        <i className="icon-delete" />
                                    </div>
                                ]
                                },
                                {
                                    data: [ "Majd Shamma", "Jaiasoft", "09.0", "09123456789", "Test tags",
                                    <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                                    <SelectField options={[
                                        { value: "approved", label: "Approved" },
                                        { value: "suspended", label: "Suspended" }
                                    ]} /></div>,
                                    <div className="show-on-hover">
                                        <i className="icon-edit" />
                                        <i className="icon-delete" />
                                    </div>
                                ]
                                },
                                {
                                    data: [ "Majd Shamma", "Jaiasoft", "09.0", "09123456789", "Test tags",
                                    <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                                    <SelectField options={[
                                        { value: "approved", label: "Approved" },
                                        { value: "suspended", label: "Suspended" }
                                    ]} /></div>,
                                    <div className="show-on-hover">
                                        <i className="icon-edit" />
                                        <i className="icon-delete" />
                                    </div>
                                ]
                                }
                            ]
                        }
                        />
                        </>
                )
            case "watches":
                return(<>Watches!</>)
            case "users":
                return(<>Users!</>)
            case "notifications":
                return(<>Notifications!</>)
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