import React, { useState, useEffect, useRef } from 'react';

function TaskForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(input);

    props.addTask(input);
    setInput('');
  };

  return (
    <form className='task-form' onSubmit={handleSubmit}>
      {props.edit ? (
        <div>
          <input
            placeholder='Update your task'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='task-input edit'
          />
          <button type="submit" className='task-button edit'>
            Update
          </button>
        </div>
      ) : (
        <div>
          <input
            placeholder='Add a task'
            value={input}
            onChange={handleChange}
            name='text'
            className='task-input'
            ref={inputRef}
          />
          <button type="submit" className='task-button'>
            Add task
          </button>
        </div>
      )}
    </form>
  );
}

export default TaskForm;