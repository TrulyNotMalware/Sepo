import React from 'react';
import axios from 'axios';
import Paragraph from './Paragraph';

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            paragraph: []
        }
      }

    postData = () => {
        axios.post('/json',{
            message: "get paragraph list"
        }).then((res) => {
            this.setState({paragraph: res.data});
            this.setState({loading: true});
        }).catch(function (err){
            console.log(err);
        });
    }

    render(){
        if(this.state.loading === false) {
            this.postData();
        }
        const paragraph_list = this.state.paragraph.map((item, index) => (<Paragraph key='index' title={item.title} author={item.author} date={item.date} contents={item.contents}></Paragraph>))
        if(this.state.loading === true) return(
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
                    {paragraph_list}
                </div>
            </div>
        );
        else return(
            <div>
                paragraph not loading
            </div>
        );
    }
}

export default Board;