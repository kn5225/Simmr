import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'



function Cook(){
    const navigate = useNavigate()
    const [instructions, setInstructions] = useState([]);
    const [stepNumber, setStepNumber] = useState(0);
    const {id} = useParams()
    useEffect(() => {
        
        fetch(`/api/recipe/${id}/instructions`)
        .then(rec => rec.json())
        .then(rec => setInstructions(rec.message))
        .then(() => setStepNumber(0))
    }, [])
    
return (
    <div>
        <p> Step {stepNumber+1} of {instructions[0]?.steps.length}</p>
        <p>
            {instructions[0]?.steps[stepNumber]?.step}
        </p>
        <button onClick={() => setStepNumber(stepNumber+1)} disabled = {stepNumber === instructions[0]?.steps.length - 1}>Next</button>
        <button onClick={() => setStepNumber(stepNumber-1)} disabled = {stepNumber === 0}>Previous</button>
        <button onClick={() => navigate("/")}>Stop cooking</button>

    </div>)
}

export default Cook