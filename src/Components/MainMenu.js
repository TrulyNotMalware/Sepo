import React from 'react';

class MainMenu extends React.Component{
    menuClick(sub){
        this.props.menuClick(sub);
    }

    render(){
        const subs = this.props.subs;
        const subList = subs.map((sub, index) => (<li key={index} onClick={() => this.menuClick(sub)}>{sub}</li>));
        return(
            <li>
                <p>{this.props.main}</p>
                <ul>
                    {subList}
                </ul>
            </li>
        );
    }
}

export default MainMenu;