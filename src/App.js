import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { axios } from 'axios';
import './App.css';
import LoginPage from './Login';
import MainMenu from './Components/MainMenu';
import Header from './Components/Header';
class Templates extends Component {
    render(){
        return(
        <div>

        </div>
        );
    }
}

class App extends Component {
  render() {
  return (
        <div className="App">
            <Templates />
           {this.props.children}
        </div>
    );
  }
}

export default App;
