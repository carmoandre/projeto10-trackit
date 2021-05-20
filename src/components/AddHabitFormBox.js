import { useState } from "react";
import styled from "styled-components";

export default function AddHabitFormBox() {
    const [days, setDays] = useState([]);
    const [name, setName] = useState("");

    function selectDay() {}
    return (
        <>
            <HabitFormBox>
                <input
                    placeholder="nome do hábito"
                    value={name}
                    onChange={(e) => setName.target.vaçue}
                />
                <WeekdaysOptions>
                    <div id="1" onClick={selectDay}>
                        D
                    </div>
                    <div id="2" onClick={selectDay}>
                        S
                    </div>
                    <div id="3" onClick={selectDay}>
                        T
                    </div>
                    <div id="4" onClick={selectDay}>
                        Q
                    </div>
                    <div id="5" onClick={selectDay}>
                        Q
                    </div>
                    <div id="6" onClick={selectDay}>
                        S
                    </div>
                    <div id="7" onClick={selectDay}>
                        S
                    </div>
                </WeekdaysOptions>
                <Buttons>
                    <p>Cancelar</p>
                    <button>Salvar</button>
                </Buttons>
            </HabitFormBox>
        </>
    );
}

const HabitFormBox = styled.form`
    background: #ffffff;
    border-radius: 5px;
    width: 100%;
    height: 180px;
    margin-top: 20px;
    padding: 18px;
    display: flex;
    flex-direction: column;

    input {
        padding-left: 11px;
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        border: 1px solid #d5d5d5;
        border-radius: 5px;
        width: 100%;
        height: 45px;
        margin-bottom: 8px;
    }

    input::placeholder {
        color: #dbdbdb;
    }

    & > div:last-child {
        margin-top: auto;
    }
`;

const WeekdaysOptions = styled.div`
    display: flex;

    div {
        background: #fff;
        color: #dbdbdb;
        font-size: 20px;
        line-height: 25px;
        border: 1px solid #d5d5d5;
        border-radius: 5px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 4px;
    }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    P {
        color: #52b6ff;
        font-size: 16px;
        line-height: 20px;
    }

    button {
        width: 84px;
        height: 35px;
        background: #52b6ff;
        border-radius: 5px;
        border: none;
        color: #fff;
        font-size: 16px;
        font-family: "Lexend Deca", sans-serif;
        margin-left: 23px;
    }
`;
