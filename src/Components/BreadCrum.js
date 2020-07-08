import React from 'react';

class BreadCrum extends React.Component{
    render(){
        return(
            <div className='breadCrumb'>
                <p>/{this.props.menu}/{this.props.board}</p>
            </div>
        );
    }
}

export default BreadCrum;