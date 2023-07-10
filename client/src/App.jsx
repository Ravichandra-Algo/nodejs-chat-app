import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import {nanoid} from "nanoid"

const socket = io.connect("http://localhost:5000/");
const user = nanoid(4)

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMsg = (e) => {
    e.preventDefault();
    socket.emit("chat",{message,user})
    setMessage("")
  };

  useEffect(()=>{
socket.on("chat", (payload)=>{
  setChat([...chat, payload])
})
  },[chat])
  return (
    <div className="App">
      <h1>Chat App</h1>
      <br />
      {chat.map((payload,index)=>{
        return (
          <p key={index}>
            {payload.message} : <span>{payload.user}</span>
          </p>
        )
      })}
      <br />
      <form onSubmit={sendMsg}>
        <input
          type="text"
          name="chat"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
