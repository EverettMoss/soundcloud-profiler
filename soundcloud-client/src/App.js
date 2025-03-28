import { useEffect, useState } from 'react'
import axios from 'axios'
import PulseLoader from "react-spinners/PulseLoader"
import ReactGA from 'react-ga4'
import { createBrowserHistory } from "history"

ReactGA.initialize("G-BP4LTGF4K6");
const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.send(location.pathname);
});
//ReactGA.send("pageview");

function App() {
  const [accountName, setAccountName] = useState(null)
  const [tracks, setTracks] = useState(null)
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState('ASC')

  const getTracks = async () => {
    setLoading(true)
    console.log(accountName)
    //const response = await axios.get(`https://soundcloud-profiler.onrender.com/tracks/${accountName}`)
    const response = await axios.get(`http://localhost:8000/tracks/${accountName}`)
    setLoading(false)
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
    setOrder('ASC')
  };

  const getTotalStreams = () => {
    let sum = 0;
    tracks.forEach(track => {
      sum += track.plays;
    });

    return sum;
  };

  const sorting = (col) => {
    if (order === 'ASC') {
      tracks.sort((a, b) => (a[col] > b[col]) ? -1 : 1)
      setOrder('DESC')
    }


    if (order === 'DESC') {
      tracks.sort((a, b) => (a[col] < b[col]) ? -1 : 1)
      setOrder('DESC')
      setOrder('ASC')
    }

  }

  useEffect(() => {
    //console.log('changes in tracks')

  }, [order])

  return (
    <>

      {tracks ?
        <>
          <div className=' absolute top-0 right-0 m-3'>
            <div className='flex items-center'>
              <a href={tracks[0].artist_link} target='_blank' rel="noreferrer">
                <img alt='soundcloud profile' class="w-10 h-10 rounded-full mr-3" src={tracks[0].profile_picture} />
              </a>
              <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={clearTracks}>
                back
              </button>
            </div>
          </div>

          <div className='grid h-screen place-items-center'>
            <div className='overflow-y-auto h-3/5 w-4/5'>
              <div className="overflow-x-auto overflow-y-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                  <thead className="text-xs text-white uppercase bg-indigo-600 dark:text-white">
                    <tr>
                      <th scope="col" className="w-2/12 py-3 px-6">
                        Song
                      </th>
                      <th scope="col" className="w-2/12 py-3 px-6">
                        Artist
                      </th>
                      <th scope="col" className="w-2/12 py-3 px-6">
                        Genre
                      </th>
                      <th scope="col" className="w-2/12 py-3 px-6" onClick={() => sorting('likes')}>
                        Likes
                      </th>
                      <th scope="col" className="w-1/12 py-3 px-6" onClick={() => sorting('reposts')}>
                        Reposts
                      </th>
                      <th scope="col" className="w-1/12 py-3 px-6" onClick={() => sorting('comments')}>
                        Comments
                      </th>
                      <th scope="col" className="w-2/12 py-3 px-6" onClick={() => sorting('plays')}>
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
                                <a href={track.link} target='_blank' rel="noreferrer">{track.title}</a>
                              </th>
                              <td className="py-4 px-6">
                                <a href={track.artist_link} target='_blank' rel="noreferrer">{track.artist}</a>
                              </td>
                              <td className="py-4 px-6">
                                {track.genre}
                              </td>
                              <td className="py-4 px-6">
                                {track.likes.toLocaleString()}
                              </td>
                              <td className="py-4 px-6">
                                {track.reposts.toLocaleString()}
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
            <h2 className='text-lg text-indigo-500 font-semibold m-10 lowercase'>{accountName} has {tracks.length} songs with {getTotalStreams(tracks).toLocaleString()} streams.</h2>
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
              {loading && (
                <>
                  <PulseLoader
                    color="#4338ca"
                    speedMultiplier={0.75}
                    size={10}
                  />
                </>
              )}
            </div>
          </div>
        </>
      }
    </>

  );
}

export default App;
