import { Button, SimpleGrid } from "@chakra-ui/react";

interface Props{
    handleButtonClick:(value:string)=>void;
}

 const RenderNumberButtons=({handleButtonClick}:Props)=>{
    return (
               <SimpleGrid columns={{ base: 3, md: 4 }} spacing={2}>
      {[...Array(9).keys()].map(num => (
        <Button key={num + 1} onClick={() => handleButtonClick((num + 1).toString())} colorScheme="teal">
          {num + 1}
        </Button>
      ))}
      <Button onClick={() => handleButtonClick('0')} colorScheme="teal">0</Button>
      <Button onClick={() => handleButtonClick('.')} colorScheme="teal">.</Button>
    </SimpleGrid>
    )

    
}

export default RenderNumberButtons;