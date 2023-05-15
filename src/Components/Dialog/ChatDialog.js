import React, { useRef, useEffect } from "react";

function ChatDialog(props) {
  const dialogRef = useRef(null);

  //   Скролл в конец диалога при поступлении новых сообщений
  useEffect(() => {
    const dialogWrapper = dialogRef.current;
    setTimeout(() => {
      dialogWrapper.scrollTop =
        dialogWrapper.scrollHeight - dialogWrapper.clientHeight;
    }, 100);
  }, [props.messageStack]);

  return (
    <div className="dialog-wrapper" ref={dialogRef}>
      {props.messageStack.map((message) => {
        return (
          <div className="message-wrapper">
            <div
              key={message.receiptId}
              className={
                message.messageType === "incoming-message"
                  ? "alert alert-warning"
                  : "alert alert-success"
              }
            >
              {message.messageText}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatDialog;
