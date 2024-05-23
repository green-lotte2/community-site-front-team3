import React, {useState} from "react";

const ChatInput = ({onSendMessage}) => {
    const [inputText, setInputText] = useState("");

    const handleSendMessage =() => {
        onSendMessage(inputText);
        setInputText("");
    };

    return (
        <div className="chat-input">
            <input
             type="text"
             placeholder=""
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
        />
            <button onClick={handleSendMessage}>SEND</button>
        </div>
    );
};
export default ChatInput;
