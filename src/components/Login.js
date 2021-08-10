import axios from "axios";
import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import UserContext from "../contexts/UserContext";
import image from "../assets/logoVector.svg";

export default function Login() {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const history = useHistory();
    const loadEffect = (
        <Loader type="ThreeDots" color="#fff" height={45} width={80} />
    );

    const localStorageUser = localStorage.getItem("user");

    useEffect(() => {
        if (localStorageUser) {
            setUser(JSON.parse(localStorageUser));
            history.push("/hoje");
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function logUser() {
        if (email === "" || password === "") {
            alert("Usuário ou senha não preenchidos.");
            return;
        }

        const body = {
            email,
            password,
        };

        const request = axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
            body
        );

        setDisabled(true);

        request.then((response) => {
            setUser(response.data);
            const stringUser = JSON.stringify(response.data);
            localStorage.setItem("user", stringUser);
            history.push("/hoje");
        });

        request.catch((error) => {
            alert(`Usuário ou senha inválidos!`);
            setDisabled(false);
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
                disabled={disabled}
            />
            <input
                type="password"
                placeholder="senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={disabled}
            />
            <OutsideButton onClick={logUser} disabled={disabled}>
                {disabled ? loadEffect : `entrar`}
            </OutsideButton>
            <Link to="/cadastro">
                <p>Não tem uma conta? Cadastre-se!</p>
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
