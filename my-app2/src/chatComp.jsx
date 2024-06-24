import React, { useEffect, useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { configueAWS, postData } from "./bedrock";


const ChatComp = () => {
    useEffect(()=>{
        configueAWS();
        console.log("done");
    },[])
    
    const [messages, setMessages] = useState([
    {
      message: "Hello my friend",
      sentTime: "just now",
      sender: "Joe",
    },
  ]);

  const handleSend = async (messageText) => {
    const newMessage = {
      message: messageText,
      sentTime: Date.now().toString(),
      sender: "You",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const response = await postData(messageText);
    console.log("response", response);

    const newMessage2 = {
      message: response,
      sentTime: Date.now().toString(),
      sender: "AI",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage2]);
  };

  return (
    <div style={{ position: "relative", height: "680px", width: "50%", paddingRight: "1em" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((msg, index) => (
              <Message
                key={index}
                model={{
                  message: msg.message,
                  sentTime: msg.sentTime,
                  sender: msg.sender,
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={(message) => handleSend(message)}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatComp;
