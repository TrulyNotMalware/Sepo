import React, { Component } from 'react';
import './App.css';
import './Login.css';
import './Modify.css';
import Header from './Components/Header'
import MainMenu from './Components/MainMenu';
import LeftMenu from './Components/LeftMenu';
import BreadCrum from './Components/BreadCrum';
import Board from './Components/Board';
import Session from './Components/Session';
const MainMenuData = [
  {
    main : 'Program',
    subs : ['Python', 'Java', 'C']
  },
  {
    main : 'Web',
    subs : ['HTML', 'CSS', 'JS']
  }
]

const LeftMenuData = [
  {
    menu : 'Python',
    boards : ['Python1', 'Python2', 'Python3', 'Python4', 'Python5']
  },
  {
    menu : 'Java',
    boards : ['Java1', 'Java2', 'Java3', 'Java4', 'Java5']
  },
  {
    menu : 'C',
    boards : ['c1', 'c2', 'c3', 'c4', 'c5']
  }
]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      menu: 'Home',
      boardList: [],
      board: ''
    }
  }

  menuClick(submenu){
    this.setState({menu: submenu});
    LeftMenuData.map(function(data){
      if(submenu === data.menu){
        this.setState({boardList: data.boards});
      }
    }.bind(this))
  }

  boardClick(board_){
    this.setState({board: board_});
  }

  render(){
    const MainMenuList = MainMenuData.map((MenuData, index) => (<MainMenu key={index} main={MenuData.main} subs={MenuData.subs} menuClick = {this.menuClick.bind(this)}></MainMenu>));
    
    return (
      <div className="App">
        <Session></Session>
        <Header></Header>
        <ul className="mainMenu">
          {MainMenuList}
        </ul>
        <BreadCrum menu={this.state.menu} board={this.state.board}></BreadCrum>
        <LeftMenu boardList={this.state.boardList} boardClick={this.boardClick.bind(this)}></LeftMenu>
        <Board></Board>
      </div>
    );
  }
  
}

export default App;
