import React from "react";
import generateIcon from "../images/gemini-generate.svg";

const ResponseLoader = () => {
    return (
        <div className="response-block loader">
            <div className="generated-text-container">
                <img src={generateIcon} alt='generate Icon' className='generate-img' />
                <div className='response-all-text'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default ResponseLoader;