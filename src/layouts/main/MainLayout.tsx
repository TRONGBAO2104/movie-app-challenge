import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './MainLayout.scss'
export interface IMainLayoutProps {
}

export default function MainLayout (props: IMainLayoutProps) {
  return (
    <div className='main-layout'>
      <Header/>
      <div className='main-content'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}
