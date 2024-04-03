import React from "react";
import '../styles/Login.css';
import Sendo from '../img/Sendo.svg';

export const Login = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="login container-left">
                    <div className="login container-purple">
                        <h1>
                            <img src={Sendo} alt="" />
                            Sendo
                        </h1>
                        <p>¡Bienvenido a tu red social preferida de toda internet!</p>
                    </div>
                </div>
                <div className="login container-right">
                    <form className="login form">
                        <fieldset>
                            <legend>Iniciar Sesión</legend>
                            <label>Correo electrónico:</label>
                            <input type="email" placeholder="Ingresa tu correo electronico" />
                            <label>Contraseña:</label>
                            <input type="password" placeholder="Ingresa tu contraseña" />
                            <label className="login checkbox">
                                <input type="checkbox" value="" />
                                &nbsp; Mantener la sesión iniciada
                            </label>
                            <button type="submit" className="btnLogin">Iniciar Sesión</button>
                            <p className="text-center">¿Aún no te has registrado? <a href="/register">¡Que esperas! Registrate ahora</a> </p>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    );
}