import React, { useState, useEffect } from "react";

function Journal() {
  const [numEntries, setNumEntries] = useState(0);
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState([]);
  const [expandedEntry, setExpandedEntry] = useState(null);

  useEffect(() => {
    const savedEntries =
      JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(savedEntries);
  }, []);

  const handleSave = () => {
    const newEntry = {
      id: Date.now(),
      content: document.querySelector("textarea").value,
    };
    if (newEntry.content.length === 0) {
      setMessage(
        "I know you have thoughts, let them out! Don't be shy, just write whatever comes to mind.",
      );
      setTimeout(() => {
        setMessage("");
      }, 2500);
      return;
    }
    setEntries([...entries, newEntry]);
    localStorage.setItem(
      "journalEntries",
      JSON.stringify([...entries, newEntry]),
    );
    setNumEntries(numEntries + 1);
    document.querySelector("textarea").value = "";
    setMessage("Entry saved successfully!");
    setTimeout(() => {
      setMessage("");
    }, 2500);
  };
  const handleDelete = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setNumEntries(numEntries - 1);
    setMessage("Entry deleted successfully!");
    setTimeout(() => {
      setMessage("");
    }, 2500);
  };
  const handleExpand = (id) => {
    if (expandedEntry === id) {
      setExpandedEntry(null);
    } else {
      setExpandedEntry(id);
    }
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
        <p className="message" style={{ color: "#6c802a" }}>
          {message}
        </p>
      )}
      {message && message[0] === "E" && (
        <p className="message" style={{ color: "green" }}>
          {message}
        </p>
      )}
      <br />
      <br />
      <br />
      <h3>Previous Entries</h3>
      {entries.length === 0 && (
        <p>Nothing here yet! Just thoughts, waiting to be formed...</p>
      )}
      <div className="container">
        {entries
          .slice()
          .reverse()
          .map((entry) => {
            const isExpanded = expandedEntry === entry.id;
            return (
              <div
                key={entry.id}
                className={
                  expandedEntry === entry.id
                    ? "entry-card-expanded"
                    : "entry-card"
                }
              >
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(entry.id)}
                >
                  x
                </button>
                <p>{new Date(entry.id).toLocaleDateString()}</p>
                {isExpanded ? (
                  <p>{entry.content}</p>
                ) : (
                  <p>{entry.content.slice(0, 150)}</p>
                )}
                {entry.content.length > 150 && (
                  <button
                    className="expand-btn"
                    onClick={() => handleExpand(entry.id)}
                  >
                    {isExpanded ? "Show Lesss" : "Read More"}
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Journal;
