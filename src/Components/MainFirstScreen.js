import React from "react";
import SuggestionPrompts from "./SuggestionPrompts";
import BigTitle from "./BigTitle";
import InputPrompt from "./InputPrompt";

const MainFirstScreen = () => {
    return (
        <div className="starting-screen">
            <BigTitle />
            <SuggestionPrompts />
            <InputPrompt />
        </div>
    )
}

export default MainFirstScreen;