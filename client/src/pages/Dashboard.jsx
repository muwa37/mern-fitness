import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { addWorkout, getDashboardDetails, getWorkouts } from '../api';
import CategoryChart from '../components/cards/CategoryChart';
import Counts from '../components/cards/Counts';
import WeeklyStat from '../components/cards/WeeklyStat';
import Workout from '../components/cards/Workout';
import WorkoutWidget from '../components/WorkoutWidget';
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [workout, setWorkout] = useState('');
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);

  const getDashboardData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('fittrack-app-token');
    await getDashboardDetails(token).then(res => {
      setData(res.data);
      setIsLoading(false);
    });
  };

  const getTodaysWorkout = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('fittrack-app-token');
    await getWorkouts(token, '').then(res => {
      setTodaysWorkouts(res?.data?.todaysWorkouts);
      console.log(res.data);
      setIsLoading(false);
    });
  };

  const addNewWorkout = async () => {
    setButtonLoading(true);
    const token = localStorage.getItem('fittrack-app-token');
    await addWorkout(token, { workoutString: workout })
      .then(res => {
        getDashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch(err => {
        alert(err);
      });
  };

  useEffect(() => {
    getDashboardData();
    getTodaysWorkout();
  }, []);

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
          <WeeklyStat data={data} />
          <CategoryChart data={data} />
          <WorkoutWidget
            workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading}
          />
        </FlexWrap>

        <Section>
          <Title>Todays Workouts</Title>
          <CardWrapper>
            {todaysWorkouts.map(workout => (
              <Workout workout={workout} />
            ))}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
