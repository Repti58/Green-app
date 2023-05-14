import "./App.css";
// import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./Components/Authentication";
import Dialog from "./Components/Dialog";
import Chatlist from "./Components/ChatList";
import { useState } from "react";


function App() {
  const [chatNumber, setChatNumber] = useState("")
  const [messageStack, setMessageStack] = useState([]);
  const [authData, setAuthData] = useState({})
  console.log("authData in APP", authData);
  console.log("chatNumber", chatNumber);

  // const selectDialog = (chat) => {
  //   setChatNumber(chat)
  //   setMessageStack([])
  // }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4">
          <Authentication
          authData={authData}
          setAuthData={setAuthData}
          ></Authentication>
          <Chatlist          
          setMessageStack={setMessageStack}
          setChatNumber={setChatNumber}
          ></Chatlist>
        </div>
        
        <div className="col">
          <Dialog
          authData={authData}
          chatNumber={chatNumber}
          messageStack={messageStack}
          setMessageStack={setMessageStack}
          ></Dialog>
        </div>
      </div>
    </div>
  );

  //   const [messageStack, setMessageStack] = useState([]);
  //   const [outgoingMessage, setOutgoingMessage] = useState("");
  //   const uniqueId = useRef([]);
  //   const uniqueKeyOutgoingMessage = useRef(1)

  //   const IdInstance = "1101820240"
  //   const ApiTokenInstance = "6c0edc4dd2c1478c94564418912b7f13c64b506d27824caabe"
  //   const sendMessageUrl =
  //     `https://api.green-api.com/waInstance${IdInstance}/sendMessage/${ApiTokenInstance}`;
  //   const receiveNotificationUrl =
  //     `https://api.green-api.com/waInstance${IdInstance}/receiveNotification/${ApiTokenInstance}`;
  //   const deleteNotificationUrl =
  //     `https://api.green-api.com/waInstance${IdInstance}/deleteNotification/${ApiTokenInstance}`;

  //     const deleteReceivedMessage = async (receiptId) => {
  //       try {
  //         await fetch(deleteNotificationUrl + "/" + receiptId, {
  //           method: "DELETE",
  //         });
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     const getMessage = async function () {
  //       try {
  //         let response = await fetch(receiveNotificationUrl, {
  //           method: "GET",
  //         });
  //         response = await response.json();
  //         console.log("response", response);
  //         if (response && response.body.typeWebhook === "incomingMessageReceived") {
  //           const receiptId = response.receiptId;
  //           const messageType = "incoming-message";
  //           const messageText = response.body.messageData.textMessageData.textMessage

  //           if (!uniqueId.current.includes(receiptId)) {
  //             setMessageStack((prevState) => [
  //               ...prevState,
  //               { receiptId, messageText, messageType },
  //             ]);
  //             uniqueId.current.push(receiptId);
  //           }

  //           deleteReceivedMessage(receiptId);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       debugger;
  //       getMessage();
  //     }, 5000);

  //     return () => clearInterval(interval);
  //   }, []);

  //   const sendMessage = async () => {
  //     const messageText = outgoingMessage
  //     const messageType = "outgoing-message"
  //     const receiptId = "out" + uniqueKeyOutgoingMessage.current
  //     uniqueKeyOutgoingMessage.current += 1
  //     if (!uniqueId.current.includes(receiptId)) {
  //       setMessageStack((prevState) => [
  //         ...prevState,
  //         { receiptId, messageText, messageType },
  //       ]);
  //       uniqueId.current.push(receiptId);
  //     }

  //     const headers = { "Content-Type": "application/json" };
  //     const payload = JSON.stringify({
  //       chatId: "79110073963@c.us",
  //       message: outgoingMessage,
  //     });
  //     try {
  //       await fetch(sendMessageUrl, {
  //         method: "POST",
  //         headers: headers,
  //         body: payload,
  //       });
  //       setOutgoingMessage("");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   console.log("messageStack", messageStack);

  //   return (
  //     <div className="App">
  //       <header></header>
  //       <div className="App-container">
  //         <div>
  //           {messageStack.map((message) => {
  //             return (
  //               <div
  //                 key={message.receiptId}
  //                 className={
  //                   message.messageType === "incoming-message"
  //                     ? "incoming-msg"
  //                     : "outgoing-msg"
  //                 }
  //               >
  //                 {message.messageText}
  //               </div>
  //             );
  //           })}
  //         </div>
  //         <input
  //           value={outgoingMessage}
  //           className="outgoing-msg"
  //           onChange={(event) => setOutgoingMessage(event.target.value)}
  //         ></input>
  //         <button className="send-msg-btn" onClick={sendMessage}>
  //           Отправить
  //         </button>
  //       </div>
  //     </div>
  //   );
}

export default App;
