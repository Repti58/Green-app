import { useState } from "react";
import "./Authentication.css";

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
    setIdValue("1101820240");
    setTokenValue("6c0edc4dd2c1478c94564418912b7f13c64b506d27824caabe");
  };

  return (
    <div>
      {!props.authStatus ? (
        <div>
          <h6>Введите ваши данные из GREEN-API</h6>
          <label className="form-label">IdInstance</label>
          <div className="input-group input-group-sm mb-4">
            {/* <span className="input-group-text" >IdInstance</span> */}
            <input
              type="text"
              className="form-control"
              aria-describedby="inputGroup-sizing-sm"
              name="IdInstance"
              value={idValue}
              onChange={(e) => setIdValue(e.target.value)}
            />
          </div>

          <label className="form-label">ApiTokenInstance</label>
          <div className="input-group input-group-sm mb-4">
            {/* <span className="input-group-text" >ApiTokenInstance</span> */}
            <input
              type="text"
              className="form-control"
              aria-describedby="inputGroup-sizing-sm"
              value={tokenValue}
              name="ApiTokenInstance"
              onChange={(e) => setTokenValue(e.target.value)}
            />
          </div>

          {/* !!!!Временная кнопка!!!! */}
          <button
            name="temp"
            type="button"
            class="btn btn-dark btn-sm"
            onClick={tempButtonHandler}
          >
            TMP
          </button>
          {/* !!!!Временная кнопка!!!! */}

          <button
            type="button"
            class="btn btn-dark btn-sm"
            onClick={submitAuthHandler}
          >
            Войти
          </button>
        </div>
      ) : (

        
          <div className="authInfo">
            <div>
            <button
              name="exitButton"
              class="btn btn-dark btn-sm"
              onClick={exitButtonHandler}
            >
              Выйти
            </button>
            </div>
            <div className="authInfo__text">IdInstance: {props.authData.idInstance}</div>
          </div>
          
        
      )}
    </div>
  );
}

export default Authentication;
