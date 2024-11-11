// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //
import React, { useState } from 'react';
import './CodeTranslation.css';

const CodeTranslation = () => {
    // ״̬����
    const [inputLanguage, setInputLanguage] = useState('C++');
    const [outputLanguage, setOutputLanguage] = useState('Java');
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');

    // ģ�ⷭ�빦��
    const handleTranslate = () => {
        // ģ�ⷭ���߼�
        setOutputCode(`Translated ${inputLanguage} code to ${outputLanguage} code:\n${inputCode}`);
    };

    // ���ƴ��빦��
    const handleCopy = () => {
        navigator.clipboard.writeText(outputCode);
        alert('Code copied to clipboard!');
    };

    return (
        <div className="code-translation-container">
            <h1>Code Translator</h1>

            <div className="translator-controls">
                {/* �������ѡ��� */}
                <div className="select-box">
                    <label htmlFor="input-language">INPUT LANGUAGE</label>
                    <select
                        id="input-language"
                        value={inputLanguage}
                        onChange={(e) => setInputLanguage(e.target.value)}
                    >
                        <option value="C++">C++</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                    </select>
                </div>

                {/* ���밴ť */}
                <button className="translate-button" onClick={handleTranslate}>
                    Translate
                </button>

                {/* �Ҳ�����ѡ��� */}
                <div className="select-box">
                    <label htmlFor="output-language">OUTPUT LANGUAGE</label>
                    <select
                        id="output-language"
                        value={outputLanguage}
                        onChange={(e) => setOutputLanguage(e.target.value)}
                    >
                        <option value="C++">C++</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                    </select>
                </div>
            </div>

            <div className="code-editors">
                {/* ����������� */}
                <div className="editor-container">
                    <textarea
                        className="code-editor"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Type your code here..."
                    />
                </div>

                {/* ����������� */}
                <div className="editor-container">
                    <textarea
                        className="code-editor"
                        value={outputCode}
                        readOnly
                        placeholder="Translated code will appear here..."
                    />

                    {/* ���ư�ť */}
                    <button className="copy-button" onClick={handleCopy}>
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CodeTranslation;