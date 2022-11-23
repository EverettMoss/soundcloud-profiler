import { useEffect, useState } from 'react';
import axios from 'axios'

function App() {
  const [accountName, setAccountName] = useState(null)
  const [tracks, setTracks] = useState(null)
  const [order, setOrder] = useState('ASC')

  const getTracks = async () => {
    const response = await axios.get(`http://localhost:8000/tracks/${accountName}`)
    const data = response.data
    setTracks(data)
  }

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

  const getTotalStreams = () => {
    let sum = 0;
    tracks.forEach(track => {
      sum += track.plays;
    });

    return sum;
  };

  const sorting = (col) => {
    const sorted = tracks.sort((a,b) => (a.plays > b.plays) ? -1 : 1)
    setTracks(sorted)
    console.log(tracks)

    /*
    if (order == 'ASC') {
      const sorted = tracks.sort((a,b) => (a.plays > b.plays) ? -1 : 1)
      setTracks(sorted)
      console.log(order + ": " + sorted)
      setOrder('DESC')
    }

    if (order == 'DESC') {
      const sorted = tracks.sort((a,b) => (a.col < b.col) ? 1 : -1)
      setTracks(sorted)
      console.log(order + ": " + sorted)
      setOrder('ASC')
    }
    */
    
  }

  useEffect(() => {
    console.log('changes in tracks')

  }, [tracks])

  return (
    <>

      {tracks ?
        <>
          <div className='absolute top-0 right-0 m-3'>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={clearTracks}>
              refresh
            </button>
          </div>

          <div className='grid h-screen place-items-center'>
            <div className='overflow-y-auto h-3/5'>
              <div className="overflow-x-auto overflow-y-auto relative shadow-md sm:rounded-lg w-7/10">
                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                  <thead className="text-xs text-white uppercase bg-indigo-600 dark:text-white">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        Song
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Artist
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Genre
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Likes
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Reposts
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Comments
                      </th>
                      <th scope="col" className="py-3 px-6" onClick={() => sorting('plays')}>
                        Plays
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tracks.map((track) => {
                        return (
                          <>
                            <tr className="bg-indigo-100 border-b border-indigo-400 text-indigo-500">
                              <th scope="row" className="py-4 px-6 font-medium text-indigo-500 whitespace-nowrap dark:text-indigo-500">
                                <a href={track.link} target='_blank'>{track.title}</a>
                              </th>
                              <td className="py-4 px-6">
                                <a href={track.artist_link} target='_blank'>{track.artist}</a>
                              </td>
                              <td className="py-4 px-6">
                                {track.genre}
                              </td>
                              <td className="py-4 px-6">
                                {track.likes}
                              </td>
                              <td className="py-4 px-6">
                                {track.reposts}
                              </td>
                              <td className="py-4 px-6">
                                {track.comments.toLocaleString()}
                              </td>
                              <td className="py-4 px-6">
                                {track.plays.toLocaleString()}
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
            <h2 className='text-lg text-indigo-500 font-semibold m-10'>{accountName} has {tracks.length} songs with {getTotalStreams(tracks).toLocaleString()} streams.</h2>
          </div>
        </>
        :
        <>
          <div className='grid h-screen place-items-center'>
            <div>
              <p>Account Name:</p>
              <form onSubmit={handleSubmit}>
                <input type="text" id="accountName" onChange={(e) => updateAccountName(e)} className='md:w-3/5 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500' />
                <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 m-2 rounded" onSubmit={handleSubmit}>
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
