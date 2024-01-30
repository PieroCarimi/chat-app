import React, { FC, useState, useEffect } from "react";
import { Button } from "./Button";
import styled from "styled-components";

interface MessageProps {
  isMyMessage: boolean;
}

const Message = styled.div<MessageProps>((props) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: props.isMyMessage ? 'flex-end' : 'flex-start',
  background: props.isMyMessage ? 'rgba(0, 175, 0, 0.8)' : 'silver',
  color: props.isMyMessage ? 'blue' : 'black',
  marginRight: props.isMyMessage ? '100px' : '50%',
  marginLeft: props.isMyMessage ? '50%' : '100px',
  alignSelf: props.isMyMessage ? 'flex-end' : 'flex-start',
  textAlign: 'center',
  borderStyle: 'ridge',
  position: 'relative',
}));

const UtenteCollegato = styled.div(() => ({
  textAlign: 'center',
}));

const DeleteButton = styled(Button)(() => ({
  position: 'absolute',
  top: '5px',
  right: '5px',
  cursor: 'pointer',
  color: 'black',
  border: 'none',
}))

const ContainerInput = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: '100px',
  marginRight: '100px',
  position: 'fixed',
  bottom: '0',
  width: 'calc(100% - 200px)',
  backgroundColor: 'white',
  padding: '10px',
}));

const Input = styled.input(() => ({
  width: '100%',
  padding: '10px 10px',
}))

interface MessageItem {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

interface WelcomeProps {
  onClickLogout: () => void;
  lastAccess: string;
}

const Welcome: FC<WelcomeProps> = ({ onClickLogout, lastAccess }) => {
  const email = localStorage.getItem("email") || "";
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (!!storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleMessageSend = () => {
    const timestamp = new Date().toISOString();
    const id = Date.now();
    const newMessageItem: MessageItem = {
      id,
      author: email,
      text: newMessage,
      timestamp,
    };
    const updatedMessages = [...messages, newMessageItem];
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    setNewMessage("");
  };

  const handleDeleteMessage = (id: number) => {
    const updatedMessages = messages.filter((message) => message.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };

  return (
    <>
      {!!lastAccess ? (
        <>
        <br></br>
        <Button onClick={onClickLogout}>Logout</Button>
        <UtenteCollegato>
          <h1>CHAT</h1>
          <h3>Utente collegato: {email}</h3><br></br>
        </UtenteCollegato>
        
          <div>
            {messages.map((msg) => (
              <Message key={msg.id} isMyMessage={msg.author === email}>
                <p><b>{msg.author}</b></p>
                <p>{msg.text}</p>
                <p>{new Date(msg.timestamp).toLocaleString()}</p>
                {msg.author === email && (
                  <DeleteButton onClick={() => handleDeleteMessage(msg.id)}>X</DeleteButton>
                )}
              </Message>
            ))}
          </div><br></br>
          <ContainerInput>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <Button onClick={handleMessageSend}>Send</Button>
          </ContainerInput>
          <br></br>
          <br></br>
        </>
      ) : (
        <div>Error</div>
      )}
    </>
  );
};

export default Welcome;
