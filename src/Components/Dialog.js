import { useEffect, useRef, useState } from "react";
import "./Dialog.css";

function Dialog({ messageStack, setMessageStack, chatNumber, authData }) {
  const [outgoingMessage, setOutgoingMessage] = useState("");
  const uniqueId = useRef([]);
  const uniqueKeyOutgoingMessage = useRef(1);
  console.log("authData in Dialog", authData);
  const { idInstance, apiTokenInstance } = authData;
  console.log(idInstance, apiTokenInstance);

  //   const idInstance = "1101820240";
  //   const apiTokenInstance = "6c0edc4dd2c1478c94564418912b7f13c64b506d27824caabe";
  const sendMessageUrl = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
  const receiveNotificationUrl = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
  const deleteNotificationUrl = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}`;

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
    console.log(idInstance, apiTokenInstance);
    if (idInstance && apiTokenInstance) {
      try {
        let response = await fetch(receiveNotificationUrl, {
          method: "GET",
        });
        response = await response.json();
        console.log("response", response);
        if (
          response &&
          response.body.typeWebhook === "incomingMessageReceived"
        ) {
          const receiptId = response.receiptId;
          const messageType = "incoming-message";
          const messageText =
            response.body.messageData.textMessageData.textMessage;

          if (!uniqueId.current.includes(receiptId)) {
            setMessageStack((prevState) => [
              ...prevState,
              { receiptId, messageText, messageType },
            ]);
            uniqueId.current.push(receiptId);
          }

          deleteReceivedMessage(receiptId);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getMessage();
    }, 5000);

    return () => clearInterval(interval);
  }, [idInstance, apiTokenInstance]);

  const sendMessage = async () => {
    if (chatNumber && outgoingMessage) {
      const messageText = outgoingMessage;
      const messageType = "outgoing-message";
      const receiptId = "out" + uniqueKeyOutgoingMessage.current;
      uniqueKeyOutgoingMessage.current += 1;
      if (!uniqueId.current.includes(receiptId)) {
        setMessageStack((prevState) => [
          ...prevState,
          { receiptId, messageText, messageType },
        ]);
        uniqueId.current.push(receiptId);
      }

      const headers = { "Content-Type": "application/json" };
      const payload = JSON.stringify({
        chatId: chatNumber + "@c.us",
        message: outgoingMessage,
      });
      console.log("payload", payload);

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
    } else {
      console.error("No valid payload to send");
    }
  };

  const inputMessageHandler = (event) => {
    if (event.key == "Enter") {
      sendMessage();
    }
  };

  console.log("messageStack", messageStack);

  return (
    <div className="Dialog-container">
      <div>
      
        {messageStack.map((message) => {
          return (
            <div
              key={message.receiptId}
              className={
                message.messageType === "incoming-message"
                  ? "alert alert-warning"
                  : "alert alert-success"
              }
            >
              {message.messageText}
            </div>
          );
        })}
      </div>
      {/* <input
        value={outgoingMessage}
        className="outgoing-msg"
        onChange={(event) => setOutgoingMessage(event.target.value)}
        onKeyDown={inputMessageHandler}
      ></input> */}
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Ваше сообщение..."
          value={outgoingMessage}
          onChange={(event) => setOutgoingMessage(event.target.value)}
          onKeyDown={inputMessageHandler}

        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          onClick={sendMessage}
        >
          But
        </button>
      </div>
      {/* <button className="send-msg-btn" onClick={sendMessage}>
        Отправить
      </button> */}
    </div>
  );
}

export default Dialog;
