import React, { useState, useEffect } from "react";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ChatHistoryPanel = ({ onSelectChat, newChat }) => {
    const [chatHistory, setChatHistory] = useState(JSON.parse(localStorage.getItem("chatHistory")) || []);

    useEffect(() => {
        if (newChat) {
            // Add new chat to chat history and update localStorage
            const updatedHistory = [...chatHistory, newChat];
            setChatHistory(updatedHistory);
            localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
        }
    }, [newChat]); // This runs when a new chat is passed as a prop

    const handleChatClick = (chat) => {
        if (onSelectChat) {
            onSelectChat(chat); // Call the onSelectChat function passed from the parent
        }
    };

    const handleDelete = (e, indexToDelete) => {
        e.stopPropagation();
        const updatedHistory = chatHistory.filter((_, index) => index !== indexToDelete);
        setChatHistory(updatedHistory);
        localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    };

    return (
        <div className="recent-searches">
            <h2>Recent</h2>
            <div className="all-searches">
                {chatHistory.length > 0 ? (
                    <ul>
                        {chatHistory.map((chat, index) => (
                            <li key={index} onClick={() => handleChatClick(chat)}>
                                <Tooltip title={chat[0]?.prompt || `Chat ${index + 1}`} placement="right">
                                    {/* Wrapping multiple elements inside a single parent element */}
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <ChatBubbleOutlineIcon />
                                        <span className="rcnt-txt">{chat[0]?.prompt || `Chat ${index + 1}`}</span>
                                        <DeleteOutlineIcon
                                            className="delete-icon"
                                            onClick={(e) => handleDelete(e, index)}
                                        />
                                    </div>
                                </Tooltip>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-chat">No chat history</p>
                )}
            </div>
        </div>
    );
};

export default ChatHistoryPanel;
