import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers.js';

class Fish extends React.Component {
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        addToOrder: PropTypes.func
    }
    render() {
        const {image, name, price, desc, status } = this.props.details;
        const isAvailable = status === 'available'
        return (
            <li className="menu-fish">
                <img src={image} alt={image}/> {/* details es la prop que le pase a <Fish /> para que reciba el objeto por eso la prop hace referencia a él y no a fishes */}
                <h3 className="fish-name">
                    {name}
                    <span className="Price">{formatPrice(price)}</span>    
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
                    { isAvailable ? 'Add To Order' : 'Sold Out'}
                </button>
            </li>
        )
    }
}

export default Fish;