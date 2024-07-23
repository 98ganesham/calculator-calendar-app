import { Box, Container, Heading, Button } from '@chakra-ui/react';
import { useState } from 'react';
import CalendarComponent from './Calendar';
import './App.css';
import Calculator from './caculator/Calculator';

const App = () => {
  const [showCalculator, setShowCalculator] = useState(true);

  const handleShowCalculator = () => {
    setShowCalculator(true);
  };

  const handleShowCalendar = () => {
    setShowCalculator(false);
  };

  return (
    <Container maxW="container.lg" p={4}>
      <Heading as="h1" mb={6} textAlign="center">
        Calculator and Calendar App
      </Heading>
      <Box gap={10}>
        {showCalculator ? <Calculator /> : <CalendarComponent />}
          <Box mt={5}  textAlign="center">
            <Button color="blue.500" onClick={showCalculator ? handleShowCalendar : handleShowCalculator}>
              {showCalculator ? 'Switch to Calendar' : 'Switch to Calculator'}
            </Button>
          </Box>
       
      </Box>
    </Container>
  );
};

export default App;
