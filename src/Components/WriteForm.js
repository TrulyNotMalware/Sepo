import React from "react";
import axios from 'axios';

class WriteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: '',
        }
        this.changeTitle = this.changeTitle.bind(this);
        this.changeContents = this.changeContents.bind(this);
        this.reset = this.reset.bind(this);
    }

    postData = () => {
        axios.post('http://175.193.68.230:3000/write_article', {
            title: this.state.title,
            contents: this.state.contents
        }).then((res) => {
            console.log(res);
        }).catch(function (err) {
            console.log(err);
        });
    }

    changeTitle(event) {
        this.setState({ title: event.target.value });
    }

    changeContents(event) {
        this.setState({ contents: event.target.value });
    }

    reset() {
        this.setState({
            title: '',
            contents: ''
        })
    }

    render() {
        return (
            <div className="writeForm">
                <p>글 작성하기</p>
                <form>
                    <table>
                        <tr>
                            <th>Title</th>
                            <td>
                                <input type="text" name="title" value={this.state.title} onChange={this.changeTitle} />
                            </td>
                        </tr>
                        <tr>
                            <th>Contents</th>
                            <td>
                                <textarea name="contents" value={this.state.contents} onChange={this.changeContents}></textarea>
                            </td>
                        </tr>
                    </table>
                    <input type="submit" value="확인" onClick={this.postData} />
                    <input type="reset" onClick={this.reset} />
                    <button type="button" onClick={() => document.querySelector(".writeForm").style.display = 'none'}>취소</button>
                </form>
            </div>
        );
    }
}

export default WriteForm;