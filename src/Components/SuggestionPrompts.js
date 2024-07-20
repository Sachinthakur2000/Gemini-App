import React from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const SuggestionPrompts = () => {
    return (
        <div className="all-suggestion-prompt">
            <div className="suggestion-prompt-bx">
                <p>Structure a sales pitch for a hair dryer that's also a microphone. Be concise and organize the sales pitch logically. </p>
                <button className="prompt-btn"><BorderColorIcon /></button>
            </div>
            <div className="suggestion-prompt-bx">
                <p>Write a Java function that takes a path as an input and creates a file storing the current system date. Consider edge cases.</p>
                <button className="prompt-btn"><BorderColorIcon /></button>
            </div>
            <div className="suggestion-prompt-bx">
                <p>Generate an image of a futuristic car driving through an old mountain road surrounded by nature</p>
                <button className="prompt-btn"><BorderColorIcon /></button>
            </div>
            <div className="suggestion-prompt-bx">
                <p>Give me a walkthrough of The Byzantine Empire in seven bullet points or less. </p>
                <button className="prompt-btn"><BorderColorIcon /></button>
            </div>
        </div>
    )
}

export default SuggestionPrompts;