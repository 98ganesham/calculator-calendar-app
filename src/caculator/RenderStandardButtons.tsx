import { Button, SimpleGrid } from "@chakra-ui/react"
import RenderNumberButtons from "./RenderNumberButtons";

interface Props{
    handleButtonClick :(value:string)=>void;
    handleCalculate:()=>void;
    handleClear:()=>void;
    handleMemoryAction:(action:string)=>void;
}
const RenderStandardButtons =({handleButtonClick,handleCalculate,handleClear,handleMemoryAction}:Props)=>{
    return (
        <>
        <SimpleGrid columns={{ base: 3, md: 5 }} mb={4} spacing={4}>
        {['MC', 'MR', 'M+', 'M-', 'MS'].map(action => (
          <Button key={action} onClick={() => handleMemoryAction(action)} colorScheme="blue">{action}</Button>
        ))}
      </SimpleGrid>
      <RenderNumberButtons handleButtonClick={handleButtonClick} />
      <SimpleGrid columns={{ base: 3, md: 4 }} mt={2} spacing={4}>
        {['+', '-', '*', '/'].map(op => (
          <Button key={op} onClick={() => handleButtonClick(op)} colorScheme="teal">{op}</Button>
        ))}
      </SimpleGrid>
      <Button mt={2} w="full" colorScheme="teal" onClick={handleCalculate}>Calculate</Button>
      <Button mt={2} w="full" colorScheme="red" onClick={handleClear}>AC</Button>
      </>
    )
   
 
}

export default RenderStandardButtons;