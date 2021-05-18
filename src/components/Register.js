import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/logoVector.svg";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");

    function registerUser() {
        const userObject = {
            email,
            name,
            image,
            password,
        };

        const request = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
            userObject
        );

        //desabilitar campos e botão enquanto carrega

        request.then((response) => {
            console.log(response);
            //redirecionar com useHistory para rota"/"
        });

        request.catch((error) => {
            console.log(response);
            //alerta informadndo a falha
            //reabilitação dos campos e botões
        });
    }

    return (
        <BlankPage>
            <img src={image} alt="Vetores que compõe a logo do Track It" />
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="url"
                placeholder="foto"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
            />
            <OutsideButton onClick={registerUser}>Cadastrar</OutsideButton>
            <Link to="/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </BlankPage>
    );
}

const BlankPage = styled.main`
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 5;

    img {
        margin: 68px 0 33px 0;
    }

    input {
        width: 303px;
        height: 45px;
        margin-bottom: 6px;
        border: 1px solid #d5d5d5;
        border-radius: 5px;
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        padding-left: 11px;
    }

    input::placeholder {
        color: #dbdbdb;
    }

    p {
        text-decoration: underline;
        color: #52b6ff;
    }
`;

const OutsideButton = styled.button`
    width: 303px;
    height: 45px;
    background: #52b6ff;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 21px;
    font-family: "Lexend Deca", sans-serif;
    margin-bottom: 25px;
`;
