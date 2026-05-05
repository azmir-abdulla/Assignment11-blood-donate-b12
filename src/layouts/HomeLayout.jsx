import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Herosection from "../components/Herosection";
import Counting from '../components/Counting';



const HomeLayout = () => {
    return (
      <>
        <header>
          <Navbar className="w-11/12"></Navbar>
        </header>

        <Herosection></Herosection>
        <Counting></Counting>
        {/* If there's an Outlet intended for HomeLayout, it should go here. But assuming it's just the landing page for now */}
        <Outlet />
      </>
    );
};

export default HomeLayout;