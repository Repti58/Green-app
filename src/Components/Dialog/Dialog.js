import { useEffect, useRef, useState } from "react";
// import "./Dialog.css";
import ChatDialog from "./ChatDialog.js";

function Dialog({
  messageStack,
  setMessageStack,
  chatNumber,
  authData,
  authStatus,
}) {
  const [outgoingMessage, setOutgoingMessage] = useState("");
  const uniqueId = useRef([]);
  const uniqueKeyOutgoingMessage = useRef(1);

  // console.log("authData in Dialog", authData);
  const { idInstance, apiTokenInstance } = authData;

  const sendMessageUrl = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
  const receiveNotificationUrl = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
  const deleteNotificationUrl = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}`; 

  // Удаление сообщений с сервера
  const deleteReceivedMessage = async (receiptId) => {
    try {
      await fetch(deleteNotificationUrl + "/" + receiptId, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Получение сообщений с сервера
  const getMessage = async function () {
    // console.log(idInstance, apiTokenInstance);
    if (idInstance && apiTokenInstance) {
      try {
        let response = await fetch(receiveNotificationUrl, {
          method: "GET",
        });
        response = await response.json();
        // console.log("response", response);
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

  // Запрос новых сообщений с сервера каждые 5 сек
  useEffect(() => {
    const interval = setInterval(() => {
      getMessage();
    }, 5000);
    return () => clearInterval(interval);
  }, [idInstance, apiTokenInstance]);

  // Отправка сообщений
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
      // console.log("payload", payload);

      try {
        setOutgoingMessage("");
        await fetch(sendMessageUrl, {
          method: "POST",
          headers: headers,
          body: payload,
        });
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

  // console.log("messageStack", messageStack);

  return (
    <div className="dialog-container">
      {authStatus && chatNumber ? (
        <div>
          <ChatDialog messageStack={messageStack}></ChatDialog>
          <div className="input-wrapper">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Ваше сообщение..."
                value={outgoingMessage}
                onChange={(event) => setOutgoingMessage(event.target.value)}
                onKeyDown={inputMessageHandler}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={sendMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#5da177"
                  className="bi bi-send-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Dialog;
