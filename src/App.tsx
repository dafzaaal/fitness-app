
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import LoginComponent from './components/login.tsx';
import DashboardComponent from './components/dashboard.tsx';
import CreateAccountComponent from './components/create.tsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent/>}></Route>
          <Route path='/dashboard' element={<DashboardComponent/>}></Route>
          <Route path='/create' element={<CreateAccountComponent/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
