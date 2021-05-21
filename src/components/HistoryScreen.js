import styled from "styled-components";

export default function HistoryScreen() {
    return (
        <>
            <Container>
                <p>Histórico</p>
                <EmptyHistoryText>
                    Em breve você poderá ver o histórico dos seus hábitos aqui!
                </EmptyHistoryText>
            </Container>
        </>
    );
}

const Container = styled.main`
    padding: 28px 17px;
    display: flex;
    flex-direction: column;

    p:first-child {
        color: #126ba5;
        font-size: 23px;
        line-height: 29px;
    }
`;

const EmptyHistoryText = styled.p`
    color: #666666;
    font-size: 18px;
    line-height: 22px;
    margin-top: 17px;
`;
