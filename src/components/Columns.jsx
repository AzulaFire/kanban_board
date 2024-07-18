import { useState } from 'react';
import { useStore } from '../store';
import Task from './Task';
import { shallow } from 'zustand/shallow';
import classNames from 'classnames';

// eslint-disable-next-line react/prop-types
const Columns = ({ state, bgColor }) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );

  const addTask = useStore((store) => store.addTask);

  // Create a new Date object
  let currentDate = new Date();

  // Get the ISO string representation (e.g., "2024-07-17T12:00:00.000Z")
  let isoDateString = currentDate.toISOString();

  // Extract the YYYY-MM-DD part
  let formattedDate = isoDateString.split('T')[0];

  return (
    <div
      className={classNames('columns' + ' ' + bgColor, { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={() => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className='titleWrapper'>
        <p className='title'>{state}</p>
        <button onClick={() => setOpen(true)}>Add Task</button>
      </div>
      {tasks.map((task) => (
        <Task key={task.id} taskTitle={task.title} />
      ))}
      {open && (
        <div className='Modal'>
          <div className='modalContent'>
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <button
              onClick={() => {
                text.length > 0 && addTask(text, state, formattedDate);
                setText('');
                setOpen(false);
              }}
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Columns;

// YT 26.05
