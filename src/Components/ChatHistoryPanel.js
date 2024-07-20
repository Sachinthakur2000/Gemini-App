import React from "react";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Tooltip from '@mui/material/Tooltip';

const ChatHistoryPanel = () => {
    return (
        <div className="recent-searches">
            <h2>Recent</h2>
            <div className="all-searches">
                <ul>
                    <li><Tooltip title="Chat1" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat1</span></Tooltip></li>
                    <li><Tooltip title="Chat2" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat2</span></Tooltip></li>
                    <li><Tooltip title="Chat3" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat3</span></Tooltip></li>
                    <li><Tooltip title="Chat4" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat4</span></Tooltip></li>
                    <li><Tooltip title="Chat5" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat5</span></Tooltip></li>
                    <li><Tooltip title="Chat1" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat1</span></Tooltip></li>
                    <li><Tooltip title="Chat2" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat2</span></Tooltip></li>
                    <li><Tooltip title="Chat3" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat3</span></Tooltip></li>
                    <li><Tooltip title="Chat4" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat4</span></Tooltip></li>
                    <li><Tooltip title="Chat5" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat5</span></Tooltip></li>
                    <li><Tooltip title="Chat1" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat1</span></Tooltip></li>
                    <li><Tooltip title="Chat2" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat2</span></Tooltip></li>
                    <li><Tooltip title="Chat3" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat3</span></Tooltip></li>
                    <li><Tooltip title="Chat4" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat4</span></Tooltip></li>
                    <li><Tooltip title="Chat5" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat5</span></Tooltip></li>
                    <li><Tooltip title="Chat1" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat1</span></Tooltip></li>
                    <li><Tooltip title="Chat2" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat2</span></Tooltip></li>
                    <li><Tooltip title="Chat3" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat3</span></Tooltip></li>
                    <li><Tooltip title="Chat4" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat4</span></Tooltip></li>
                    <li><Tooltip title="Chat5" placement="right"><ChatBubbleOutlineIcon /> <span className="rcnt-txt">Chat5</span></Tooltip></li>

                </ul>
            </div>
        </div>
    )
}

export default ChatHistoryPanel;