import axios from "axios";
import { useState, useContext } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";

export default function AddHabitFormBox({
    showForm,
    setShowForm,
    daysLabels,
    renderHabitsFromServer,
}) {
    const { user } = useContext(UserContext);
    const [name, setName] = useState("");
    const [days, setDays] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [disabled, setDisabled] = useState(false);
    const loadEffect = (
        <Loader type="ThreeDots" color="#fff" height={35} width={62} />
    );

    function selectDay(number) {
        const newSelection = [...days];
        if (days.includes(number)) {
            newSelection[number - 1] = 0;
        } else {
            newSelection[number - 1] = number;
        }
        console.log(newSelection);
        setDays(newSelection);
    }

    function createHabit(event) {
        event.preventDefault();
        if (!isSomeDaySelected() || name === "") {
            alert(
                "Escolha um nome para o hábito e pelo menos um dia para pratica-lo."
            );
            return;
        }

        const body = {
            name,
            days: days.filter((day) => day !== 0),
        };

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            body,
            config
        );

        setDisabled(true);

        request.then((response) => {
            console.log("Sucesso");
            console.log(response.data);
            setName("");
            setDays(days.map((value) => 0));
            setDisabled(false);
            setShowForm(false);
            renderHabitsFromServer();
        });

        request.catch((error) => {
            console.log(error);
            setDisabled(false);
            alert(
                "Não foi possível cadastrar seu hábito. Por favor, verifique o preenchimento dos campos e tente novamente."
            );
        });
    }

    function isSomeDaySelected() {
        return days.find((element) => element !== 0);
    }

    return (
        <>
            <HabitFormBox showForm={showForm} onSubmit={createHabit}>
                <input
                    placeholder="nome do hábito"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={disabled}
                />
                <WeekdaysOptions>
                    {/*tentar com div mas depois pode ser button type="button ou input type="button*/}
                    {daysLabels.map((day, index) => (
                        <Weekday
                            key={index + 1}
                            selected={days[index]}
                            onClick={
                                disabled ? null : () => selectDay(index + 1)
                            }
                        >
                            {day}
                        </Weekday>
                    ))}
                </WeekdaysOptions>
                <Buttons disabled={disabled}>
                    <p onClick={disabled ? null : () => setShowForm(false)}>
                        Cancelar
                    </p>
                    <button disabled={disabled}>
                        {disabled ? loadEffect : "Salvar"}
                    </button>
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
    display: ${(props) => (props.showForm ? "flex" : "none")};
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
        font-size: 20px;
        line-height: 25px;

        border-radius: 5px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 4px;
    }
`;

const Weekday = styled.div`
    background: ${(props) => (props.selected ? "#CFCFCF" : "#fff")};
    color: ${(props) => (props.selected ? "#fff" : "#dbdbdb")};
    border: 1px solid ${(props) => (props.selected ? "#CFCFCF" : "#d5d5d5")};
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
        opacity: ${(props) => (props.disabled ? 0.6 : 1)};
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
