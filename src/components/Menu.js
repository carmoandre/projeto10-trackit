import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Menu() {
    const location = useLocation();
    const percentage = 0;

    return (
        <>
            <BottomBar location={location}>
                <div>
                    <p>Hábitos</p>
                    <p></p>{" "}
                    {/*usado para afastar mais os Hábitos e o histórico entre si*/}
                    <div>
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
                    </div>
                    <p>Histórico</p>
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
            position: absolute;
            bottom: 10px;
            width: 91px;
            height: 91px;
        }
    }
`;
