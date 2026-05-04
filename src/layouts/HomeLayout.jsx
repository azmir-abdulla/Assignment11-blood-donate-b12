import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';



const HomeLayout = () => {
    return (
      <>
        <header>
            <Navbar className="w-11/12"></Navbar>
        </header>
       
      </>
    );
};

export default HomeLayout;