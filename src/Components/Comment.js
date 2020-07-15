import React from 'react';

class Comment extends React.Component{
    render(){
        return(
            <div>
                <p><b>{this.props.author}</b> <span>{this.props.date}</span></p>
                <p>{this.props.comment}</p>
            </div>
        );
    }
}

export default Comment;