import { Container } from "react-bootstrap";
import { MessageData } from "../../types/interfaces";
import Message from "./Message";
import { useRef } from "react";
// import { useEffect } from "react";

interface data {
  messages: MessageData[],
}

function Messages(data: data) {
  const { messages } = data;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); // не помогает
  //   // messagesEndRef.current.scrollTop = 99999;
  // }

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  return (
    <Container className="bg-white rounded shadow-sm p-2 mb-3">
      <Container
        style={{ maxHeight: "30rem", overflowY: "scroll" }}
        className="d-flex flex-column"
        ref={messagesEndRef}
      >
        {messages.length > 0 ? (
          messages.map(elem =>
            <Message key={elem._id} message={elem} />
          )
        ) : (
          <p className="text-muted text-center">Сообщения в этом чате отсутствуют!</p>
        )}
      </Container>
    </Container>
  )
}

export default Messages;