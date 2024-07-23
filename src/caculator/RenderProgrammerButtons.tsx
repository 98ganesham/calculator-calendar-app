import { Button, SimpleGrid } from "@chakra-ui/react";

interface Props{
    handleButtonClick :(value:string)=>void;
}

const RenderProgrammerButtons =({handleButtonClick}:Props)=>{
    return (
        <SimpleGrid columns={{ base: 4, md: 6 }} spacing={2}>
        {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'].map(num => (
          <Button key={num} onClick={() => handleButtonClick(num)} colorScheme="teal">
            {num}
          </Button>
        ))}
        {['AND', 'OR', 'XOR', 'NOT', '<<', '>>'].map(op => (
          <Button key={op} onClick={() => handleButtonClick(op)} colorScheme="teal">
            {op}
          </Button>
        ))}
      </SimpleGrid>
    )
   

}

export default RenderProgrammerButtons;