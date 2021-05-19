import { Checkbox } from "react-ionicons";
import { useState } from "react";
import styled from "styled-components";

export default function Habit(props) {
    const [checkboxColor, setCheckboxColor] = useState("#EBEBEB");

    function selectHabit() {
        checkboxColor === "#EBEBEB"
            ? setCheckboxColor("#8FC549")
            : setCheckboxColor("#EBEBEB");
    }
    return (
        <HabitCard>
            <div>
                <h1>Ler 1 capítulo de livro</h1>
                <h2>Sequência atual: 5 dias</h2>
                <h2>Seu recorde: 5 dias</h2>
            </div>
            <Checkbox
                onClick={selectHabit}
                color={checkboxColor}
                height="85px"
                width="85px"
            />
        </HabitCard>
    );
}

const HabitCard = styled.div`
    width: 100%;
    height: 94px;
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
