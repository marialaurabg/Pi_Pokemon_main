import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import Detail from './components/Detail/Detail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component = { LandingPage } />
          <Route path='/home' component = { Home } />
          <Route path='/pokemon' component = { CreatePokemon } />
          <Route path='/pokemons/:id' component = { Detail } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
