import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    static propTypes = {
        addFish: PropTypes.func
    }

    createFish = event => {
        //stop the form from submitting
        event.preventDefault();
        //create the fish
        const fish = {
            name: this.nameRef.current,
            price: parseFloat(this.priceRef.current),
            status: this.statusRef.current,
            desc: this.descRef.current,
            image: this.imageRef.current,
        };
        this.props.addFish(fish);
        event.currentTarget.reset(); //para resetar el formulario y limpiarlo
    }
    render () {
        return (
        <form className="fish-edit" onSubmit={this.createFish}>
            <input 
                name="name" 
                ref={this.nameRef} 
                type="text" 
                placeholder="Name" />
            <input 
                name="price" 
                ref={this.priceRef} 
                type="text" 
                placeholder="Price" />
            <select name="status" ref={this.statusref}>
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold out</option>
            </select>
            <textarea 
                name="desc" 
                ref={this.descRef} 
                type="text" 
                placeholder="Desc" />
            <input 
                name="image" 
                ref={this.imageRef} 
                type="text" 
                placeholder="Image" />
            <button type="submit">+ Add Fish</button>
        </form>
        )
    }
}

export default AddFishForm;