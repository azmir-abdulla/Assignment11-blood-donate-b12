import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
// import Footer from "../components/Footer";

const AuthLayout = () => {
    return (
        <>

            <header>
                <Navbar></Navbar>
            </header>


            <main>
                <Outlet
                ></Outlet>
            </main>
{/* 
            <footer>
                <Footer></Footer>
            </footer> */}





        </>
    );
};

export default AuthLayout;