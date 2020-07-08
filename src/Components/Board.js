import React from 'react';
import Paragraph from './Paragraph';

class Board extends React.Component{
    render(){
        return(
            <div className='board'>
                <p className='writeArticle'>글 쓰려면 클릭</p>
                <div className='writeMedia'>
                    <p id='photo'>사진</p>
                    <p id='video'>영상</p>
                </div>
                <div className='search'>
                    <img src='/img/search.png' width='25px' alt='search'></img>
                    <input type='text' name='value'></input>
                </div>

                <div className='Contents'>
                    cntents test
                    <Paragraph></Paragraph>
                    <Paragraph></Paragraph>
                    <Paragraph></Paragraph>
                </div>
            </div>
        );
    }
}

export default Board;