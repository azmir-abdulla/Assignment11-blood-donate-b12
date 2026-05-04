import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Herosection from "../components/Herosection";



const HomeLayout = () => {
    return (
      <>
        <header>
          <Navbar className="w-11/12"></Navbar>
        </header>

        <Herosection></Herosection>
      </>
    );
};

export default HomeLayout;