import { useRef, useState } from "react";
import "./ChatList.css";

function Chatlist(props) {
  const [chat, setChat] = useState("");
  const [inputValue, setInputValue] = useState("");
  //   const [inputClassName, setInputClassName] = useState("inputNumber");
  const inputRef = useRef(null);
  const inputNumberHandler = (event) => {
    debugger;
    if (event.key == "Enter") {
      activateChat();
      console.log("inputValue", inputValue);
    } else {
      const value = event.target.value.replace(/[^0-9]/g, "");
      setInputValue(value);
    }
  };

  const activateChat = () => {
    debugger;
    console.log("inputValue", inputValue);
    if (inputValue) {
      setChat(inputValue);
      props.setChatNumber(inputValue);
      props.setMessageStack([]);
      setInputValue("");
      inputRef.current.classList.remove("inputNumber_alert");
    } else {
      inputRef.current.classList.add("inputNumber_alert");
    }
  };
  console.log("chats", chat);


//   Временные функции!!!
const tempButtonHandler1 = () => {
    setInputValue("79110073963")
}
const tempButtonHandler2 = () => {
    setInputValue("79956073963")
}
//   Временные функции!!!


  return (
    <div className="chats">
      <div>Добавить чат</div>

      <input
        ref={inputRef}
        className="inputNumber"
        placeholder={"79991234567"}
        type="text"
        value={inputValue}
        onChange={inputNumberHandler}
        onKeyUp={inputNumberHandler}
      ></input>
      <button onClick={activateChat}>O</button>

      {/* Временные кнопки */}
<button name="79110073963" onClick={tempButtonHandler1}>79110073963</button>
<button name="79956073963" onClick={tempButtonHandler2}>79956073963</button>
      {/* Временные кнопки */}

      <div>{chat}</div>
    </div>
  );
}
export default Chatlist;
