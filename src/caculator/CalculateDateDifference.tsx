import { differenceInDays } from "date-fns";

interface Props{
    fromDate:string;
    toDate:string;
    setResult:React.Dispatch<React.SetStateAction<string>>;

}

const CalculateDateDifference=({fromDate, toDate, setResult}:Props)=>{
    if(fromDate && toDate){
        const diff= differenceInDays(new Date(toDate),new Date(fromDate));
        setResult(`Difference: ${diff} days`);

    }else{
        setResult(`Please select both dates`);
    }

}

export default CalculateDateDifference;