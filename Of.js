import React, { Component } from 'react';
import Comp from './Comp';

class Of extends Component {
    constructor(props){
        super(props);
        this.state={
            produit: props.produit,
            of: props.orderf,
            id: props.id,
            composants: props.composants,
            newcomp:'',
            formvue:true,
        }
    }

    updatevue(){
        this.setState({
            formvue: !this.state.formvue
        })
    }
    comp(e){
        this.setState({
            newcomp: e.target.value
        })
    }
    affectComp(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"id":this.state.id,"produit":this.state.produit,"id3":null,"composants":this.state.composants,"ordreDeFabrication":this.state.of,"statut":"encours"});
        
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:8070/updcompprod/"+ this.state.newcomp, requestOptions)
          .then(response => response.text())
          .then(result => {console.log(result);
                           console.log(this.state.refresh);
                           
                           this.updatevue();
                           
                          })
          .catch(error => console.log('error', error));
    }
    render() {
        return (
            <div>
                <h1>--------------------------</h1>
                <h1>{this.state.produit}</h1>
                <h1>{this.state.of}</h1>
                {
                    this.state.composants.map((comp)=>{
                        return <Comp article={comp.article} sn={comp.ID1}/>
                    })
                }
                <button hidden={!this.state.formvue} onClick={() => this.updatevue()}>affect composant</button>
                <input hidden={this.state.formvue} type="text" placeholder="Of" value={this.state.newcomp} onChange={(e)=>{this.comp(e)}} ></input>
                <button hidden={this.state.formvue} onClick={() => this.affectComp()}>affect Composant</button>
            </div>
        );
    }
}

export default Of;