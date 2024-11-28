import React, { useState } from 'react';
import './CodeTranslation.css';
import axios from 'axios';
import getCodeTranslation from 'api';



const CodeTranslation = () => {
    // 状态管理
    const [inputLanguage, setInputLanguage] = useState('C++');
    const [outputLanguage, setOutputLanguage] = useState('Java');
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');

    const handleTranslate = async () => {
        try {
            // 调用翻译 API
            const res = await getCodeTranslation({
                'code': inputCode,
                'codeorigin': inputLanguage,
                'codetarget': outputLanguage
            });

            // 检查响应数据是否有翻译结果
            if (res && res.translation) {
                // 设置翻译结果到 outputCode
                setOutputCode(res.translation);
            } else {
                setOutputCode('Translation failed: No translation data returned.');
            }
        } catch (error) {
            console.error('Error during translation:', error);
            setOutputCode('Unexpected error occurred. Please try again.');
        }
    };
    // 复制代码功能
    const handleCopy = () => {
        navigator.clipboard.writeText(outputCode);
        alert('Code copied to clipboard!');
    };

    return (
        <div className="code-translation-container">
            <h1>Code Translator</h1>

            <div className="translator-controls">
                {/* 左侧语言选择框 */}
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

                {/* 翻译按钮 */}
                <button className="translate-button" onClick={handleTranslate}>
                    Translate
                </button>

                {/* 右侧语言选择框 */}
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
                {/* 输入代码区域 */}
                <div className="editor-container">
                    <textarea
                        className="code-editor"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Type your code here..."
                    />
                </div>

                {/* 输出代码区域 */}
                <div className="editor-container">
                    <textarea
                        className="code-editor"
                        value={outputCode}
                        readOnly
                        placeholder="Translated code will appear here..."
                    />

                    {/* 复制按钮 */}
                    <button className="copy-button" onClick={handleCopy}>
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CodeTranslation;