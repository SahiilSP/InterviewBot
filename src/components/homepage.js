import React from 'react'
import NavBar from './NavBar'
import lp1 from '../images/lp1.png'
import { useLocation } from 'react-router-dom'

const LandingPage = () => {

    const location = useLocation();
    // const login=false;
    // const username = location.state.username;
    // let login = location.state.logged ? true : false;
    const username = localStorage.getItem('username');
    // console.log(username, login);
    return (
        <>
            <NavBar logged={false} />
            <div className='info-sec' style={{ height: '85vh', width: 'auto', display: 'flex', justifyContent: 'space-evenly', padding: '0 1rem', paddingTop: '2rem', gap: '0 2rem', border: '3px solid black',backgroundColor:'rgb(247 250 252 / 1)' }} >
                <img src={lp1} alt='lp1' width='45%' height='90%'></img>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '60%', padding: '2rem' }}>
                    <div style={{ fontSize: '3.8rem' }}> Welcome to Interview Bot</div>
                    <div style={{ fontSize: '2.9rem' }}> Your free online mock interview platform !! </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;