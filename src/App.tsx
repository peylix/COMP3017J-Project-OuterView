import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Main } from './pages/Main'
import { ViewPage } from './pages/ViewPage'
import { ConferenceInformation } from './pages/ConferenceInformation'
import { ReservationPage } from './pages/ReservationPage'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/main" Component={Main} />
        <Route path="/viewPage" Component={ViewPage} />
        <Route path="/conferenceInformation" Component={ConferenceInformation} />
        <Route path="/reservationPage" Component={ReservationPage} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
