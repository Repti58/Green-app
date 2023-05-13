import "./App.css";
import { useState } from "react";

function App() {
  // debugger
  const [messageStack, setMessageStack] = useState([]);
  const [outgoingMessage, setOutgoingMessage] = useState("");

  const sendMessageUrl =
    "https://api.green-api.com/waInstance1101819635/sendMessage/336bca218a3f4f728a16912bbeb3f4786de9401d34a14089ad";
  const receiveNotificationUrl =
    "https://api.green-api.com/waInstance1101819635/receiveNotification/336bca218a3f4f728a16912bbeb3f4786de9401d34a14089ad";
  const deleteNotificationUrl =
    "https://api.green-api.com/waInstance1101819635/deleteNotification/336bca218a3f4f728a16912bbeb3f4786de9401d34a14089ad";

  const deleteReceivedMessage = (receiptId) => {
    fetch(deleteNotificationUrl + "/" + receiptId, {
      method: "DELETE",
    });
  };

  const getMessage = async function () {
    let response = await fetch(receiveNotificationUrl, {
      method: "GET",      
    });
    response = await response.json();
    console.log(response);
    if (response) {
      const receiptId = response.receiptId;
      let messageType
      if (response.body.typeWebhook == "incomingMessageReceived") {
        messageType = "incoming-message"
      } else {
        messageType = "outgoing-message"
      }
      
      let messageText;
      if (
        response.body.typeWebhook == "outgoingAPIMessageReceived"        
      ) {
        messageText = response.body.messageData.extendedTextMessageData.text;
      } else {
        messageText = response.body.messageData.textMessageData.textMessage;
      }
      console.log(messageText);
      setMessageStack([...messageStack, { receiptId, messageText, messageType }]);
      deleteReceivedMessage(receiptId);
    }
  };

  const sendMessage = async() => {
    
    const headers = { "Content-Type": "application/json" };
    const payload = JSON.stringify({
      chatId: "79956073963@c.us",
      message: outgoingMessage,
    });
    await fetch(sendMessageUrl, {
      method: "POST",
      headers: headers,
      body: payload,
    });
    setOutgoingMessage("")
    getMessage()
  };
  console.log(messageStack);
  console.log(outgoingMessage);

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
                  message.messageType == "incoming-message"
                    ? "incoming-msg"
                    : "outgoing-msg"
                }
              >
                {message.messageText}
              </div>
            );
          })}
        </div>
        <button className="send-msg-btn" onClick={getMessage}>
          получить
        </button>
        <input value={outgoingMessage}
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
