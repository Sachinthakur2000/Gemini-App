import React, { useState, useRef, useEffect } from "react";
import { RichTextarea } from "rich-textarea";
import SendIcon from '@mui/icons-material/Send';
import NormalText from "./NormalText";

const InputPrompt = () => {
    const [text, setText] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.width = "";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [text]);

    return (
        <div className="gemini-prompt-area">
            <div className="prompt-inner">
                <form className="prompt-form">
                    <RichTextarea
                        ref={textareaRef}
                        placeholder="Enter a prompt here"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onInput={() => {
                            textareaRef.current.style.height = "auto";
                            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
                        }}
                        style={{ overflow: "hidden", resize: "none" }}
                    />
                    <button type="submit"><SendIcon /></button>
                </form>
                <NormalText />
            </div>
        </div>
    );
};

export default InputPrompt;
