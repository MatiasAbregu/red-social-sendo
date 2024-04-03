import React from "react";
import { Navbar } from '../components/Navbar';

export const Home = () => {
    if (sessionStorage.getItem('token')) {
        return (
            <>
                <Navbar />
            </>
        );
    } else window.location.href = "/login"; 
}