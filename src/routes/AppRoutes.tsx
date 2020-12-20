import React, { Component } from 'react'

import Login from '../pages/Login/Login'

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
            <Login />
        )
    }
}

export default AppRoutes