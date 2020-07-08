import React from 'react';

class Paragraph extends React.Component{
    render(){
        return(
            <div className='paragraph'>
                <h1>{this.props.title}</h1>
                <p id='author'>글쓴이 : {this.props.author}</p>
                <p id='date'>수정일 : {this.props.date}</p>
                <article>{this.props.contents}</article>
            </div>
        );
    }
}

export default Paragraph;