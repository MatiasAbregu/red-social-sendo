import React, { useState } from "react";
import '../styles/Login.css';
import Sendo from '../img/Sendo.svg';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import UserService from '../services/UserService'

export const Login = () => {

    const schema = yup.object().shape({
        email: yup.string().required("Debes rellenar este campo."),
        password: yup.string().required("Debes rellenar este campo.")
    });

    const [numError, setNumError] = useState(0);
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        UserService.login(data)
            .then(r => {
                if (r.data) {
                    console.log(r.data);
                    setNumError(0);
                }
            })
            .catch(e => {
                if (e.response.status == 403) setNumError(1);
                else setNumError(2);
            });
    }

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
                    <form className="login form" onSubmit={handleSubmit(data => onSubmit(data))}>
                        <fieldset>
                            <legend>Iniciar Sesión</legend>
                            <div className={errors.email?.message ? "login inputContainer error" : "login inputContainer"}>
                                <label>Correo electrónico:</label>
                                <input type="email" placeholder="Ingresa tu correo electronico" {...register("email")} />
                                {errors.email && <p>{errors.email?.message}</p>}
                            </div>
                            <div className={errors.password?.message ? "login inputContainer error" : "login inputContainer"}>
                                <label>Contraseña:</label>
                                <input type="password" placeholder="Ingresa tu contraseña" {...register("password")} />
                                {errors.password && <p>{errors.password?.message}</p>}
                            </div>
                            <label className="login checkbox">
                                <input type="checkbox" />
                                &nbsp; Mantener la sesión iniciada
                            </label>
                            {numError == 0 ? <></> : numError == 1 ? <p className="login msgError">¡Email o contraseña incorrectos!</p> 
                            : <p className="login msgError">¡Ese email no está registrado aún!</p>}
                            <button type="submit" className="btnLogin">Iniciar Sesión</button>
                            <p className="text-center">¿Aún no te has registrado? <a href="/register">¡Que esperas! Registrate ahora</a> </p>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    );
}