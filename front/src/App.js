import './App.css';
import { useState } from 'react';
import Navbar from "./components/navbar";
import Footer from './components/footer';
import Home from './components/home';
import Account from './components/account';
import Posts from "./components/posts"
import CreatePost from './components/create-post';
import AuthForm from './components/authform';
import PageNotFound from './components/pagenotfound';
import { Navigate, Route, Routes } from 'react-router-dom';
import { globalThemeContext } from "./globalThemeContext";
import "./themes.css";
import Cookies from "universal-cookie";


function App(props) {
  const cookies = new Cookies();

  const [theme, setTheme] = useState(cookies.get("theme"));
  
  function changeTheme()
  {
    if(theme === "light")
    {
      setTheme("dark");
      cookies.set("theme", "dark");
    }
    else
    {
      setTheme("light");
      cookies.set("theme", "light");
    }
  }

  return (
    <globalThemeContext.Provider value={theme}>
      <div className={"App" + (theme === "light" ? " light" : "")}>
        <Navbar />
          
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account themeButtonClick={changeTheme} />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/my-posts" element={<Posts type="user-posts" />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/login" element={<AuthForm title="Login" />} />
              <Route path="/register" element={<AuthForm title="Register" />} />
              <Route path="/404" element={<PageNotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          
        <Footer />
      </div>
    </globalThemeContext.Provider>
  );
}

export default App;
