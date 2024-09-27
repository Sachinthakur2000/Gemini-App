import React from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const SuggestionPrompts = ({ handleSuggestionClick }) => {
    const suggestions = [
        "Structure a sales pitch for a hair dryer that's also a microphone. Be concise and organize the sales pitch logically.",
        "Describe the current state of AI research in quantum computing.",
        "Write a Python function to merge two sorted arrays efficiently.",
        "Generate a short sci-fi story set in a dystopian future where AI controls society."
    ];

    return (
        <div className="all-suggestion-prompt">
            {suggestions.map((suggestion, index) => (
                <div className="suggestion-prompt-bx" key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    <p>{suggestion}</p>
                    <button className="prompt-btn"><BorderColorIcon /></button>
                </div>
            ))}
        </div>
    );
}

export default SuggestionPrompts;
