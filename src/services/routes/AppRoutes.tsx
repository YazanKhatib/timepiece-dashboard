import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ScrollToTop from './ScrollToTop'
import Login from '../../pages/Login/Login'

class AppRoutes extends Component {

    constructor() {
        super({})
        if(localStorage.getItem("lang"))
            document.body.classList.add(localStorage.getItem("lang") == 'ar' ? 'rtl' : 'ltr')
        if(localStorage.getItem("theme"))
            document.body.classList.add( String( localStorage.getItem("theme") ) )
    }
    
    render() {
        return(
            <Router basename="/">
                <ScrollToTop>
                    { true ?
                    
                    // Auth pages
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/" component={() => <>404</>} />
                    </Switch> :

                    // Dashboard pages
                    <Switch>
                        
                    </Switch> }
                </ScrollToTop>
            </Router>
        )
    }
}

export default AppRoutes