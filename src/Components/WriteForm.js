import React from "react";
import axios from 'axios';

class WriteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: '',
            table: '',
            chapter: ''
        }
        this.changeTitle = this.changeTitle.bind(this);
        this.changeContents = this.changeContents.bind(this);
        this.reset = this.reset.bind(this);
        this.write = this.write.bind(this);
    }

    postData = () => {
        axios.post('http://175.193.68.230:3000/write_article', {
            title: this.state.title,
            contents: this.state.contents,
            table: this.state.table,
            chapter: this.state.chapter
        }).then((res) => {
            console.log(res);
        }).catch(function (err) {
            console.log(err);
        });
    }

    write() {
        const tableName = document.querySelector(".table").innerText;
        const chapterName = document.querySelector(".chapter").innerText;
        this.setState({ table: tableName, chapter: chapterName },function(){
            this.postData();
        });
        //console.log(this.state.table);
        //this.postData();
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
                <p>게시판 : <span className='table'>{this.props.menu}</span>_<span className='chapter'>{this.props.board}</span></p>
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
                <button onClick={this.write}>확인</button>
                <button onClick={this.reset}>초기화</button>
                <button onClick={() => document.querySelector(".writeForm").style.display = 'none'}>취소</button>
            </div>
        );
    }
}

export default WriteForm;
