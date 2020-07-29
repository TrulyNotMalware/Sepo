import React from 'react';
import axios from 'axios';
import Comment from './Comment';
import CommentWriteForm from './CommentWriteForm';

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    postData = () => {
        axios.post('http://175.193.68.230:3000/comment', {
            article_num: this.props.item.number
        }).then((res) => {
            console.log(this.props.item.number)
            this.setState({ comments: res.data });
            this.props.set_comment_loading(true);
            console.log(res.data);
        }).catch(function (err) {
            console.log(err);
        });
    }

    render() {
        if (this.props.item.number !== -1 && this.props.comment_loading === false) this.postData();
        const comment_list = this.state.comments.map((comment) => <Comment key={comment.number} author={comment.author} date={comment.date} comment={comment.contents}></Comment>)
        return (
            <div className='viewArticle'>
                <h1>{this.props.item.title}</h1>
                <p id='author'>글쓴이 : {this.props.item.author}</p>
                <p id='date'>수정일 : {this.props.item.date}</p>
                <article>{this.props.item.contents}</article>
                <p>[댓글]</p>
                <CommentWriteForm article_num={this.props.item.number}></CommentWriteForm>
                {comment_list}
                <button onClick={() => document.querySelector(".viewArticle").style.display = 'none'}>닫기</button>
            </div>
        )
    }
}

export default View;