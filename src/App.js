import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [messageStack, setMessageStack] = useState([]);
  const [outgoingMessage, setOutgoingMessage] = useState("");
  const uniqeId = useRef([]);

  const sendMessageUrl =
    "https://api.green-api.com/waInstance1101819635/sendMessage/336bca218a3f4f728a16912bbeb3f4786de9401d34a14089ad";
  const receiveNotificationUrl =
    "https://api.green-api.com/waInstance1101819635/receiveNotification/336bca218a3f4f728a16912bbeb3f4786de9401d34a14089ad";
  const deleteNotificationUrl =
    "https://api.green-api.com/waInstance1101819635/deleteNotification/336bca218a3f4f728a16912bbeb3f4786de9401d34a14089ad";

    const deleteReceivedMessage = async (receiptId) => {
      try {
        await fetch(deleteNotificationUrl + "/" + receiptId, {
          method: "DELETE",
        });
      } catch (error) {
        console.error(error);
      }
    };
    

    const getMessage = async function () {
      try {
        let response = await fetch(receiveNotificationUrl, {
          method: "GET",
        });
        response = await response.json();
        if (response) {
          const receiptId = response.receiptId;
    
          let messageType;
          if (response.body.typeWebhook === "incomingMessageReceived") {
            messageType = "incoming-message";
          } else {
            messageType = "outgoing-message";
          }
    
          let messageText;
          if (response.body.typeWebhook === "outgoingAPIMessageReceived") {
            messageText = response.body.messageData.extendedTextMessageData.text;
          } else {
            messageText = response.body.messageData.textMessageData.textMessage;
          }
    
          if (!uniqeId.current.includes(receiptId)) {
            setMessageStack((prevState) => [
              ...prevState,
              { receiptId, messageText, messageType },
            ]);
            uniqeId.current.push(receiptId);
          }
    
          deleteReceivedMessage(receiptId);
        }
      } catch (error) {
        console.error(error);
      }
    };
    

  useEffect(() => {
    const interval = setInterval(() => {
      debugger;
      getMessage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    const headers = { "Content-Type": "application/json" };
    const payload = JSON.stringify({
      chatId: "79956073963@c.us",
      message: outgoingMessage,
    });
    try {
      await fetch(sendMessageUrl, {
        method: "POST",
        headers: headers,
        body: payload,
      });
      setOutgoingMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header></header>
      <div className="App-container">
        <div>
          {messageStack.map((message) => {
            return (
              <div
                key={message.receiptId}
                className={
                  message.messageType === "incoming-message"
                    ? "incoming-msg"
                    : "outgoing-msg"
                }
              >
                {message.messageText}
              </div>
            );
          })}
        </div>
        <input
          value={outgoingMessage}
          className="outgoing-msg"
          onChange={(event) => setOutgoingMessage(event.target.value)}
        ></input>
        <button className="send-msg-btn" onClick={sendMessage}>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default App;
