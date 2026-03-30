import { useState, useEffect } from "react";

function Checklist() {
  const [completed, setCompleted] = useState(0);
  const [tasks, setTasks] = useState([
    { id: 0, text: "Turn off all devices", completed: false, isCustom: false },
    { id: 1, text: "Brush your teeth", completed: false, isCustom: false },
  ]);

  const handleTask = (id) => {
    if (tasks[id].completed) setCompleted(completed - 1);
    else setCompleted(completed + 1);
  };

  return (
    <div>
      <h2>Sleep Checklist</h2>
      <p>
        Make sure you've done all the things you need to do before you sleep!
        <br />
        Having a consistent routine is essential for good sleep hygiene. Here
        <br />
        are a few suggestions to start with:
      </p>
      <div className="checkboxes">
        {tasks.map((task) => {
          return (
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTask(task.id)}
                id={task.text}
                name={task.text}
              />
              <label htmlFor={task.text}>{task.text}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Checklist;
