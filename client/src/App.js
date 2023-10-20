import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import NotFoundPage from './pages/NotFoundPage.';
import NavBar from './NavBar';
import LoginPage from './pages/LoginPage';
import CreateAccount from './pages/CreateAccount';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <NavBar/>
          <div id="page-body">
            <Routes>
            <Route path="/" element={<HomePage/>}/>
              <Route path="/about" element={<AboutPage/>}/>
              <Route path="/articles/:articleId" element={<ArticlePage/>}/>
              <Route path="/articles" element={<ArticlesListPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/create-account" element={<CreateAccount/>}/>
              <Route path="*" element={<NotFoundPage/>}/>  
            </Routes>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
