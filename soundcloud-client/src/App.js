import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [accountName, setAccountName] = useState(null)
  const [tracks, setTracks] = useState([])

  const getTracks = async () => {
    const response = await axios.get(`http://localhost:8000/tracks/${accountName}`)
    const data = response.data
    console.log(data)
    setTracks(data)
  }

  /*
  const sortEm = () => {
    const r = tracks.sort(({ plays: a }, { plays: b }) => b - a);
    console.log(r);
  };
  */


  const updateAccountName = (e) => {
    setAccountName(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    getTracks()
  };

  return (
    <>
      <div className='grid h-screen place-items-center'>
        <div>
          <p>Account Name:</p>
          <form onSubmit={handleSubmit}>
            <input type="text" id="accountName" onChange={(e) => updateAccountName(e)} className='md:w-3/5 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' />
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onSubmit={handleSubmit}>
              send it
            </button>
          </form>
          {accountName}
        </div>
      </div>
    </>

  );
}

export default App;
