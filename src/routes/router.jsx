import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../layouts/HomeLayout';
import Home from '../pages/Home';
import AuthLayout from "../Layouts/AuthLayout";
import Login from '../pages/Login';
import Register from '../pages/Register';
import UserProfile from "../pages/UserProfile";;
import Error from '../pages/Error';
import PrivateRoute from '../providers/PrivateRoute';
import DonationRequest from '../pages/DonationRequest';
import Funding from '../pages/Funding';
import { Search } from 'lucide-react';
import Searchblood from '../pages/Searchblood';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/userprofile",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/donation-request",
    element: (
      <PrivateRoute>
        <DonationRequest></DonationRequest>
      </PrivateRoute>
    ),
  },
  {
    path: "/funding-request",
    element: (
      <PrivateRoute>
        <Funding></Funding>
      </PrivateRoute>
    ),
  },
  {
    path:"/search-blood",
    element: (
      <Searchblood></Searchblood>
    )
  },

  {
    path: "*",
    element: <Error></Error>,
  },
 
]);
        
export default router;