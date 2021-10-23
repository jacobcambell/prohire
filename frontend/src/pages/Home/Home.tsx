import React from 'react'
import MainNavbar from '../../components/MainNavbar/MainNavbar';
import ProList from './ProList/ProList';
import Footer from '../../components/MainFooter/Footer';

export default function Home() {
    return (
        <div>
            <MainNavbar></MainNavbar>
            <ProList></ProList>
            <Footer></Footer>
        </div>
    )
}
