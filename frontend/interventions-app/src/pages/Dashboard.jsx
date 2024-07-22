import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Home from '../components/ui/Home';
import Header from '../components/ui/Header';
import SideNav from '../components/ui/SideNav';
import Footer from '../components/ui/Footer';

export const Dashboard = () => {

  // const [userInfo, setUserInfo] = useState(null)
  // const navigate = useNavigate()

  // const getUserInfo = async () => {
  //   try {
  //     const response = await axiosInstance.get("/get-user");
  //     if (response.data && response.data.user) {
  //       setUserInfo(response.data.user);
  //     }
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       localStorage.clear()
  //       navigate('/login')
  //     }
  //   }
  // }

  // useEffect(()=>{
  //   getUserInfo()
  //   return ()=> {};
  // }, [])

  return (
    <>
    {/* <Navbar userInfo={userInfo}/> */}

      <div className='wrapper'>
        <div class="preloader flex-column justify-content-center align-items-center">
          <img class="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60"/>
        </div>

      <Header/>
      <Home/>
      <SideNav/>
      <Footer/>
      </div>
    </>
  )
}

export default Dashboard