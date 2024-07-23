import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Select,
  Text,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Stack
} from '@chakra-ui/react';
import HandleCalculate from './HandleCalculate';
import CalculateDateDifference from './CalculateDateDifference';
import RenderStandardButtons from './RenderStandardButtons';
import HandleMemoryAction from './HandleMemoryAction';
import RenderProgrammerButtons from './RenderProgrammerButtons';
import HandleHistoryAction from './HandleHistoryAction';

const Calculator: React.FC = () => {
  const [mode, setMode] = useState<string>('Standard');
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);
  const [memory, setMemory] = useState<number | null>(null);
  const [fromUnit, setFromUnit] = useState<string>('km');
  const [toUnit, setToUnit] = useState<string>('mi');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const { isOpen, onClose } = useDisclosure();

  const lengthUnits = [
    'nanometers',
    'micrometers',
    'millimeters',
    'centimeters',
    'meters',
    'kilometers',
    'miles',
    'yards',
    'feet',
    'inches'
  ];
 const convertLength = () => {
   setResult(`Converting from ${fromUnit} to ${toUnit}`);
  };

  const handleButtonClick = (value: string) => {
    setExpression(prev => prev + value);
  };

  const handleCalculate = () => {
    HandleCalculate({mode, expression, setResult, setHistory, convertLength});
  };

  

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(event.target.value);
    setExpression('');
    setResult('');
  };

  const calculateDateDifference = () => {
   CalculateDateDifference({fromDate, toDate, setResult});
  };

  const renderNumberButtons = () => (
    <SimpleGrid columns={{ base: 3, md: 4 }} spacing={2}>
      {[...Array(9).keys()].map(num => (
        <Button key={num + 1} onClick={() => handleButtonClick((num + 1).toString())} colorScheme="teal">
          {num + 1}
        </Button>
      ))}
      <Button onClick={() => handleButtonClick('0')} colorScheme="teal">0</Button>
      <Button onClick={() => handleButtonClick('.')} colorScheme="teal">.</Button>
    </SimpleGrid>
  );

  const renderStandardButtons = () => (
    <RenderStandardButtons
      handleButtonClick={handleButtonClick}
      handleCalculate={handleCalculate}
      handleClear={handleClear}
      handleMemoryAction={(action) => HandleMemoryAction({ action, result, memory, setMemory, setExpression })}
    />
  );

  const renderScientificButtons = () => (
    <>
      <SimpleGrid columns={{ base: 3, md: 5 }} spacing={4} mb={4}>
        {['sin(', 'cos(', 'tan(', 'log(', 'sqrt(', '^'].map(op => (
          <Button key={op} onClick={() => handleButtonClick(op)} colorScheme="teal">{op}</Button>
        ))}
      </SimpleGrid>
      {renderNumberButtons()}
      <Button mt={2} w="full" colorScheme="teal" onClick={handleCalculate}>Calculate</Button>
      <Button mt={2} w="full" colorScheme="red" onClick={handleClear}>AC</Button>
    </>
  );

  const renderProgrammerButtons = () => (
    <RenderProgrammerButtons handleButtonClick={handleButtonClick} />
  );

  const renderDateCalculationButtons = () => (
    <>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={4}>
      <Box>
        
          <Text mb={2}>From Date</Text>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            colorScheme="teal"
          />
        </Box>
        <Box>
          <Text mb={2}>To Date</Text>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            colorScheme="teal"
          />
        </Box>
      </SimpleGrid>
      <Button mt={2} w="full" colorScheme="teal" onClick={calculateDateDifference}>
        Calculate Difference
      </Button>
     
      
    </>
  );

  const renderConversionButtons = () => (
    <>
      <SimpleGrid borderRadius={"5px"} columns={{ base: 2, md: 4 }} spacing={4} mb={4}>
        <Select
        textAlign="center"
        
          _focus={{ boxShadow: "none", borderColor: "teal.500" }}
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          colorScheme="teal"
          placeholder="From Unit"
        >
          {lengthUnits.map(unit => <option style={{textAlign:"center" ,border:"none",  }}  key={unit} value={unit}>{unit}</option>)}
        </Select>
        <Select
          _focus={{ boxShadow: "none", borderColor: "teal.500" }}
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          colorScheme="teal"
          placeholder="To Unit"
        >
          {lengthUnits.map(unit => <option key={unit} value={unit}>{unit}</option>)}
        </Select>
      </SimpleGrid>
      {renderNumberButtons()}
      <Button mt={2} w="full" colorScheme="teal" onClick={handleCalculate}>Calculate</Button>
      <Button mt={2} w="full" colorScheme="red" onClick={handleClear}>AC</Button>
    </>
  );

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      p={4}
      mx="auto"
      maxWidth={{ base: '100%', md: '80%', lg: '60%' }}
      gap={4}
    >
      <Box
        flex="1"
        pr={{ base: 0, md: 4 }}
        mb={{ base: 4, md: 0 }}
        width={{ base: '100%', md: 'auto' }}
        height="auto"
        bg="#f5f5f5"
        borderRadius="md"
        boxShadow="md"
        p={4}
      >
        <Select
          value={mode}
          onChange={handleModeChange}
          backgroundColor="#f5d0ca"
          border="none"
          _focus={{ borderColor: "#f5d0ca", boxShadow: "none" }}
          mb={4}
          variant="filled"
        >
          <option value="Standard">Standard</option>
          <option value="Scientific">Scientific</option>
          <option value="Programmer">Programmer</option>
          <option value="Date Calculation">Date Calculation</option>
          <option value="Conversion">Conversion</option>
        </Select>
        <Box mb={4} p={4} borderRadius="md" border="1px solid black" bg="#ffffff" boxShadow="md">
          <Text fontSize="lg" fontWeight="bold" mb={2}>History</Text>
          {history.length === 0 ? (
            <Text>No history available.</Text>
          ) : (
            <Stack spacing={2}>
              {history.map((entry, index) => (
                <Box key={index} borderWidth="1px" borderRadius="md" p={2}>
                  <Text>{entry.expression} = {entry.result}</Text>
                  <Stack direction="row" spacing={2} mt={2}>
                    <Button size="sm" onClick={() => HandleHistoryAction({ action: 'reuse', index, history, setHistory, setExpression, setResult })} colorScheme="teal">Reuse</Button>
                    <Button size="sm" onClick={() => HandleHistoryAction({ action: 'remove', index, history, setHistory, setExpression, setResult })} colorScheme="red">Remove</Button>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
          <Button mt={2} colorScheme="red" onClick={() => HandleHistoryAction({ action: 'clear', history, setHistory, setExpression, setResult })}>Clear History</Button>
        </Box>
      </Box>

      {/* Right Side: Calculator and History */}
      <Box width="100%" height="fit-content">
        <Box
          mb={4}
          p={4}
          border="1px solid gray"
          borderRadius="md"
          bg="#ffffff"
          boxShadow="md"
        >
          <Input
            value={expression}
            size="md"
            _focusVisible={{ outline: "none" }}
            placeholder="Enter expression"
            onChange={(e) => setExpression(e.target.value)}
            autoFocus
            mb={4}
          />
          <Text mb={2} fontSize="lg" textAlign="right">
            {result}
          </Text>
          <Box mb={4}>
            {mode === 'Standard' && renderStandardButtons()}
            {mode === 'Scientific' && renderScientificButtons()}
            {mode === 'Programmer' && renderProgrammerButtons()}
            {mode === 'Date Calculation' && renderDateCalculationButtons()}
            {mode === 'Conversion' && renderConversionButtons()}
          </Box>
        </Box>
      </Box>

      {/* Date Selection Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Date</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          
            <Text>Coming soon...</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Calculator;
