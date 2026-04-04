import { useState, useEffect } from "react";

function Checklist() {
  const [completed, setCompleted] = useState(0);
  const [tasks, setTasks] = useState([
    {
      id: Date.now(),
      text: "Turn off all devices",
      completed: false,
      isCustom: false,
    },
    {
      id: Date.now() + 1,
      text: "Brush your teeth",
      completed: false,
      isCustom: false,
    },
  ]);
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("checklistTasks"));
    if (savedTasks) {
      setTasks(savedTasks);
      setCompleted(savedTasks.filter((task) => task.completed).length);
    }
  }, []);

  const handleTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (tasks[index].completed) setCompleted(completed - 1);
    else setCompleted(completed + 1);
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    );
  };
  const handleAdd = () => {
    const newTask = prompt("Enter a new task:");
    for (let task of tasks) {
      if (task.text === newTask) {
        alert("You already have this task on your checklist!");
        return;
      }
    }
    if (newTask) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false, isCustom: true },
      ]);
      localStorage.setItem(
        "checklistTasks",
        JSON.stringify([
          ...tasks,
          { id: Date.now(), text: newTask, completed: false, isCustom: true },
        ]),
      );
    }
  };

  const handleDelete = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (tasks[index].completed) setCompleted(completed - 1);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    localStorage.setItem("checklistTasks", JSON.stringify(newTasks));
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
            <div key={task.id} className="checkbox-container">
              <input
                className="checkbox"
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTask(task.id)}
                id={Date.now()}
                name={task.text}
              />
              <label htmlFor={task.text}>{task.text}</label>
              <button
                className="delete-button"
                onClick={() => handleDelete(task.id)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
      <h3 className="completed">
        Completed: {completed}/{tasks.length}
      </h3>
      <button onClick={() => handleAdd()}>Add Task</button>
    </div>
  );
}

export default Checklist;
