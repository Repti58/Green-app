import { useRef, useState } from "react";
// import "./ChatList.css";

function Chatlist(props) {
  const [chat, setChat] = useState("");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const inputNumberHandler = (event) => {
    if (event.key == "Enter") {
      activateChat();
      // console.log("inputValue", inputValue);
    } else {
      const value = event.target.value.replace(/[^0-9]/g, "");
      setInputValue(value);
    }
  };

  //   Подключение чата
  const activateChat = () => {
    debugger;
    // console.log("inputValue", inputValue);
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
  //   console.log("chats", chat);

  return (
    <div className="chats">
      <label className="form-label">Введите номер телефона</label>
      <div className="input-group input-group-sm mb-4">
        <input
          className="form-control custom-input custom-input_auth"
          aria-describedby="inputGroup-sizing-sm"
          ref={inputRef}
          placeholder={"79991234567"}
          type="text"
          value={inputValue}
          onChange={inputNumberHandler}
          onKeyUp={inputNumberHandler}
        />
      </div>
      <button onClick={activateChat} className="btn btn-dark btn-sm">
        Добавить чат
      </button>
      {chat ? <div className="active-chat">Активный чат: {chat}</div> : null}
    </div>
  );
}
export default Chatlist;
