import React from 'react';
import axios from 'axios';

class Comment extends React.Component {
    del = () => {
        axios.post('http://175.193.68.230:3000/del_comment', {
            table: this.props.table,
            chapter: this.props.chapter,
            comment_num: this.props.comment_num
        }).then((res) => {
            alert('del comment');
            document.querySelector(".viewArticle").style.display = 'none';
        }).catch(function (err) {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <p><b>{this.props.author}</b> <span>{this.props.date}</span></p>
                <p>{this.props.comment} <button onClick={this.del}>[삭제]</button></p>
            </div>
        );
    }
}

export default Comment;
