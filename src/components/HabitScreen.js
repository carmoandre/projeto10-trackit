import styled from "styled-components";
import { AddOutline } from "react-ionicons";

export default function HabitScreen() {
    const temp = true;
    return (
        <>
            <Container>
                <div>
                    <p>Meus hábitos</p>
                    <AddButton>+</AddButton>
                </div>
                {}
            </Container>
        </>
    );
}

const Container = styled.main`
    padding: 28px 17px;
    display: flex;
    flex-direction: column;

    div:first-child {
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
