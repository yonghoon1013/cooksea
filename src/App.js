import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './page/Home';
import List from './page/List';
import Detail from './page/Detail';
import Mypage from './page/Mypage';
import Community from './page/Community';
import RecipeWrite from './page/RecipeWrite';
import Login from './page/Login';
import Signupterms from './page/Signupterms';
import Signup from './page/Signup';
import RecipeSearchList from './page/RecipeSearchList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signupterms' element={<Signupterms />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/list' element={<List />}></Route>
          <Route path='/recipesearchlist' element={<RecipeSearchList />}></Route>
          <Route path='/detail/:recipeKey' element={<Detail />}></Route>
          <Route path='/mypage' element={<Mypage />}></Route>
          <Route path='/community' element={<Community />}></Route>
          <Route path='/recipewrite' element={<RecipeWrite />}></Route>
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
