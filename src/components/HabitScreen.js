import styled from "styled-components";
import AddHabitFormBox from "./AddHabitFormBox.js";

export default function HabitScreen() {
    function addHabit() {}
    return (
        <>
            <Container>
                <div>
                    <p>Meus hábitos</p>
                    <AddButton onClick={addHabit}>+</AddButton>
                </div>
                <AddHabitFormBox></AddHabitFormBox>
                <EmptyListText>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um
                    hábito para começar a trackear!
                </EmptyListText>
                {}
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
