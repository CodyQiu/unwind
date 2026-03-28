import React, { useState, useEffect } from "react";

function Journal() {
  const [numEntries, setNumEntries] = useState(0);
  const [message, setMessage] = useState("");

  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  const handleSave = () => {
    const newEntry = {
      id: Date.now(),
      content: document.querySelector("textarea").value,
    };
    if (newEntry.content.length === 0) {
      setMessage(
        "I know you have thoughts, let them out! Don't be shy, just write whatever comes to mind.",
      );
      return;
    }
    entries.push(newEntry);
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    setNumEntries(numEntries + 1);
    document.querySelector("textarea").value = "";
    setMessage("Entry saved successfully!");
  };
  return (
    <div>
      <h2>Sleep Journal</h2>
      <p>What's on your mind today?</p>
      <textarea
        name=""
        id=""
        placeholder="Dump all your thoughts and feelings here..."
        style={{ width: "95%", height: "150px" }}
      ></textarea>
      <button onClick={handleSave}>Save Entry</button>
      {message && message[0] === "I" && (
        <p style={{ color: "#6c802a" }}>{message}</p>
      )}
      {message && message[0] === "E" && (
        <p style={{ color: "green" }}>{message}</p>
      )}
      <br />
      <br />
      <br />
      <h3>Previous Entries</h3>
      {entries.length === 0 && (
        <p>Nothing here yet! Just thoughts, waiting to be formed...</p>
      )}
      {entries
        .slice()
        .reverse()
        .map((entry) => (
          <div
            key={entry.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "lightyellow",
            }}
          >
            <p>{new Date(entry.id).toLocaleDateString()}</p>
            {entry.content}
          </div>
        ))}
    </div>
  );
}

export default Journal;
