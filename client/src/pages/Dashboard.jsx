import React from 'react';
import styled from 'styled-components';
import Counts from '../components/cards/Counts';
import WeeklyStat from '../components/cards/WeeklyStat';
import { counts } from '../utils/data';

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map(item => (
            <Counts item={item} />
          ))}
        </FlexWrap>
        <FlexWrap>
          <WeeklyStat />
        </FlexWrap>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
