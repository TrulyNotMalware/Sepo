import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { axios } from 'axios';
import './App.css';
import LoginPage from './Login';
class Subject extends Component {
    render(){
        return(
        <div>
        <h1 class="title"><a href="/">A<sup>+</sup> star</a></h1>
		<h2>#Webcohol Study</h2>
        
		<div id="logInOut">
            <Link to="/login">Login</Link>    
        </div>

		<div class="menu">
			<ul class="mainMenu">
				
			</ul>
		</div>

		<div class="breadCrumb">
			
		</div>

		<div class="cols">
			<h3>Topic List</h3>
			<ul id = "leftMenu">
				
			</ul>
		</div>
		
		<div class="entry">
			<div class="writeMenu">
				<p class="writeArticle">ê¸ ì°ë ¤ë©´ í´ë¦­</p>
				<div class="writeMedia">
					<p id="photo">ì¬ì§</p>
					<p id="video">ìì</p>
				</div>
			</div>
			<div class="search">
				<input type="text" name="value" />
			</div>
			<div class="items">
				
			</div>
		</div>
		
		<div id="writeForm">
			<p>ê¸ ìì±íê¸°</p>
			<form action="/write" name="article" method="post" enctype = "multipart/form-data">
				<table>
					<tr>
						<th>Title</th>
						<td>
							<input type="text" name="title" placeholder="Title" />
						</td>
					</tr>
					<tr>
						<th>Contents</th>
						<td>
							<textarea name="contents"></textarea>
						</td>
					</tr>
					<tr>
						<th>File</th>
						<td>
							<input type="file" class = "files" name = "files" multiple />
						</td>
					</tr>
				</table>
                <input type="hidden" name="userEmail" class="userEmail" />
                <input type="hidden" name="hashvalue" class="hashvalue" />
				<input type = "submit" value = "íì¸" />
				<input type="reset" />
				<button type="button" onclick="writeCancle()">ì·¨ì</button>
			</form>
		</div>

		<div id="viewArticle">
			<section class="paragraph">
				<p id="index_article"></p>
				<p id="author"></p>
				<p id="date"></p>
				<article></article>
			</section>
			<div class="viewComment">
				<p>[ëê¸]</p>
				<ul class="commentList">
					
				</ul>
			</div>
			<div id="writeComment">
				<form action="/writeComment" name="comment" method="post">
					<input type="text" name="comment" placeholder="comment" />
					<input type = "submit" value = "ëê¸ ìë  " />
                    <input type = "hidden" name = "origin_number" value = "/" /> 
				</form>
			</div>
			<button onclick="delArticle()">ì­ì </button>
			<button onclick='$("#viewArticle").css("display", "none");'>ë«ê¸°</button>
		</div>

		<div id="modify">
			<p>íì ì ë³´ ìì </p>
			<form action="/modify" name="newPasswd"  method="POST">
                <input type="text" name="newname" placeholder="newName" />
				<input type="text" name="password" placeholder="NewPassword" />
				<input type="submit" value="Modify" />
                <input type="button" value="cancel" onclick='modifyCancel()' />
			</form>
		</div>
		<footer>
			<p>
				copyright : ê³µë¶ WEB STUDY(a.k.a ì ì ìí íê³)
			</p>
		</footer>
        </div>
        );
    }
}

class App extends Component {
  render() {
  return (
        <div className="App">
            <Subject />
           {this.props.children}
        </div>
    );
  }
}

export default App;
