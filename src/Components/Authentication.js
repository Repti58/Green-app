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
// Временная функция!!!
const exitButtonHandler = () => {
  props.setAuthStatus(false);
  props.setAuthData({});
};
// Временная функция!!!

  const tempButtonHandler = () => {
    setIdValue("1101820240")
    setTokenValue("6c0edc4dd2c1478c94564418912b7f13c64b506d27824caabe")
  }

  return (
    <div>
      {!props.authStatus ? (
        <div>
          <div>Введите ваши данные из Green-Api</div>
          <div>IdInstance</div>
          <input
            name="IdInstance"
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
          ></input>
          <div>ApiTokenInstance</div>
          <input
          value={tokenValue}
            name="ApiTokenInstance"
            onChange={(e) => setTokenValue(e.target.value)}
          ></input>

          {/* !!!!Временная кнопка!!!! */}
          <button name="temp" onClick={tempButtonHandler}>TMP</button>
          {/* !!!!Временная кнопка!!!! */}

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
