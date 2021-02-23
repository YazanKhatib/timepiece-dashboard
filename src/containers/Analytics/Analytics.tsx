import React, { useEffect } from 'react'
import { Col, Row } from 'react-grid-system'
import { useTranslation } from 'react-multi-lang'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { analyticsSlice, analyticsState } from './AnalyticsSlice'

// API
import API from '../../services/api/api'

// Components
import { LineChart, NumberBox } from '../../components/Statistics/Statistics'

export default () => {

    const t = useTranslation()

    // Redux
    const dispatch = useDispatch()
    const state = useSelector( ( state: { analytics: analyticsState } ) => state.analytics )

    // API
    const ENDPOINTS = new API()


    // Fetch data
    const fetchData = () => {

        dispatch( analyticsSlice.actions.setIsFetching(true) )

        let success = 0;

        // Users
        ENDPOINTS.analytics().users()
        .then((response: any) => {
            dispatch( analyticsSlice.actions.setUsers(response.data?.data?.getUsers?.total) )
        })
        .catch((error: any) => {})

        // Dealers
        ENDPOINTS.analytics().dealers()
        .then((response: any) => {
            dispatch( analyticsSlice.actions.setDealers(response.data?.data?.getUsers?.total) )
        })
        .catch((error: any) => {})

        // Watches
        ENDPOINTS.analytics().watches()
        .then((response: any) => {
            dispatch( analyticsSlice.actions.setWatches(response.data?.data?.getProducts?.total) )
        })
        .catch((error: any) => {})

    }

    useEffect(() => {
        fetchData()
    }, [])

    let LineChartLabels = [t("sa"), t("su"), t("mo"), t("tu"), t("we"), t("th"), t("fr")]
    let LineChartDatasets = [
        {
            color: '#FF0077',
            label: t('users'),
            data: [10, 5, 7, 5, 12, 10, 2]
        },
        {
            color: '#FFBB52',
            label: t('dealers'),
            data: [5, 2, 3, 6, 0, 4, 2]
        },
        {
            color: '#00ABFF',
            label: t('watches'),
            data: [8, 6, 4, 15, 8, 5, 4]
        }
    ]

    let GrowthLabels = [t("jan"), t("feb"), t("mar"), t("apr"), t("may"), t("jun"), t("jul"), t("aug"), t("sep"), t("oct"), t("nov"), t("dec")]
    let GrowthDatasets = [
        {
            color: '#FF0077',
            label: t('growth'),
            data: [1, 2, 3, 4, 7, 10, 13, 15, 20, 25, 27, 28, 30]
        }
    ]

    return (

        <Row className="mobile-nomargin" style={{ width: "100%" }}>

            <Col className="mobile-nopadd" md={4}>
                <NumberBox isLoading={state.users === null} showFilter={false} label={t("users")} value={<>{state.users}</>} />
            </Col>

            <Col className="mobile-nopadd" md={4}>
                <NumberBox isLoading={state.dealers === null} showFilter={false} label={t("dealers")} value={<>{state.dealers}</>} />
            </Col>

            <Col className="mobile-nopadd" md={4}>
                <NumberBox isLoading={state.watches === null} showFilter={false} label={t("watches")} value={<>{state.watches}</>} />
            </Col>

            <Col className="mobile-nopadd" md={6}>
                <LineChart title={t("items_by_time")} labels={LineChartLabels} datasets={LineChartDatasets} />
            </Col>

            <Col className="mobile-nopadd" md={6}>
                <LineChart title={t("growth_rate")} labels={GrowthLabels} datasets={GrowthDatasets} />
            </Col>
            
        </Row>
    )
}