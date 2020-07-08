import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import MainMenu from './components/MainMenu';
import LeftMenu from './components/LeftMenu';

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
      menu: 'none',
      boardList: [],
      board: 'none'
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
        <Header></Header>
        <ul className="mainMenu">
          {MainMenuList}
        </ul>
        <p>메인메뉴 선택 : {this.state.menu}</p>
        <LeftMenu boardList={this.state.boardList} boardClick={this.boardClick.bind(this)}></LeftMenu>
        <p>게시판 선택 : {this.state.board}</p>
      </div>
    );
  }
  
}

export default App;
