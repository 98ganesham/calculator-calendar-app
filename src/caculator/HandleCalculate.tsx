import { evaluate } from "mathjs";

interface Props{
    mode:string;
    expression:string;
    setResult:React.Dispatch<React.SetStateAction<string>>;
    setHistory:React.Dispatch<React.SetStateAction<{expression:string, result:string}[]>>;
    convertLength:()=>void;
}

const HandleCalculate=({ mode, expression, setResult, setHistory, convertLength }:Props)=>{
    if(mode==="Conversion"){
        convertLength();
    }else{
        try{
            const calculatedResult = evaluate(expression);
            setResult(calculatedResult.toString());
            setHistory(prevHistory =>[...prevHistory,{expression, result:calculatedResult.toString()}]);
        }catch(e){
            setResult('Error');
        }
    }
}

export default HandleCalculate;