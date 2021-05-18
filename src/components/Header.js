import styled from "styled-components";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Header() {
    const { user } = useContext(UserContext);
    const location = useLocation();
    console.log(user);

    return (
        <>
            <TopBar location={location}>
                <div>
                    <p>TrackIt</p>
                    <img src={user.image} alt="imagem do usuário" />
                </div>
            </TopBar>
            <TopDistance />
        </>
    );
}

const TopBar = styled.header`
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    background: #126ba5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: ${(props) =>
        props.location.pathname !== "/" ||
        props.location.pathname !== "/cadastro"
            ? "flex"
            : "none"};
    align-items: center;

    div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px;

        p {
            font-family: "Playball", cursive;
            font-size: 39px;
            line-height: 49px;
            color: #fff;
        }

        img {
            background: #fff;
            border-radius: 99px;
            width: 51px;
            height: 51px;
        }
    }
`;

const TopDistance = styled.div`
    width: 100%;
    height: 70px;
`;
