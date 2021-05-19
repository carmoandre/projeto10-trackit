import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import Habit from "./Habit";

export default function Today() {
    const { user } = useContext(UserContext);
    const [habitList, setHabitList] = useState([]);

    useEffect(() => {
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
            console.log("É Aqui");
            //setHabitList(response.data);
        });

        request.catch((error) => {
            console.log(error);
        });
    }, [user, habitList]);

    return (
        <Container>
            <p>Segunda-Feira, 17/05</p>
            <p>Nenhum hábito concluído ainda</p>
            <HabitsHolder>
                <Habit />
                <Habit />
                <Habit />
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
        color: #bababa;
        font-size: 18px;
        line-height: 22px;
    }
`;

const HabitsHolder = styled.div`
    padding-top: 28px;
`;
