import React, { useState } from 'react';
import './CodeTranslation.scss';
import { getCodeTranslation } from '../../api/index';

const CodeTranslation = () => {
    // State variables
    const [inputLanguage, setInputLanguage] = useState('C++');
    const [outputLanguage, setOutputLanguage] = useState('Java');
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');

    const handleTranslate = async () => {
        try {
            // Call translation API
            const res = await getCodeTranslation({
                code: inputCode,
                codeorigin: inputLanguage,
                codetarget: outputLanguage
            });

            // Check if response has translation data
            if (res && res.translation) {
                // Set translated code to outputCode
                setOutputCode(res.translation);
            } else {
                setOutputCode('Translation failed: No translation data returned.');
            }
        } catch (error) {
            console.error('Error during translation:', error);
            setOutputCode('Unexpected error occurred. Please try again.');
        }
    };

    // Copy code function
    const handleCopy = () => {
        navigator.clipboard.writeText(outputCode);
        alert('Code copied to clipboard!');
    };

    return (
        <div className="code-translation-container">
            <h1>Code Translator</h1>

            <div className="translator-controls">
                {/* Input language selection */}
                <div className="select-box">
                    <label htmlFor="input-language">INPUT LANGUAGE</label>
                    <select id="input-language" value={inputLanguage} onChange={(e) => setInputLanguage(e.target.value)}>
                        <option value="C++">C++</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                    </select>
                </div>

                {/* Translate button */}
                <button className="translate-button" onClick={handleTranslate}>
                    Translate
                </button>

                {/* Output language selection */}
                <div className="select-box">
                    <label htmlFor="output-language">OUTPUT LANGUAGE</label>
                    <select id="output-language" value={outputLanguage} onChange={(e) => setOutputLanguage(e.target.value)}>
                        <option value="C++">C++</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                    </select>
                </div>
            </div>

            <div className="code-editors">
                {/* Input code editor */}
                <div className="editor-container">
                    <textarea
                        className="code-editor"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Type your code here..."
                    />
                </div>

                {/* Output code editor */}
                <div className="editor-container">
                    <textarea className="code-editor" value={outputCode} readOnly placeholder="Translated code will appear here..." />

                    {/* Copy button */}
                    <button className="copy-button" onClick={handleCopy}>
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CodeTranslation;
