/* eslint-disable no-unused-vars */
import { create } from 'zustand';

// eslint-disable-next-line no-unused-vars
const taskStore = (set) => ({
  draggedTask: null,
  tasks: [
    {
      id: 1,
      title: 'Task 1',
      state: 'PLANNED',
      date: '2022-01-01',
    },
    {
      id: 2,
      title: 'Task 2',
      state: 'ONGOING',
      date: '2022-04-11',
    },
    {
      id: 3,
      title: 'Task 3',
      state: 'DONE',
      date: '2024-07-17',
    },
    {
      id: 4,
      title: 'Task 4',
      state: 'DONE',
      date: '2023-11-28',
    },
    {
      id: 5,
      title: 'Task 5',
      state: 'TESTING',
      date: '2022-04-15',
    },
    {
      id: 6,
      title: 'Task 6',
      state: 'ONGOING',
      date: '2022-01-01',
    },
  ],
  addTask: (title, state, date) =>
    set((store) => ({
      tasks: [
        ...store.tasks,
        { id: store.tasks.length + 1, title, state, date },
      ],
    })),
  deleteTask: (id) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.id !== id),
    })),
  editTask: (id, title) =>
    set((store) => ({
      tasks: store.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title };
        }
        return task;
      }),
    })),
  editDate: (id, date) =>
    set((store) => ({
      tasks: store.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, date };
        }
        return task;
      }),
    })),
  setDraggedTask: (task) => set({ draggedTask: task }),
  moveTask: (id, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, state };
        }
        return task;
      }),
    })),
});

export const useStore = create(taskStore);
