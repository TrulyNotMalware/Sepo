import React from 'react';
import axios from 'axios';

class CommentWriteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article_num: this.props.article_num,
            comment: ''
        }

        this.write = this.write.bind(this);
        this.changeComment = this.changeComment.bind(this);
    }

    postData = () => {
        axios.post('http://175.193.68.230:3000/write_comment', {
            article_num: this.state.article_num,
            comment: this.state.comment
        }).then((res) => {
            console.log('댓글 작성 완료');
        }).catch(function (err) {
            console.log(err);
        });
    }

    changeComment(event) {
        this.setState({ comment: event.target.value });
    }

    write() {
        const article = this.props.article_num;
        this.setState({ article_num: article }, function () {
            this.postData();
        });
    }

    render() {
        return (
            <div>
                <input type='text' name='comment' value={this.state.comment} onChange={this.changeComment}></input>
                <button onClick={this.write}>확인</button>
            </div>
        )
    }
}

export default CommentWriteForm;