import './App.css';
import Columns from './components/Columns';

function App() {
  // Create a new Date object
  let currentDate = new Date();

  // Options for date formatting
  let options = {
    weekday: 'long', // Display full weekday name (e.g., "Monday")
    year: 'numeric', // Display full year (e.g., "2024")
    month: 'long', // Display full month name (e.g., "January")
    day: 'numeric', // Display day of the month (e.g., "1")
  };

  // Format the date according to options
  let formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <>
      <div className='header'>
        <div className='logoWrapper'>
          <img src='/kanban-board.svg' alt='Kanban Board' className='logo' />
          <h2>KANBAN BOARD</h2>
        </div>

        <h4>{formattedDate}</h4>
      </div>
      <div className='App'>
        <Columns state={'PLANNED'} bgColor={'planned'} />
        <Columns state={'ONGOING'} bgColor={'ongoing'} />
        <Columns state={'TESTING'} bgColor={'testing'} />
        <Columns state={'DONE'} bgColor={'done'} />
      </div>
    </>
  );
}

export default App;
