import React, { Component } from 'react';
import Of from '../component/Of';

class Addof extends Component {
    constructor(props){
        super(props);
        this.state={
            of:'',
            produit:'',
            encours:[]
        }
        this.getEncours = this.getEncours.bind(this);
    }
    componentDidMount(){
        this.getEncours()
    }
    produit(e){
        this.setState({
            produit: e.target.value
        })

    }
    of(e){
        this.setState({
            of: e.target.value
        })

    }
    getEncours(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:8070/encours", requestOptions)
            .then(response => response.text())
            .then(result => {console.log(result)
                var data= JSON.parse(result);
                this.setState({
                    encours: data
                })})
            .catch(error => console.log('error', error));
    }
    newOf(){
        var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"produit":this.state.produit,"ordreDeFabrication":this.state.of});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
fetch("http://localhost:8070/addprod", requestOptions)
  .then(response => response.text())
  .then(result => {console.log(result);
                this.getEncours();
                   })
  .catch(error => console.log('error', error));
    }
    render() {
        return (
            <div class="container">
                <div class="row">
            {
                this.state.encours.map((of)=>{
                    return <Of produit={of.produit} orderf={of.ordreDeFabrication} composants={of.composants} id={of._id} getall={this.getEncours} />
                })
            }
            
            </div>
            
            <h1>Addof work</h1>
                <input type="text" placeholder="nom produit" value={this.state.produit} onChange={(e)=>{this.produit(e)}} />
                <input type="text" placeholder="Of" value={this.state.of} onChange={(e)=>{this.of(e)}} ></input>
                <button onClick={()=>{this.newOf()}}>add of</button>
            </div>
        );
    }
}

export default Addof;