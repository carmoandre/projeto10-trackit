import axios from "axios";
import { Checkbox } from "react-ionicons";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

import styled from "styled-components";

export default function TodayHabit({ habit, renderTodayHabitsFromServer }) {
    const { user } = useContext(UserContext);

    function markAsDoneOrnot() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const action = habit.done ? "uncheck" : "check";
        const request = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/${action}`,
            {},
            config
        );

        request.then((response) => {
            renderTodayHabitsFromServer();
        });
        request.catch((error) => {
            alert(
                "Erro ao tentar fazer a marcação da tarefa. Por favor, tente novamente mais tarde"
            );
        });
    }

    return (
        <HabitCard>
            <div>
                <h1>{habit.name}</h1>
                <h2>
                    Sequência atual:{" "}
                    <Sequence habit={habit}>
                        {habit.currentSequence}{" "}
                        {habit.currentSequence > 1 ? "dias" : "dia"}
                    </Sequence>
                </h2>
                <h2>
                    Seu recorde:{" "}
                    <Record habit={habit}>
                        {habit.highestSequence}{" "}
                        {habit.highestSequence > 1 ? "dias" : "dia"}
                    </Record>
                </h2>
            </div>
            <Checkbox
                onClick={markAsDoneOrnot}
                color={habit.done ? "#8FC549" : "#EBEBEB"}
                height="85px"
                width="85px"
            />
        </HabitCard>
    );
}

const HabitCard = styled.div`
    width: 100%;
    background: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0 13px 15px;
    margin-bottom: 10px;

    h1 {
        color: #666666;
        font-size: 19.976px;
        line-height: 25px;
        margin-bottom: 7px;
    }

    h2 {
        color: #666666;
        font-size: 13px;
        line-height: 16px;
    }
`;

const Sequence = styled.span`
    color: ${(props) => (props.habit.done ? "#8FC549" : "#666666")};
`;

const Record = styled.span`
    color: ${(props) =>
        props.habit.currentSequence === props.habit.highestSequence &&
        props.habit.highestSequence > 0
            ? "#8FC549"
            : "#666666"};
`;
