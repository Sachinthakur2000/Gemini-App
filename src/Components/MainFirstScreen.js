import React from "react";
import SuggestionPrompts from "./SuggestionPrompts";
import BigTitle from "./BigTitle";
import InputPrompt from "./InputPrompt";
import BackendApi from "./BackendApi";

const MainFirstScreen = () => {
    return (
        <div className="starting-screen">
            <BigTitle />
            <SuggestionPrompts />
            <BackendApi />
            <InputPrompt />
        </div>
    )
}

export default MainFirstScreen;