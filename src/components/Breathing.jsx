import { useEffect, useState } from "react";

function Breathing() {
  const [phase, setPhase] = useState("inhale");
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(4);
  const [rounds, setRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          if (phase === "inhale") setPhase("hold");
          else if (phase === "hold") setPhase("exhale");
          else if (phase === "exhale") setPhase("inhale");
          if (phase === "exhale") {
            if (currentRound < rounds) {
              setCurrentRound((prevRound) => prevRound + 1);
            } else {
              setRunning(false);
              setCurrentRound(1);
              setPhase("inhale");
              alert(
                "Great job completing your breathing exercises! Take a moment to relax and enjoy the calmness.",
              );
              return 4;
            }
          }
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, phase, currentRound, rounds]);

  const resetButton = () => {
    setRunning(false);
    setPhase("inhale");
    setCurrentRound(1);
    setTime(4);
  };

  return (
    <div>
      <br />
      <br />
      <h2> Breathing Exercises</h2>
      <p>
        Practice deep breathing techniques to relax and improve sleep quality.{" "}
        <br />
        Follow the prompts to inhale, hold, and exhale for optimal relaxation.{" "}
        <br />
        Let's practice 5 rounds of 4-4-4 breathing to destress together!
      </p>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <select
          name="rounds"
          id="rounds"
          onChange={(e) => setRounds(parseInt(e.target.value))}
          disabled={running}
        >
          <option value="5">5 rounds</option>
          <option value="10">10 rounds</option>
          <option value="15">15 rounds</option>
        </select>
        <br />
        <button
          onClick={() => setRunning(true)}
          style={{ backgroundColor: "lightgreen", border: "solid 3px green" }}
        >
          Start
        </button>
        <button
          onClick={() => setRunning(false)}
          style={{ backgroundColor: "lightcoral", border: "solid 3px red" }}
        >
          Stop
        </button>
        <button
          onClick={resetButton}
          style={{ backgroundColor: "lightgray", border: "solid 3px gray" }}
        >
          Reset
        </button>
      </div>

      <div className="breathing-container">
        <div className={`breathing-circle ${running ? phase : ""}`}>
          <span>
            <div
              className="breathing-info"
              style={{ textAlign: "center", marginTop: "20px" }}
            >
              <h3 style={{ textAlign: "center" }}>
                {phase.charAt(0).toUpperCase() + phase.slice(1)}
              </h3>
              <p>
                {time} seconds left of {phase}
              </p>
              <p>
                Round {currentRound} of {rounds}
              </p>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Breathing;
