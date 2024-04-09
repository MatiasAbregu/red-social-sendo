import React, { useState } from "react";
import Sendo from '../img/Sendo.svg';
import '../styles/Register.css';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs, { } from 'dayjs';
import UserService from "../services/UserService";

export const Register = () => {

    const schema = yup.object().shape({
        firstName: yup.string().required("Debes rellenar este campo."),
        lastName: yup.string().required("Debes rellenar este campo."),
        birthdate: yup.date().max(new Date(), "Ingresa una fecha válida.").required("Debe registrar una fecha.").typeError("Debe registrar una fecha."),
        genre: yup.string().oneOf(["man", "woman", "other"], "Debes escoger un género.").default("man").required("Debes escoger un género."),
        email: yup.string().email("Debe contener un @").required("Debes rellenar este campo."),
        username: yup.string().required("Debes rellenar este campo."),
        password: yup.string().min(5, "La contraseña debe tener mínimo 5 caracteres.").required("Debes rellenar este campo.")
    });

    const [step, setStep] = useState(1);
    const [complete, setComplete] = useState(false);

    const moveStep = (stepNumber) => {
        if (stepNumber == 2) {
            if (getValues("firstName") && getValues("lastName")) setStep(stepNumber);
            else return;
        } else if (stepNumber == 3) {
            if (getValues("firstName") && getValues("lastName") && getValues("birthdate") && getValues("genre")) setStep(stepNumber);
            else return;
        } else setStep(stepNumber);
    }

    const onSubmit = (data) => {
        data.birthdate = dayjs(data.birthdate).format("YYYY-MM-DD");

        UserService.register(data)
            .then(r => { if (r.data) setComplete(true); })
            .catch(() => {
                setError("email", { message: "Ese email ya está registrado." }, { shouldFocus: true });
            });
    }

    const { register, handleSubmit, formState: { errors }, setValue, getValues, trigger, setError } =
        useForm({ resolver: yupResolver(schema), defaultValues: { firstName: '', lastName: '', birthdate: '', genre: 'man', email: '', username: '', password: '' } });

    return (
        <>
            <div className="container-fluid">
                <div className="register container-left">
                    <div className="register container-purple">
                        <h1>
                            <img src={Sendo} alt="" />
                            Sendo
                        </h1>
                        <p>¿Qué esperas para ponerte en contacto con tus amigos? Registrate ahora ¡Es totalmente gratis!</p>
                    </div>
                </div>
                <div className="register container-right">
                    <form className="register form" onSubmit={handleSubmit(data => onSubmit(data))}>
                        <fieldset>
                            {complete ?
                                <>
                                    <legend>¡Registro éxitoso!</legend>
                                    <p className="register successIcon">✓</p>
                                    <p className="register successText">¡Felicidades, has creado tu cuenta con éxito! <br /> Ya puedes: <a href="/login">Iniciar Sesión</a></p>
                                </> :
                                <>
                                    <legend>Registrarse</legend>
                                    {step === 1 ?
                                        <>
                                            <div className="register steps-container">
                                                <span className="register spnActive" onClick={() => moveStep(1)}>1</span>
                                                <span></span>
                                                <span onClick={() => moveStep(2)}>2</span>
                                                <span></span>
                                                <span onClick={() => moveStep(3)}>3</span>
                                            </div>
                                            <div className={errors.firstName?.message ? "register inputContainer error" : "register inputContainer"}>
                                                <label>Ingrese su nombre completo:</label>
                                                <input type="text" value={getValues("firstName")} placeholder="Ingresa tu nombre" onChange={
                                                    (e) => { setError("firstName", false); setValue("firstName", e.target.value); }} />
                                                {errors.firstName && <p>{errors.firstName?.message}</p>}
                                            </div>
                                            <div className={errors.lastName?.message ? "register inputContainer error" : "register inputContainer"}>
                                                <label>Ingrese su apellido:</label>
                                                <input type="text" value={getValues("lastName")} placeholder="Ingresa tu apellido" onChange={
                                                    (e) => { setError("lastName", false); setValue("lastName", e.target.value) }} />
                                                {errors.lastName && <p>{errors.lastName?.message}</p>}
                                            </div>
                                            <button type="button" className="btnRegister" onClick={async () => {
                                                await trigger("firstName");
                                                await trigger("lastName");
                                                moveStep(2);
                                            }}>Siguiente</button>
                                        </> : step === 2 ?
                                            <>
                                                <div className="register steps-container">
                                                    <span className="register spnActive" onClick={() => moveStep(1)}>✓</span>
                                                    <span className="register lineCompleted"></span>
                                                    <span className="register spnActive" onClick={() => moveStep(2)}>2</span>
                                                    <span></span>
                                                    <span onClick={() => moveStep(3)}>3</span>
                                                </div>
                                                <div className={errors.birthdate?.message ? "register inputContainer error" : "register inputContainer"}>
                                                    <label>Selecciona tu fecha de nacimiento:</label>
                                                    <input type="date" value={getValues("birthdate")} className="register btnDate" onChange={
                                                        (e) => { setError("birthdate", false); setValue("birthdate", e.target.value) }} />
                                                    {errors.birthdate && <p>{errors.birthdate?.message}</p>}
                                                </div>
                                                <label>Selecciona tu sexo:</label>
                                                <div className="register selectBox">
                                                    <select className="register selectGender" {...register("genre")}>
                                                        <option value={"man"}>Hombre</option>
                                                        <option value={"woman"}>Mujer</option>
                                                        <option value={"other"}>Otro</option>
                                                    </select>
                                                </div>
                                                <button type="button" className="btnRegister" onClick={async () => {
                                                    await trigger("firstName");
                                                    await trigger("lastName");
                                                    await trigger("birthdate");
                                                    await trigger("genre");
                                                    if (!errors.birthdate && !errors.genre) moveStep(3);
                                                }}>Siguiente</button>
                                            </> :
                                            <>
                                                <div className="register steps-container">
                                                    <span className="register spnActive" onClick={() => moveStep(1)}>✓</span>
                                                    <span className="register lineCompleted"></span>
                                                    <span className="register spnActive" onClick={() => moveStep(2)}>✓</span>
                                                    <span className="register lineCompleted"></span>
                                                    <span className="register spnActive" onClick={() => moveStep(3)}>3</span>
                                                </div>
                                                <div className={errors.email?.message ? "register inputContainer error" : "register inputContainer"}>
                                                    <label>Ingrese un correo electrónico:</label>
                                                    <input type="email" value={getValues("email")} placeholder="Ingresa un correo electronico" onChange={
                                                        (e) => { setError("email", false); setValue("email", e.target.value) }} />
                                                    {errors.email && <p>{errors.email?.message}</p>}
                                                </div>
                                                <div className={errors.username?.message ? "register inputContainer error" : "register inputContainer"}>
                                                    <label>Ingrese un nombre de usuario:</label>
                                                    <input type="text" value={getValues("username")} placeholder="Ingresa tu nombre de usuario" onChange={
                                                        (e) => { setError("username", false); setValue("username", e.target.value) }} />
                                                    {errors.username && <p>{errors.username?.message}</p>}
                                                </div>
                                                <div className={errors.password?.message ? "register inputContainer error" : "register inputContainer"}>
                                                    <label>Ingrese una contraseña:</label>
                                                    <input type="password" value={getValues("password")} placeholder="Ingresa una contraseña" onChange={
                                                        (e) => { setError("password", false); setValue("password", e.target.value) }} />
                                                    {errors.password && <p>{errors.password?.message}</p>}
                                                </div>
                                                <button type="button" className="btnRegister" onClick={handleSubmit(async () => {
                                                    await trigger("firstName");
                                                    await trigger("lastName");
                                                    await trigger("birthdate");
                                                    await trigger("genre");
                                                    await trigger("email");
                                                    await trigger("username");
                                                    await trigger("password");
                                                    if (!errors.email?.message && !errors.username?.message && !errors.password?.message) onSubmit(getValues());
                                                })}>Crear cuenta</button>
                                            </>}
                                    <p className="text-center">¿Ya estás registrado? <a href="/login">¡Que esperas! Inicia sesión</a> </p>
                                </>}
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    );
}