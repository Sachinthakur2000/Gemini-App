import React from "react";
import avtarImg from "../images/avtr-img.png";

const MainHeader = () => {
    return (
        <div className="main-header-are">
            <div className="hdr-left-are">
                <h3>Gemini</h3>
            </div>
            <div className="hdr-right-are">
                <img src={avtarImg} alt="" />
            </div>
        </div>
    )
}

export default MainHeader;