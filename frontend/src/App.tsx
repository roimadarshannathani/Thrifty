import { useState } from "react";
import "./App.css";
import ChatRoom from "./ChatRoom";
import NameForm from "./NameForm";

function App() {
  const [name, setName] = useState<string>("");
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {name ? <ChatRoom name={name} /> : <NameForm onSetName={setName} />}
      Developed by fellow intern, instance running on docker.
    </div>
  );
}

export default App;
