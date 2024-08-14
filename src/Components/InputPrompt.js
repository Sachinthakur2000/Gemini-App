import React, { useState, useRef, useEffect } from "react";
import { RichTextarea } from "rich-textarea";
import SendIcon from '@mui/icons-material/Send';
import NormalText from "./NormalText";
import { GoogleGenerativeAI } from '@google/generative-ai';

const InputPrompt = () => {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [genAI, setGenAI] = useState(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [text]);

    useEffect(() => {
        const genAIInstance = new GoogleGenerativeAI('AIzaSyCwWXZzNuVXeU3PHUpATddy-3cgP72Qxnw');
        setGenAI(genAIInstance);
    }, []);

    const handleInput = (e) => {
        setText(e.target.value);
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        setIsTyping(e.target.value.length > 0);
    };

    async function apiRun(gen, prompt) {
        const model = gen.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        return text;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (genAI && text) {
            const result = await apiRun(genAI, text);
            setResponse(result);
            setText("");  // Clear the textarea after submission
        }
    };

    return (
        <div className="gemini-prompt-area">
            <div className="prompt-inner">
                <form className="prompt-form" onSubmit={handleSubmit}>
                    <RichTextarea
                        ref={textareaRef}
                        placeholder="Enter a prompt here"
                        value={text}
                        onChange={handleInput}
                        onInput={handleInput}
                        className="full-width-textarea"
                        style={{ overflow: "hidden", resize: "none" }}
                    />
                    <button type="submit" className={`text-genrate-btn ${isTyping ? "btn-enabled" : ""}`}>
                        <SendIcon />
                    </button>
                </form>
                <NormalText />
                {response && <p className='generated-text'>{response}</p>}
            </div>
        </div>
    );
};

export default InputPrompt;
