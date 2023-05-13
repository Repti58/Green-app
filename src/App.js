import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  // debugger
  const [incomingMsg , setIncomingMsg] = useState([])
  
  // const sendMessage = "https://api.green-api.com/waInstance1101819635/sendMessage/336bca218a3f4f728a16912bbeb3f4786de9401d34a14089ad";
  const receiveNotification = "https://api.green-api.com/waInstance1101819635/receiveNotification/336bca218a3f4f728a16912bbeb3f4786de9401d34a14089ad";
  const deleteNotification = "https://api.green-api.com/waInstance1101819635/deleteNotification/336bca218a3f4f728a16912bbeb3f4786de9401d34a14089ad";
  // const url = "example.com"
// const headers = {'Content-Type': 'application/json'};

// const payload = JSON.stringify({
//   "chatId": "79956073963@c.us",
// 	"message": "XXXTESTXXX",
// })
const deleteReceivedMsg = function(receiptId) {
  fetch(deleteNotification + "/" + receiptId, {
    method: "DELETE"
  })
}

const getMsg = async function() {
let response = await fetch(receiveNotification, {
  method: "GET",  
  // headers: headers,
  // body: payload
})
response = await response.json()
console.log(response)
if(response) {
  const receiptId = response.receiptId
  const messageText = response.body.messageData.textMessageData.textMessage
  const messageType = response.body.typeWebhook
  console.log(messageText);
  setIncomingMsg([...incomingMsg, {messageText, messageType}])
  console.log(incomingMsg);
  deleteReceivedMsg(receiptId)
}
}

  return (
    <div className="App">
      <header>       
      </header>
      <div className='App-container'>
        <div>
        {incomingMsg.map((msg) => {
          return <div className={
            msg.messageType == "incomingMessageReceived" ? "incoming-msg" : "outgoing-msg"
          }>{msg.messageText}</div>

        })}
        </div>
        <button className='send-msg-btn' onClick={getMsg}>получить</button>
        <input className='outgoing-msg'></input>
        <button className='send-msg-btn'>Отправить</button>

      </div>
    </div>
  );
}

export default App;
