import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    static propTypes = {
        history: PropTypes.object
    }

    myInput = React.createRef();

    goToStore = event => {
        //1. Stop the form from submitting
        event.preventDefault();
        //2. get the text from that input
        const storeName = this.myInput.current.value;
        console.log(storeName);
        // 3. change the page to store/...
        this.props.history.push(`/store/${storeName}`);
    }

    render () {
        return (
        <form className="store-selector" onSubmit={this.goToStore}>
            <h2>Please Enter a Store</h2>
            <input 
                type="text" 
                required 
                placeholder="Store Name" 
                defaultValue={getFunName()} 
                ref={this.myInput}
                />
            <button type="submit">Visit Store</button>
        </form>
        )
    }
}

export default StorePicker;