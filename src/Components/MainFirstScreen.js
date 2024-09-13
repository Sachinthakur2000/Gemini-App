import React, { useState, useRef, useEffect } from "react";
import { RichTextarea } from "rich-textarea";
import SendIcon from '@mui/icons-material/Send';
import NormalText from "./NormalText";
import GeneratedText from "./GeneratedText";
import ResponseLoader from "./ResponseLoader";
import { GoogleGenerativeAI } from '@google/generative-ai';
import SuggestionPrompts from "./SuggestionPrompts";
import BigTitle from "./BigTitle";
import avtarImg from "../images/avtr-img.png";

const MainFirstScreen = () => {
    const [text, setText] = useState("");
    const [promptResponses, setPromptResponses] = useState([]); // To hold multiple prompts and responses
    const [isTyping, setIsTyping] = useState(false);
    const [firstDiv, setFirstDiv] = useState(true);
    const [genAI, setGenAI] = useState(null);
    const [currentDisplayedText, setCurrentDisplayedText] = useState('');
    const textareaRef = useRef(null);
    const responseAreaRef = useRef(null); // Reference to the response area

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

        // Add a new prompt with loading status set to true
        setPromptResponses(prevState => [
            ...prevState,
            { prompt: text, response: null, isLoading: true }
        ]);

        if (genAI && text) {
            const result = await apiRun(genAI, text);

            // Update the response and set loading to false for this prompt
            setPromptResponses(prevState => prevState.map((item, index) =>
                index === prevState.length - 1 // Update the last added prompt
                    ? { ...item, response: result, isLoading: false }
                    : item
            ));
        }
    };

    useEffect(() => {
        if (responseAreaRef.current) {
            responseAreaRef.current.scrollTop = responseAreaRef.current.scrollHeight;
        }
    }, [currentDisplayedText]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Always prevent the default new line behavior
            if (e.target.value.trim() !== "") {
                handleSubmit(e);  // Submit only if the prompt is not empty
                setText("");
            }
        }
    };

    return (
        <div className="starting-screen">
            {firstDiv ? (
                <>
                    <BigTitle />
                    <SuggestionPrompts />
                </>
            ) : (
                <div className="response-area" ref={responseAreaRef}>
                    {promptResponses.map((item, index) => (
                        <div key={index} className="response-block">
                            <p className="user-prompt"><img src={avtarImg} alt="" /> {item.prompt}</p>
                            {item.isLoading ? (
                                <ResponseLoader /> // Show loader while this response is loading
                            ) : (
                                <GeneratedText
                                    response={item.response}
                                    onDisplayedTextChange={setCurrentDisplayedText} // Pass the handler to the child
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

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
    );
};

export default MainFirstScreen;
