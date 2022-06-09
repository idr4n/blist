import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookmarkPage from './pages/bookmark/BookmarkPage';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';
import Landing from './pages/home/Landing';
import Login from './pages/login/Login';

function App() {
  return (
    <div className='min-h-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Landing />} />
            <Route path='login' element={<Login />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='bookmarks'>
              <Route path=':id' element={<BookmarkPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
