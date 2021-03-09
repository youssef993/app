import React, { Component } from 'react';

class Addcomp extends Component {
    constructor(props){
        super(props);
        this.state={
            id1:'',
            article:''
        }
    }
    article(e){
        this.setState({
            article: e.target.value
        })
    }
    id1(e){
        this.setState({
            id1: e.target.value
        })
    }
    newcomp(){
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"article":this.state.article,"ID1": this.state.id1});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8070/ajout", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    }
    render() {
        return (
             <div>
                <input type="text" placeholder="article" value={this.state.article} onChange={(e)=>{this.article(e)}} />
                <input type="text" placeholder="SN" value={this.state.id1} onChange={(e)=>{this.id1(e)}} ></input>
                <button onClick={()=>{this.newcomp()}}>add comp</button>
            </div>
       
        );
    }
}

export default Addcomp;