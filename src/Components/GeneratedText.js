import React, { useState, useEffect } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import generateIcon from "../images/gemini-generate.svg";

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

        const regex = /(\*\*(.*?)\*\*)|(`(.*?)`)/g;
        let match;

        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                parts.push(line.slice(lastIndex, match.index));
            }

            if (match[1]) {
                parts.push(<strong key={match.index}>{match[2]}</strong>);
            } else if (match[3]) {
                parts.push(
                    <span key={match.index} className="single-line-code">
                        {match[4]}
                    </span>
                );
            }
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < line.length) {
            parts.push(line.slice(lastIndex));
        }

        return parts;
    };

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
    };

    lines.forEach((line, index) => {
        line = line.trim();

        if (line.startsWith('```')) {
            if (inMultilineCodeBlock) {
                inMultilineCodeBlock = false;
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
                multilineCodeBuffer = [];
                multilineCodeIndex++;
            } else {
                inMultilineCodeBlock = true;
            }
        } else if (inMultilineCodeBlock) {
            multilineCodeBuffer.push(line);
        } else if (line.startsWith('## ')) {
            formattedText.push(
                <strong key={index} className="heading">{line.slice(3)}</strong>
            );
        } else if (line.startsWith('**') && line.endsWith('**')) {
            formattedText.push(<strong key={index} className="heading">{line.slice(2, -2)}</strong>);
        } else if (line.startsWith('* ')) {
            if (!currentList) {
                currentList = [];
            }
            currentList.push(
                <li key={index}>{processInlineFormatting(line.slice(2))}</li>
            );
        } else if (line !== '') {
            if (currentList) {
                formattedText.push(<ul key={currentList.join('')}>{currentList}</ul>);
                currentList = null;
            }
            formattedText.push(
                <p key={index}>{processInlineFormatting(line)}</p>
            );
        } else if (line === '') {
            if (currentList) {
                formattedText.push(<ul key={currentList.join('')}>{currentList}</ul>);
                currentList = null;
            }
        }
    });

    if (currentList) {
        formattedText.push(<ul key={currentList.join('')}>{currentList}</ul>);
    }

    return formattedText;
};

const GeneratedText = ({ response, onDisplayedTextChange }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const words = response ? response.split(' ') : [];

    useEffect(() => {
        if (wordIndex < words.length) {
            const timeoutId = setTimeout(() => {
                const newText = displayedText + words[wordIndex] + ' ';
                setDisplayedText(newText);
                onDisplayedTextChange(newText);  // Pass updated text to parent
                setWordIndex(wordIndex + 1);
            }, 40); // Adjust speed by changing the timeout value
            return () => clearTimeout(timeoutId);
        }
    }, [wordIndex, words, displayedText, onDisplayedTextChange]);

    return (
        <div className="generated-text-container">
            <img src={generateIcon} alt='generate Icon' className='generate-img' />
            <div className='response-all-text'>
                {formatResponseText(displayedText)}
            </div>
        </div>
    );
};

export default GeneratedText;
