import { useState } from "react";
// import "./Authentication.css";

function Authentication(props) {
  const [idValue, setIdValue] = useState("");
  const [tokenValue, setTokenValue] = useState("");

  // console.log(idValue, tokenValue);

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

  // console.log("authData", props.authData);

  // Отключение от инстанса
  const exitButtonHandler = () => {
    props.setAuthStatus(false);
    props.setAuthData({});
  };

  return (
    <div>
      {!props.authStatus ? (
        <div>
          <h6>Введите ваши данные из GREEN-API</h6>
          <label className="form-label">IdInstance</label>
          <div className="input-group input-group-sm mb-4">
            <input
              type="text"
              className="form-control custom-input custom-input_auth"
              aria-describedby="inputGroup-sizing-sm"
              name="IdInstance"
              value={idValue}
              onChange={(e) => setIdValue(e.target.value)}
            />
          </div>

          <label className="form-label">ApiTokenInstance</label>
          <div className="input-group input-group-sm mb-4">
            <input
              type="text"
              className="form-control custom-input custom-input_auth"
              aria-describedby="inputGroup-sizing-sm"
              value={tokenValue}
              name="ApiTokenInstance"
              onChange={(e) => setTokenValue(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-dark btn-sm"
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
              className="btn btn-dark btn-sm"
              onClick={exitButtonHandler}
            >
              Выйти
            </button>
          </div>
          <div className="authInfo__text">
            IdInstance: {props.authData.idInstance}
          </div>
        </div>
      )}
    </div>
  );
}

export default Authentication;
