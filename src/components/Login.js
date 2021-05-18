import styled from "styled-components";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <BlankPage>
            <img
                src="../assets/Group 8.svg"
                alt="Vetores que compõe a logo do Track It"
            />
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
            <OutsideButton>Entrar</OutsideButton>
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
    input {
        width: 303px;
        height: 45px;
        margin-bottom: 6px;
        border: 1px solid #d5d5d5;
        border-radius: 5px;
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
`;
