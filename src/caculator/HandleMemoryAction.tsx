interface Props{
    action:string;
    result:string;
    memory: number | null;
    setMemory: (value: number | null | ((prev: number | null) => number | null)) => void;
  setExpression: (value: string | ((prev: string) => string)) => void;
}

const handleMemoryAction=({action,result, memory, setMemory, setExpression}:Props)=>{

  const parsedResult = parseFloat(result);
    switch (action) {
        case 'MC':
          setMemory(null);
          break;
        case 'MR':
          if (memory !== null) {
            setExpression(prev => prev + memory.toString());
          }
          break;
        case 'M+':
          setMemory(prevMemory => (prevMemory !== null ? prevMemory + parsedResult :parsedResult));
          break;
        case 'M-':
          setMemory(prevMemory => (prevMemory !== null ? prevMemory - parsedResult :parsedResult));
          break;
        case 'MS':
          setMemory(parseFloat(result));
          break;
        default:
          break;
      }
}
export default handleMemoryAction;