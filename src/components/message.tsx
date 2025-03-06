import React from "react";

interface MessageProps {
  type: "success" | "error" | "info";
  text: string;
}

const Message: React.FC<MessageProps> = ({ type, text }) => {
  const getMessageStyle = () => {
    switch (type) {
      case "success":
        return "alert alert-success";
      case "error":
        return "alert alert-danger";
      case "info":
        return "alert alert-info";
      default:
        return "";
    }
  };

  return (
    <div className={getMessageStyle()} role="alert">
      {text}
    </div>
  );
};

export default Message;
