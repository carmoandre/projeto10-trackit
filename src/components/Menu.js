import styled from "styled-components";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Menu() {
    const location = useLocation();
    const [percentage, setPercentage] = useState(0);

    return (
        <>
            <BottomDistance />
            <BottomBar location={location}>
                <div>
                    <Link to="/habitos">
                        <p>Hábitos</p>
                    </Link>
                    <p></p>
                    {/* o <p> acima está sendo usado para afastar mais os Hábitos e o histórico entre si*/}
                    <div>
                        <Link to="/hoje">
                            <CircularProgressbar
                                value={percentage}
                                text="Hoje"
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                    backgroundColor: "#52B6FF",
                                    textColor: "#fff",
                                    pathColor: "#fff",
                                    trailColor: "transparent",
                                })}
                            />
                        </Link>
                    </div>
                    <Link to="/historico">
                        <p>Histórico</p>
                    </Link>
                </div>
            </BottomBar>
        </>
    );
}

const BottomBar = styled.footer`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    background: #fff;
    display: ${(props) =>
        props.location.pathname !== "/" ||
        props.location.pathname !== "/cadastro"
            ? "flex"
            : "none"};
    align-items: center;

    div {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #52b6ff;
        font-size: 18px;

        div {
            position: fixed;
            bottom: 10px;
            width: 91px;
            height: 91px;
        }
    }
`;

const BottomDistance = styled.div`
    width: 100%;
    height: 70px;
    background: #fff;
    margin-top: auto;
`;
