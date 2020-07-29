import React from 'react';
import axios from 'axios';
import Paragraph from './Paragraph';
import View from './View';
import WriteForm from './WriteForm';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            islogin: 'test',
            comment_loading: false,
            paragraph: [],
            select_item: {
                number: -1,
                title: 'title',
                author: 'author',
                date: 'date',
                contents: 'contents'
            },
            search: ''
        }
        this.search = this.search.bind(this);
    }

    isLogin = () => {
        axios({
            method: 'post',
            url: '/check_session',
            data: {
                msg: 'Board Loading'
            }
        }).then(res => {
            if (res.data != this.state.islogin) {
                this.setState({ islogin: res.data });
            }
        });
    }

    setLoading(isLoading) {
        this.props.setLoading(isLoading);
    }

    postData = () => {
        axios.post('http://175.193.68.230:3000/article', {
            table: this.props.menu,
            chapter: this.props.board
        }).then((res) => {
            this.setState({ paragraph: res.data });
            this.setLoading(true);
        }).catch(function (err) {
            console.log(err);
        });
    }

    view_article(item) {
        this.set_comment_loading(false);
        this.setState({ select_item: item });
        document.querySelector(".viewArticle").style.display = 'block';
    }

    set_comment_loading(is_comment_loading) {
        console.log(is_comment_loading);
        this.setState({ comment_loading: is_comment_loading });
    }

    search(event) {
        this.setState({ search: event.target.value })
    }

    render() {
        this.isLogin();
        if (this.state.islogin == '') {
            return (
                <div className='board'>
                    <div className='writeMedia'>
                        <p id='photo'>사진</p>
                        <p id='video'>영상</p>
                    </div>

                    <div className='search'>
                        <img src='/img/search.png' width='25px' alt='search'></img>
                        <input type='text' name='search' placeholder="Search" value={this.state.search} onChange={this.search}></input>
                    </div>

                    <div className='Contents'>
                        <h1>Login to see</h1>
                        <h2>gurgle~ gurgle~</h2>
                    </div>
                    <WriteForm menu={this.props.menu} board={this.props.board}></WriteForm>
                    <View item={this.state.select_item} comment_loading={this.state.comment_loading} set_comment_loading={this.set_comment_loading.bind(this)}></View>
                </div>
            )
        }
        if (this.props.loading === false) {
            this.postData();
        }
        const paragraph_list = this.state.paragraph.map((item) => { if (item.title.indexOf(this.state.search) != -1) return (<div key={item.number}><a onClick={() => this.view_article(item)}><Paragraph title={item.title} author={item.author} date={item.date} contents={item.contents}></Paragraph></a></div>); })
        if (this.props.loading === true) return (
            <div className='board'>
                <p className='writeArticle' onClick={() => document.querySelector(".writeForm").style.display = 'block'} > 글 쓰려면 클릭</p>
                <div className='writeMedia'>
                    <p id='photo'>사진</p>
                    <p id='video'>영상</p>
                </div>
                <div className='search'>
                    <img src='/img/search.png' width='25px' alt='search'></img>
                    <input type='text' name='search' placeholder="Search" value={this.state.search} onChange={this.search}></input>
                </div>

                <div className='Contents'>
                    {paragraph_list}
                </div>
                <WriteForm menu={this.props.menu} board={this.props.board}></WriteForm>
                <View item={this.state.select_item} comment_loading={this.state.comment_loading} set_comment_loading={this.set_comment_loading.bind(this)} menu={this.props.menu} board={this.props.board}></View>
            </div>
        );
        else return (
            <div>
                paragraph not loading
            </div>
        );
    }
}

export default Board;
