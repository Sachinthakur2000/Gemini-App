import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const formatResponseText = (text) => {
    const formattedText = [];
    const lines = text.split('\n');
    let currentList = null;
    let inMultilineCodeBlock = false;
    let multilineCodeBuffer = [];
    let multilineCodeIndex = 0;

    const processInlineFormatting = (line) => {
        const parts = [];
        let lastIndex = 0;

        // Regex to find bold text and inline code
        const regex = /(\*\*(.*?)\*\*)|(`(.*?)`)/g;
        let match;

        // Iterate over matches
        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                // Push plain text before the match
                parts.push(line.slice(lastIndex, match.index));
            }

            if (match[1]) {
                // Bold text match
                parts.push(<strong key={match.index}>{match[2]}</strong>);
            } else if (match[3]) {
                // Single-line code match
                parts.push(
                    <span key={match.index} className="single-line-code">
                        {match[4]}
                    </span>
                );
            }
            lastIndex = regex.lastIndex;
        }

        // Push the remaining part of the line if any
        if (lastIndex < line.length) {
            parts.push(line.slice(lastIndex));
        }

        return parts;
    };

    const copyToClipboard = (code) => {
        if (!code || code.trim() === "") {
            console.warn("Empty code block, nothing to copy.");
            return;
        }

        navigator.clipboard.writeText(code)
            .then(() => {
                console.log("Copied code:", code);
            })
            .catch((err) => {
                console.error("Failed to copy code:", err);
            });
    };

    lines.forEach((line, index) => {
        line = line.trim();

        // Handle multi-line code block start and end
        if (line.startsWith('```')) {
            if (inMultilineCodeBlock) {
                inMultilineCodeBlock = false;
                console.log("Multiline Code Buffer: ", multilineCodeBuffer); // Check the content of the buffer here
                let allCode = multilineCodeBuffer.join('\n');
                formattedText.push(
                    <div key={`multiline-code-${multilineCodeIndex}`} className="multiline-code-block">
                        <div className="multiline-code">
                            <pre>{allCode}</pre>
                        </div>
                        <button
                            className="copy-code-button"
                            onClick={() => copyToClipboard(allCode)}
                        >
                            <ContentCopyIcon />
                        </button>
                    </div>
                );
                multilineCodeBuffer = []; // Reset the buffer after rendering
                multilineCodeIndex++;
            } else {
                inMultilineCodeBlock = true;
            }
        } else if (inMultilineCodeBlock) {
            multilineCodeBuffer.push(line);

            // Check for headings (**text**)
        } else if (line.startsWith('**') && line.endsWith('**')) {
            formattedText.push(<strong key={index} className="heading">{line.slice(2, -2)}</strong>);

            // Check for list items (* text)
        } else if (line.startsWith('* ')) {
            if (!currentList) {
                currentList = [];
            }
            currentList.push(
                <li key={index}>{processInlineFormatting(line.slice(2))}</li>
            );

            // Otherwise, treat it as a paragraph with possible inline formatting
        } else if (line !== '') {
            if (currentList) {
                formattedText.push(<ul key={currentList.join('')}>{currentList}</ul>);
                currentList = null;
            }
            formattedText.push(
                <p key={index}>{processInlineFormatting(line)}</p>
            );

            // Handle empty lines
        } else if (line === '') {
            if (currentList) {
                formattedText.push(<ul key={currentList.join('')}>{currentList}</ul>);
                currentList = null;
            }
        }
    });

    // If there's a list left over, add it
    if (currentList) {
        formattedText.push(<ul key={currentList.join('')}>{currentList}</ul>);
    }

    return formattedText;
};

const GeneratedText = ({ response }) => {
    return (
        <div className="generated-text-container">
            {response && formatResponseText(response)}
        </div>
    );
};

export default GeneratedText;
