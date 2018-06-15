import React, {Component} from 'react';

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }
    
    //Display the image only after the content loaded
    render() {
        return (
            <img 
            style={this.state.loaded? {} : {display: 'none'}}
            src={this.props.src} 
            onLoad={() => this.setState({loaded: true})}
            alt="flag"/>
        );
    }
}

export default Image;