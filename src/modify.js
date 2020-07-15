import React from 'react';

class Modify extends React.Component{
    render(){
        return(
            <div classNmae = "userModify">
                <div>
                    <form>
                        <div>
                            <p>비밀번호</p>
                            <input type = "password"></input>
                        </div>
                        <div>
                            <p>닉네임</p>
                            <input type ="text"></input>
                        </div>
                        <input type="summit"></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default Modify;