import React, {useState} from "react";

const ChatInput = ({onSendMessage}) => {
    const [inputText, setInputText] = useState("");

    const handleSendMessage =(e) => {
        e.preventDefault();
        onSendMessage(inputText);
        setInputText("");
    };

    return (
        <form className="chat-input" onSubmit={handleSendMessage}>
            <input
             type="text"
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
        />
            <button type="submit" onClick={handleSendMessage}>SEND</button>
        </form>
    );
};
export default ChatInput;
