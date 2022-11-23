import { useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [accountName, setAccountName] = useState(null)
  const [tracks, setTracks] = useState(null)

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

  const clearTracks = () => {
    setTracks(null)
  };

  return (
    <>

      {tracks ?
        <>
          <div className='absolute top-0 right-0'>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={clearTracks}>
              refresh
            </button>
          </div>

          <div className='grid h-screen place-items-center'>
            <div className=''>
              <div class="overflow-x-auto overflow-y-auto relative shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                  <thead class="text-xs text-white uppercase bg-indigo-600 dark:text-white">
                    <tr>
                      <th scope="col" class="py-3 px-6">
                        Song
                      </th>
                      <th scope="col" class="py-3 px-6">
                        Artist
                      </th>
                      <th scope="col" class="py-3 px-6">
                        Genre
                      </th>
                      <th scope="col" class="py-3 px-6">
                        Comments
                      </th>
                      <th scope="col" class="py-3 px-6">
                        Plays
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tracks.map((track) => {
                        return (
                          <>
                            <tr class="bg-indigo-100 border-b border-indigo-400 text-indigo-500">
                              <th scope="row" class="py-4 px-6 font-medium text-indigo-500 whitespace-nowrap dark:text-indigo-500">
                                {track.title}
                              </th>
                              <td class="py-4 px-6">
                                {track.artist}
                              </td>
                              <td class="py-4 px-6">
                                {track.genre}
                              </td>
                              <td class="py-4 px-6">
                                {track.comments}
                              </td>
                              <td class="py-4 px-6">
                                {track.plays}
                              </td>
                            </tr>
                          </>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
        :
        <>
          <div className='grid h-screen place-items-center'>
            <div>
              <p>Account Name:</p>
              <form onSubmit={handleSubmit}>
                <input type="text" id="accountName" onChange={(e) => updateAccountName(e)} className='md:w-3/5 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500' />
                <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded" onSubmit={handleSubmit}>
                  submit
                </button>
              </form>
            </div>
          </div>
        </>
      }
    </>

  );
}

export default App;
