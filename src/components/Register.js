import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import logo from "../assets/logoVector.svg";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const history = useHistory();
    const loadEffect = (
        <Loader type="ThreeDots" color="#fff" height={45} width={80} />
    );

    function registerUser() {
        if (email === "" || password === "" || name === "" || image === "") {
            alert(
                "Todos os campos são obrigatórios para o cadastro. Por favor, preencha os campos em branco."
            );
            return;
        }

        const body = {
            email,
            name,
            image,
            password,
        };

        const request = axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/auth/sign-up`,
            body
        );

        setDisabled(true);

        request.then((response) => {
            history.push("/");
        });

        request.catch((error) => {
            alert(
                `Não foi possível cadastrar com os dados fornecidos. Tente novamente com outros dados!`
            );
            setDisabled(false);
        });
    }

    return (
        <BlankPage>
            <img src={logo} alt="Vetores que compõe a logo do Track It" />
            <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disabled}
            />
            <input
                type="password"
                placeholder="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disabled}
            />
            <input
                type="text"
                placeholder="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={disabled}
            />
            <input
                type="url"
                placeholder="foto"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled={disabled}
            />
            <OutsideButton onClick={registerUser} disabled={disabled}>
                {disabled ? loadEffect : `Cadastrar`}
            </OutsideButton>
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
        color: #afafaf;
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
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;
