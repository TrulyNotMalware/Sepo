import React,{Component} from 'react';
import axios from 'axios';



class Communication extends Component{
    state = {
        paragraph: ''
    }

    postData = () => {
        axios.post('/json',{
            message: "PLZ NO MORE ERRORS"
        }).then((res) => {
            this.setState({paragraph: res.data});
            console.log(this.state.paragraph);
        }).catch(function (err){
            console.log(err);
        });
    }

    componentDidUpdate(){
    
    }
    
    render(){
        return(
            <div>
             <input type="button" onClick={this.postData} />
             <p>{this.state.paragraph}</p>
            </div>
        );
    }
}
export default Communication;
