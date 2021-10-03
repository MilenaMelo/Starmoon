/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
    Backdrop,
    CircularProgress
} from "@material-ui/core";

import './styles.css';
import '../Home/styles.css'
import { Alert } from "@material-ui/lab";

import Home from "../Home";
import TokenContext from "../../contexts/token/TokenContext";
import SubmitButton from '../../components/SubmitButton';
import InputPassword from '../../components/InputPassword';

import useStyles from "../../styles/useStyles";

function EditUser() {
    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [reqError, setReqError] = useState("");
    const { token } = useContext(TokenContext);

    async function updateUser(updateData) {

        try {
            setLoading(true);
            setReqError("");

            const response = await fetch("https://desafio04-backend.herokuapp.com/editarUsuario", {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                body: JSON.stringify(updateData),
                headers: {
                    "Content-type": "application/json",
                    Authorization: token
                },
            });

            const data = await response.json();

            setLoading(false);

            if (response.ok) {
                return history.push("/usuarios");
            }

            setReqError(data);
        } catch (error) {
            setReqError(error.message);
        }
    };

    const closeAlert = () => {
        setReqError("");
    };

    return (
        <div >
            <Home />
            <div className='container-form flex-column modal-form '>
                <form className='form margin-top-modal' onSubmit={handleSubmit(updateUser)}>
                    <a className='align-self-end' href='#close'
                        onClick={() => history.push('/')}
                    >x</a>
                    <div className='text-center mb-lg'>
                        <h4>// EDITAR USUÁRIO</h4>
                    </div>
                    <div className='flex-column  content-center items-center'>
                        <div className='flex-column'>
                            <label htmlFor='name'>Nome</label>
                            <input
                                {...register("nome")}
                                id='name' type="text" />
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='email'>E-mail</label>
                            <input
                                {...register('email', { required: true })}
                                id='email' type="text"
                                placeholder='exemplo@gmail.com'
                            />

                        </div>

                        <InputPassword
                            error={!!errors.senha}
                            register={() => register('senha', { required: true })}
                        />

                        <div className='flex-column'>
                            <label htmlFor='phone'>Telefone</label>
                            <input
                                {...register("telefone")}
                                id='phone' type="text" />
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='cpf'>CPF</label>
                            <input
                                {...register("cpf")}
                                id='cpf' type="text" />
                        </div>

                        {reqError && (
                            <Alert severity="error" onClose={closeAlert}>
                                {reqError}
                            </Alert>
                        )}

                        <SubmitButton
                            label='Editar conta'
                        />

                    </div>
                </form>
            </div>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default EditUser;