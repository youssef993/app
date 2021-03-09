import React, { Component } from 'react';

class Comp extends Component {
    constructor(props){
        super(props);
        this.state={
            article: props.article,
            sn: props.sn
        }
    }
    render() {
        return (
            <div>
                <h3>{this.state.article}</h3>
                <h3>{this.state.sn}</h3>
            </div>
        );
    }
}

export default Comp;