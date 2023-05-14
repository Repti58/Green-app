import { useState } from "react";

function Authentication(props) {
  
  const [idValue, setIdValue] = useState("");
  const [tokenValue, setTokenValue] = useState("");

  console.log(idValue, tokenValue);

  const submitAuthHandler = () => {
    if (idValue || tokenValue) {
      props.setAuthData({
        ...props.authData,
        idInstance: idValue,
        apiTokenInstance: tokenValue,
      });
      props.setAuthStatus(true);
      setIdValue("");
      setTokenValue("");
    }
  };

  console.log("authData", props.authData);

  const exitButtonHandler = () => {
    props.setAuthStatus(false);
    props.setAuthData({});
  };

  return (
    <div>
      {!props.authStatus ? (
        <div>
          <div>Введите ваши данные из Green-Api</div>
          <div>IdInstance</div>
          <input
            name="IdInstance"
            onChange={(e) => setIdValue(e.target.value)}
          ></input>
          <div>ApiTokenInstance</div>
          <input
            name="ApiTokenInstance"
            onChange={(e) => setTokenValue(e.target.value)}
          ></input>
          <button onClick={submitAuthHandler}>Войти</button>
        </div>
      ) : (
        <span>
          <button name="exitButton" onClick={exitButtonHandler}>
            Выйти
          </button>
          <div>Ваш IdInstance {props.authData.idInstance}</div>
        </span>
      )}
    </div>
  );
}

export default Authentication;
