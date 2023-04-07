import NoteContext from '../context/noteContext';
import React, { useContext } from "react";
import NotePage from './NotePage'
import AuthPage from './AuthPage'
import loadingIcon1 from './loader/load.gif'
import loadingIcon2 from './loader/load3.gif'
export default function Home() {
    const context = useContext(NoteContext)
    const { authToken, loading,theme } = context
    return (
        <>
            <div className={`${theme}`}>
            {loading &&
                <div className='load'>
                    <img src={theme === 'dark' ? loadingIcon1 : loadingIcon2} alt="loading" />
                </div>}
            {authToken ? <NotePage /> : <AuthPage />}
            </div>
        </>
    );
}
