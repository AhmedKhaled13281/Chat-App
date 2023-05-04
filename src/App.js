import { Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import { authSliceAction } from './Store/authReducer';
import { useDispatch } from 'react-redux';

// Import Components
import Chat from './Pages/Chat'
import SignUp from './Pages/Signup';
import Login from './Pages/Login';
import ProductPage from './Pages/ProductPage';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      dispatch(authSliceAction.login(userData));
    }

  }, [dispatch]);

  return (
    <Routes>
        <Route path="/" exact element={<Login />}/>
        <Route path="/signup" exact element={<SignUp />}/>
        <Route path="/chat" exact element={<Chat />}/>
        <Route path="/product" exact element={<ProductPage />}/>
    </Routes>
  );
}

export default App;
