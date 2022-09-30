import React from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { useAuth0 } from "../../react-auth0-spa";
import axios from "axios";

const TaskList = (props) => {
  const [tasks, setTasks] = React.useState([]);
  const { getTokenSilently } = useAuth0();
  const addTask = async (text) => {
    try {
        const token = await getTokenSilently();

        const response = await axios.post("https://task-appt.herokuapp.com/task", {
            title: text,
            description: 'description',
            isComplete: false
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const responseData = await response.data;

        props.setShowResult(true);
        props.setApiMessage(response.data);
    } catch (error) {
        console.error(error);
    }
    // const newTasks = [task, ...tasks];

    // setTasks(newTasks);
};
  // const addTask = task => {
  //   if (!task.text || /^\s*$/.test(task.text)) {
  //     return;
  //   }

  //   props.callApi2(task.text)
  //   const newTasks = [task, ...tasks];

  //   setTasks(newTasks);
  // };

  const updateTask = (taskId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTasks(prev => prev.map(item => (item.id === taskId ? newValue : item)));
  };

  const removeTask = id => {
    const removeArr = [...tasks].filter(task => task.id !== id);

    setTasks(removeArr);
  };

  const completeTask = id => {
    let updatedTasks = tasks.map(task => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TaskForm 
      addTask={addTask}
      tasks={tasks}
      setTasks={setTasks}

       />
      <Task
        tasks={tasks}
        completeTask={completeTask}
        removeTask={removeTask}
        updateTask={updateTask}
      />
    </div>
  );
}

export default TaskList;
