import { Routes, Route, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import Row from './components/Row';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import './App.css';

const Layout = () => {
  return (
    <div>
      <Nav/>

      <Outlet/>
      {/* Layout 컴포넌트에서 자식 경로 컴포넌트를 담기 위해 사용 */}
    </div>
  )
}

function App() {
  return (
   <div className='app'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="main" element={<MainPage />} />

          {/* path명이 동적으로 들어갈 시 사용 */}
          <Route path=":movieId" element={<DetailPage />} />


          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
   </div>
  );
}

export default App;


