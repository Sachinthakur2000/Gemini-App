import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const BackendApi = () => {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [genAI, setGenAI] = useState(null);

    useEffect(() => {
        const genAIInstance = new GoogleGenerativeAI('AIzaSyCwWXZzNuVXeU3PHUpATddy-3cgP72Qxnw');
        setGenAI(genAIInstance);
    }, []);

    async function apiRun(gen, prompt) {
        const model = gen.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        return text;
    }

    const handleClick = async () => {
        if (genAI) {
            const result = await apiRun(genAI, userInput);
            setResponse(result);
        }
    };

    return (
        <div className="mycom-">
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your prompt here"
            />
            <button onClick={handleClick}>Get Response</button>
            <p className='generated text'>{response}</p>
        </div>
    );
};

export default BackendApi;
