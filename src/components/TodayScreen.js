import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import TodayHabit from "./TodayHabit";

export default function TodayScreen() {
    const { user, setCurrentPercentage } = useContext(UserContext);
    const [donePercentage, setDonePercentage] = useState(0);
    const [habitList, setHabitList] = useState([]);
    const todayDate = {
        weekday: "Segunda-feira",
        dayAndMonth: "17/05",
    };

    useEffect(() => {
        renderTodayHabitsFromServer();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function renderTodayHabitsFromServer() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            config
        );

        request.then((response) => {
            console.log(response.data);
            setHabitList(response.data);
            const newPercentage = calculateDonePercentage(response.data);
            setDonePercentage(newPercentage);
            setCurrentPercentage(newPercentage);
        });

        request.catch((error) => {
            console.log(error);
        });
    }

    function calculateDonePercentage(data) {
        const doneHabits = data.reduce(
            (acc, value) => (value.done ? acc + 1 : acc),
            0
        );
        if (!doneHabits) {
            return 0;
        }
        return parseInt((100 * doneHabits) / data.length);
    }

    return (
        <Container donePercentage={donePercentage}>
            <p>
                {todayDate.weekday}, {todayDate.dayAndMonth}
            </p>
            <p>
                {donePercentage
                    ? `${donePercentage}% dos hábitos concluídos`
                    : "Nenhum hábito concluído ainda"}
            </p>
            <HabitsHolder>
                {habitList.map((habit) => (
                    <TodayHabit
                        key={habit.id}
                        habit={habit}
                        renderTodayHabitsFromServer={
                            renderTodayHabitsFromServer
                        }
                    />
                ))}
            </HabitsHolder>
        </Container>
    );
}

const Container = styled.main`
    padding: 28px 17px;

    p:first-child {
        color: #126ba5;
        font-size: 23px;
        line-height: 29px;
    }

    p:nth-child(2) {
        color: ${(props) => (props.donePercentage ? "#8FC549" : "#bababa")};
        font-size: 18px;
        line-height: 22px;
    }
`;

const HabitsHolder = styled.div`
    padding-top: 28px;
`;
