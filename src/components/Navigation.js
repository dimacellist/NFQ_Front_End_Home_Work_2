import React from 'react';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    handleChange = (id) => {
      this.props.handler(id);
    }

    render() {
        const {name, id} = this.props;

        return (
          <button 
            onClick={() => {this.handleChange(id);}} 
            value={name}>
            {name}
          </button>
        )
    }
}

export default Navigation;
