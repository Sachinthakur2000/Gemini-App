import React from 'react';

const formatResponseText = (text) => {
    const formattedText = [];
    const lines = text.split('\n');
    let currentList = null;
    let inMultilineCodeBlock = false;
    let multilineCodeBuffer = [];

    const processInlineFormatting = (line) => {
        // Handle bold text (**text**)
        line = line.replace(/\*\*(.*?)\*\*/g, (_, boldText) => `<strong>${boldText}</strong>`);

        // Handle single-line code (`text`)
        line = line.replace(/`([^`]*)`/g, (_, codeText) => `<span className="single-line-code">${codeText}</span>`);

        return line;
    };

    lines.forEach((line, index) => {
        line = line.trim();

        // Handle multi-line code block start and end
        if (line.startsWith('```')) {
            if (inMultilineCodeBlock) {
                inMultilineCodeBlock = false;
                formattedText.push(
                    <div key={index} className="multiline-code">
                        {multilineCodeBuffer.join('\n')}
                    </div>
                );
                multilineCodeBuffer = [];
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
                <li key={index} dangerouslySetInnerHTML={{ __html: processInlineFormatting(line.slice(2)) }} />
            );

            // Otherwise, treat it as a paragraph with possible inline formatting
        } else if (line !== '') {
            if (currentList) {
                formattedText.push(<ul key={currentList.join('')}>{currentList}</ul>);
                currentList = null;
            }
            formattedText.push(
                <p key={index} dangerouslySetInnerHTML={{ __html: processInlineFormatting(line) }} />
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

