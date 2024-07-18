import { useState } from 'react';
import classNames from 'classnames';
import { useStore } from '../store';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const Task = ({ taskTitle }) => {
  const [text, setText] = useState(taskTitle);
  const [open, setOpen] = useState(false);

  const setDraggedTask = useStore((store) => store.setDraggedTask);

  const task = useStore((store) =>
    store.tasks.find((task) => task.title === taskTitle)
  );

  const deleteTask = useStore((store) => store.deleteTask);
  const editTask = useStore((store) => store.editTask);
  const editDate = useStore((store) => store.editDate);

  // Create a new Date object
  let currentDate = new Date();

  // Get the ISO string representation (e.g., "2024-07-17T12:00:00.000Z")
  let isoDateString = currentDate.toISOString();

  // Extract the YYYY-MM-DD part
  let formattedDate = isoDateString.split('T')[0];

  return (
    <div className='task' draggable onDragStart={() => setDraggedTask(task.id)}>
      <div className='taskWrapper'>
        <div>{taskTitle}</div>
        <div className='date'>{task.date}</div>
      </div>

      <div className='bottomWrapper'>
        <div className='iconsWrapper'>
          <div>
            <FaRegTrashAlt
              className='deleteIcon'
              onClick={() => deleteTask(task.id)}
            />
          </div>

          <div>
            <FaEdit className='editIcon' onClick={() => setOpen(true)} />
          </div>
        </div>

        <div className={classNames('status', task.state)}>{task.state}</div>
      </div>
      {open && (
        <div className='Modal'>
          <div className='modalContent'>
            <input
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
            />
            <button
              onClick={() => {
                editTask(task.id, text);
                editDate(task.id, formattedDate);
                setText('');
                setOpen(false);
              }}
            >
              Update Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
