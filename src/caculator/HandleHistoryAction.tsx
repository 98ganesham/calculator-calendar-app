interface Props{
    action:string;
    index?:number;
    history:{expression:string; result:string}[];
    setHistory:React.Dispatch<React.SetStateAction<{expression:string, result:string}[]>>;
    setExpression:React.Dispatch<React.SetStateAction<string>>;
    setResult:React.Dispatch<React.SetStateAction<string>>
}

const HandleHistoryAction=({action,index, history, setHistory, setExpression, setResult}:Props)=>{
if(index !== undefined){
    switch(action){
        case 'reuse':
            setExpression(history[index].expression);
            setResult('');
            break;
            case 'remove':
            setHistory(prevHistory =>prevHistory.filter((_,i)=>i !== index));
            break
            default:
                break;
    }

}else if(action ==='clear'){
    setHistory([]);

}
}

export default HandleHistoryAction;