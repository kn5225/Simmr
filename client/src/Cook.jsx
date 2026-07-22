import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'



function Cook(){
    const navigate = useNavigate()
    const [instructions, setInstructions] = useState([]);
    const [stepNumber, setStepNumber] = useState(0);
    const [time, setTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const {id} = useParams()
    useEffect(() => {
        fetch(`/api/recipe/${id}/instructions`)
        .then(rec => rec.json())
        .then(rec => setInstructions(rec.message))
        .then(() => setStepNumber(0))}, [])
    useEffect(() => {
        if (instructions[0]?.steps[stepNumber]?.length){
            setIsTimerRunning(true)
            if (instructions[0]?.steps[stepNumber]?.length?.unit == "minutes"){
                setTime(instructions[0]?.steps[stepNumber]?.length?.number * 60)}
            else if (instructions[0]?.steps[stepNumber]?.length?.unit == "hours"){
                setTime(instructions[0]?.steps[stepNumber]?.length?.number * 3600)}}
        else { 
            setIsTimerRunning(false)}
        }, [stepNumber])
    useEffect(() => {
        let handle
        if (isTimerRunning) {
                handle = setInterval(() => {
                    setTime(prev => { if (prev<=1) { 
                        clearInterval(handle); 
                        setIsTimerRunning(false);
                        return 0;} 
                        return prev -1;})
            }, 1000)
                }
        else { return }
        return () => {clearInterval(handle)}
            }
    , [isTimerRunning])
    return (
        <div>
            <p> Step {stepNumber+1} of {instructions[0]?.steps.length}</p>
            <p>{instructions[0]?.steps[stepNumber]?.step}</p>
            <button onClick={() => setStepNumber(stepNumber+1)} disabled = {stepNumber === instructions[0]?.steps.length - 1}>Next</button>
            <button onClick={() => setStepNumber(stepNumber-1)} disabled = {stepNumber === 0}>Previous</button>
            <button onClick={() => navigate("/")}>Stop cooking</button>
            {time>0 && <button onClick={() => {setIsTimerRunning(!isTimerRunning)}}>{isTimerRunning ? "Pause" : "Resume"}</button>}
            {isTimerRunning && time > 0 && <p>{Math.floor(time/60)} : {String(time%60).padStart(2, "0")}</p>}

        </div>)}
export default Cook