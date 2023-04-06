import NoteContext from '../context/noteContext';
import React, { useContext } from "react";
import NotePage from './NotePage'
import AuthPage from './AuthPage'
import loadingIcon from './loader/load.gif'
export default function Home() {
    const context = useContext(NoteContext)
    const { authToken, loading } = context
    return (
        <>
            {loading &&
                <div className='load'>
                    <img src={loadingIcon} alt="loading" />
                </div>}
            {authToken ? <NotePage /> : <AuthPage />}
        </>
    );
}
