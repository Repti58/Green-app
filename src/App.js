import "./App.css";
import Authentication from "./Components/Authentication";
import Dialog from "./Components/Dialog/Dialog";
import Chatlist from "./Components/ChatList";
import { useState, useEffect } from "react";

function App() {
  const [chatNumber, setChatNumber] = useState("");
  const [messageStack, setMessageStack] = useState([]);
  const [authData, setAuthData] = useState({});
  const [authStatus, setAuthStatus] = useState(false);
  // console.log("authData in APP", authData);
  // console.log("chatNumber", chatNumber);

  const { idInstance, apiTokenInstance } = authData;


  // Отправляем настройки для API
  useEffect(() => {
    async function setApiSettings() {
      const headers = { "Content-Type": "application/json" };
      const setSettingsPayload = JSON.stringify({
        webhookUrl: "",
        webhookUrlToken: "",
        delaySendMessagesMilliseconds: 0,
        markIncomingMessagesReaded: "no",
        markIncomingMessagesReadedOnReply: "no",
        outgoingWebhook: "no",
        outgoingMessageWebhook: "no",
        outgoingAPIMessageWebhook: "no",
        incomingWebhook: "yes",
        stateWebhook: "no",
        keepOnlineStatus: "no",
      });
      const setSettingsUrl = `https://api.green-api.com/waInstance${idInstance}/setSettings/${apiTokenInstance}`;
      if (idInstance || apiTokenInstance) {
        try {
          await fetch(setSettingsUrl, {
            method: "POST",
            headers: headers,
            body: setSettingsPayload,
          })
          // .then(res => console.log(res))
        } catch (error) {
          console.error(error);
        }
      }
    }
    setApiSettings();
  }, [idInstance, apiTokenInstance]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4">
          <div
            className={
              authStatus ? "auth-wrapper auth-wrapper_min" : "auth-wrapper"
            }
          >
            <Authentication
              setAuthStatus={setAuthStatus}
              authStatus={authStatus}
              authData={authData}
              setAuthData={setAuthData}
            ></Authentication>
          </div>
          <Chatlist
            setMessageStack={setMessageStack}
            setChatNumber={setChatNumber}
          ></Chatlist>
        </div>

        <div className="col">
          <Dialog
            authStatus={authStatus}
            authData={authData}
            chatNumber={chatNumber}
            messageStack={messageStack}
            setMessageStack={setMessageStack}
          ></Dialog>
        </div>
      </div>
    </div>
  );
}

export default App;
