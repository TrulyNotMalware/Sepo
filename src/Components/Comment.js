import React from 'react';
import axios from 'axios';

class Comment extends React.Component {
    del = () => {
        axios.post('http://175.193.68.230:3000/del_comment', {
            table: this.state.table,
            chapter: this.state.chapter,
            comment_num: this.props.key
        }).then((res) => {
            console.log('del comment');
        }).catch(function (err) {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <p><b>{this.props.author}</b> <span>{this.props.date}</span></p>
                <p>{this.props.comment}</p>
                <a onClick={this.del}>[삭제]</a>
            </div>
        );
    }
}

export default Comment;