import React, { useState, useCallback } from "react";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ChatHistoryPanel from "./ChatHistoryPanel";
import LeftBottomFields from "./LeftBottomFields";

const LeftSide = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = useCallback(() => {
        setIsCollapsed(prevState => !prevState);
    }, []);

    return (
        <div className={`left-are ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="left-inner">
                <div className="left-toggle-btn" onClick={handleToggle}>
                    <Tooltip title="Collapse menu" placement="bottom-start">
                        <MenuIcon />
                    </Tooltip>
                </div>
                <Tooltip title="New Chat" placement="bottom">
                    <Button
                        variant="outlined"
                        className="new-chat-btn"
                        color="primary"
                        startIcon={<AddIcon />}

                        sx={{
                            borderColor: '#dde3ea',
                            color: '#444746',
                            backgroundColor: '#dde3ea',
                            fontFamily: 'Poppins',
                            fontWeight: '500',
                            fontSize: '14px',
                            borderRadius: '50px',
                            textTransform: 'capitalize',
                        }}
                    >
                        New Chat
                    </Button>
                </Tooltip>
                <ChatHistoryPanel />
            </div>
            <LeftBottomFields />
        </div>
    )
}

export default LeftSide;