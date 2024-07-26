import React, { useState, useRef, useEffect } from "react";
import { RichTextarea } from "rich-textarea";
import SendIcon from '@mui/icons-material/Send';
import NormalText from "./NormalText";

const InputPrompt = () => {
    const [text, setText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [text]);

    const handleInput = (e) => {
        setText(e.target.value);
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        setIsTyping(e.target.value.length > 0);
    };

    return (
        <div className="gemini-prompt-area">
            <div className="prompt-inner">
                <form className="prompt-form">
                    <RichTextarea
                        ref={textareaRef}
                        placeholder="Enter a prompt here"
                        value={text}
                        onChange={handleInput}
                        onInput={handleInput}
                        className="full-width-textarea"
                        style={{ overflow: "hidden", resize: "none" }}
                    />
                    <button type="submit" className={`text-genrate-btn ${isTyping ? "btn-enabled" : ""}`}><SendIcon /></button>
                </form>
                <NormalText />
            </div>
        </div>
    );
};

export default InputPrompt;
