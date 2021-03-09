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
            <tr>
                <td>Serial Number: {this.state.sn}</td>
                <td>Article: {this.state.article}</td>
            </tr>
        );
    }
}

export default Comp;