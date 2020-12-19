import React, { useState } from "react";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from 'react-redux'

import { loginSlice, loginState } from "./LoginFormReducer";

import { Checkbox, InputField } from "../../components/FormElements/FormElements";
import { RippleLoader, SuccessMark } from "../../components/Loader/Loader";

import './LoginForm.css'


export default function () {

    // Tranlsation
    const t = useTranslation()

    // Redux
    const dispatch = useDispatch()
    const loginState = useSelector( ( state: { login: loginState } ) => state.login )

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [usernameError, setUsernameError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [showSucessMark, setShowSuccessMark] = useState<boolean>(false)

    const login = () => {
        
        let isReadyToSubmit: boolean = true
        
        if(!username) {
            setUsernameError(t("required_error"))
            isReadyToSubmit = false
        }
        
        if(!password) {
            setPasswordError(t("required_error"))
            isReadyToSubmit = false
        }
        
        if(!isReadyToSubmit) return

        dispatch( loginSlice.actions.load({}) )

        setTimeout(() => {
            dispatch( loginSlice.actions.success({}) )
            setTimeout(() => {
                setShowSuccessMark(true)
            }, 200);
        }, 2000);

    }

    return(
        <div className="login-form">
            
            <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                
                <InputField
                    value={username}
                    type="text"
                    placeholder={t('username')}
                    error={usernameError}
                    disabled={loginState.isLoading || loginState.isSuccess}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUsername(e.currentTarget.value);
                        setUsernameError("")
                    } } />

                <InputField
                    value={password}
                    type="password"
                    placeholder={t('password')}
                    error={passwordError}
                    disabled={loginState.isLoading || loginState.isSuccess}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.currentTarget.value);
                        setPasswordError("")
                    } } />
                
                <Checkbox label={t('remember_me')} disabled={loginState.isLoading || loginState.isSuccess} />
                
                <div className="text-center"><button className={ "button bg-gold color-white round" + (loginState.isSuccess ? " scale" : '') } style={{ width: loginState.isLoading ? 50 : 200 }} onClick={login}>{ loginState.isLoading ? <RippleLoader /> : t('login') }</button></div>

                { showSucessMark ? <SuccessMark /> : '' }

            </form>
            
        </div>
    )

}