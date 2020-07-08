import React from 'react';

class LeftMenu extends React.Component{
    boardClick(board){
        this.props.boardClick(board);
    }
    render(){
        const boards = this.props.boardList;
        const list = boards.map((board, index) => (<li key={index} onClick={() => this.boardClick(board)}>{board}</li>))
        return(
            <ul>
                {list}
            </ul>
        );
    }
}

export default LeftMenu;