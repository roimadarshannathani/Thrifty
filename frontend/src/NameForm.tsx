import React, { useState } from "react";

interface NameFormProps {
  onSetName: (name: string) => void;
}

const NameForm: React.FC<NameFormProps> = ({ onSetName }) => {
  const [input, setInput] = useState("");
  return (
    <div
      style={{
        textAlign: "center",
        background: "#fff",
        padding: 32,
        borderRadius: 8,
        boxShadow: "0 2px 8px #0001",
      }}
    >
      <label htmlFor="name" style={{ marginRight: 8, fontWeight: 600 }}>
        Name:
      </label>
      <input
        type="text"
        id="name"
        placeholder="Enter your name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ marginRight: 12 }}
      />
      <button
        onClick={() => {
          if (input.trim()) onSetName(input.trim());
        }}
        disabled={!input.trim()}
      >
        Join Chat
      </button>
    </div>
  );
};

export default NameForm;
