import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Main } from './pages/Main'
import { ViewPage } from './pages/ViewPage'
import { ConferenceInformation } from './pages/ConferenceInformation'
import { ReservationPage } from './pages/ReservationPage'
import { Interview } from './pages/Interview'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    navigator.serviceWorker
      .register('/react-py-sw.js')
      .then((registration) =>
        console.log(
          'Service Worker registration successful with scope: ',
          registration.scope
        )
      )
      .catch((err) => console.log('Service Worker registration failed: ', err))
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Interview} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/main" Component={Main} />
        <Route path="/viewPage" Component={ViewPage} />
        <Route path="/conferenceInformation" Component={ConferenceInformation} />
        <Route path="/reservationPage" Component={ReservationPage} />

        <Route path="/interview/room" Component={Interview} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
