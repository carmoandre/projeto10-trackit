import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { TrashOutline } from "react-ionicons";
import AddHabitFormBox from "./AddHabitFormBox.js";

export default function HabitScreen() {
    const { user } = useContext(UserContext);
    const [habitsList, setHabitsList] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const daysLabels = ["D", "S", "T", "Q", "Q", "S", "S"];

    useEffect(() => {
        renderHabitsFromServer();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function renderHabitsFromServer() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/habits`,
            config
        );

        request.then((response) => {
            setHabitsList(response.data);
        });

        request.catch((error) => {
            alert(
                "Erro ao tentar carregar os habitos cadastrados. Tente novamente mais tarde."
            );
        });
    }

    function removeHabit(habitID, habitName) {
        if (!window.confirm("Voce realmente quer apagar o hábito?")) {
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.delete(
            `${process.env.REACT_APP_API_BASE_URL}/habits/${habitID}`,
            config
        );

        request.then((response) => {
            renderHabitsFromServer();
            setTimeout(() => {
                alert(`Hábito "${habitName}" apagado com sucesso!`);
            }, 500);
        });

        request.catch((error) => {
            alert(
                "Erro ao tentar apagar um hábito. Tente novamente mais tarde."
            );
        });
    }

    return (
        <>
            <Container>
                <div>
                    <p>Meus hábitos</p>
                    <AddButton onClick={() => setShowForm(true)}>+</AddButton>
                </div>
                <AddHabitFormBox
                    showForm={showForm}
                    setShowForm={setShowForm}
                    daysLabels={daysLabels}
                    renderHabitsFromServer={renderHabitsFromServer}
                />
                {habitsList.length === 0 ? (
                    <EmptyListText>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um
                        hábito para começar a trackear!
                    </EmptyListText>
                ) : (
                    habitsList.map((habit) => (
                        <HabitBox key={habit.id}>
                            <RemoveHabitButton>
                                <TrashOutline
                                    color={"#666666"}
                                    height="15px"
                                    width="15px"
                                    onClick={() =>
                                        removeHabit(habit.id, habit.name)
                                    }
                                />
                            </RemoveHabitButton>
                            <p>{habit.name}</p>
                            <WeekdaysHolder>
                                {daysLabels.map((day, index) => (
                                    <Day
                                        key={index + 1}
                                        selected={habit.days.includes(index)}
                                    >
                                        {day}
                                    </Day>
                                ))}
                            </WeekdaysHolder>
                        </HabitBox>
                    ))
                )}
            </Container>
        </>
    );
}

const Container = styled.main`
    padding: 28px 17px;
    display: flex;
    flex-direction: column;

    & > div:first-child {
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
            color: #126ba5;
            font-size: 23px;
            line-height: 29px;
        }
    }

    & > div:nth-child(3) {
        margin-top: 20px;
    }
`;

const AddButton = styled.button`
    width: 40px;
    height: 35px;
    background: #52b6ff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-size: 30px;
    color: #fff;
`;

const EmptyListText = styled.p`
    color: #666666;
    font-size: 18px;
    line-height: 22px;
    margin-top: 28px;
`;

const HabitBox = styled.div`
    background: #ffffff;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 10px;
    padding: 11px 10px 15px 15px;
    display: flex;
    flex-direction: column;
    position: relative;

    & > p {
        color: #666666;
        font-size: 20px;
        line-height: 25px;
    }
`;

const WeekdaysHolder = styled.div`
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
        margin: 8px 4px 0 0;
    }
`;

const Day = styled.div`
    background: ${(props) => (props.selected ? "#CFCFCF" : "#fff")};
    color: ${(props) => (props.selected ? "#fff" : "#dbdbdb")};
    border: 1px solid ${(props) => (props.selected ? "#CFCFCF" : "#d5d5d5")};
`;

const RemoveHabitButton = styled.div`
    position: absolute;
    top: 11px;
    right: 10px;
`;
