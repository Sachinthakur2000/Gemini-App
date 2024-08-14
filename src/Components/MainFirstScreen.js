import React, { useState, useRef, useEffect } from "react";
import { RichTextarea } from "rich-textarea";
import SendIcon from '@mui/icons-material/Send';
import NormalText from "./NormalText";
import GeneratedText from "./GeneratedText";
import { GoogleGenerativeAI } from '@google/generative-ai';
import SuggestionPrompts from "./SuggestionPrompts";
import BigTitle from "./BigTitle";

const MainFirstScreen = () => {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [firstDiv, setFirstDiv] = useState(true);
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
        setIsTyping(false);
        setFirstDiv(false);
        setText("");
        if (genAI && text) {
            const result = await apiRun(genAI, text);
            setResponse(result);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="starting-screen">
            {firstDiv ? (
                <>
                    <BigTitle />
                    <SuggestionPrompts />
                </>
            ) : <div className="response-are">
                <GeneratedText response={response} />
            </div>}


            <div className="gemini-prompt-area">
                <div className="prompt-inner">
                    <form className="prompt-form" onSubmit={handleSubmit}>
                        <RichTextarea
                            ref={textareaRef}
                            placeholder="Enter a prompt here"
                            value={text}
                            onChange={handleInput}
                            onInput={handleInput}
                            onKeyDown={handleKeyDown}
                            className="full-width-textarea"
                            style={{ overflow: "hidden", resize: "none" }}
                        />
                        <button type="submit" className={`text-genrate-btn ${isTyping ? "btn-enabled" : ""}`}>
                            <SendIcon />
                        </button>
                    </form>
                    <NormalText />
                </div>
            </div>
        </div>
    )
}

export default MainFirstScreen;
