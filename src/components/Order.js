import React from 'react';
import PropType from 'prop-types';
import { formatPrice } from '../helpers.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
    static propType = {
        fishes: PropType.object,
        order: PropType.object,
        deleteOrder: PropType.func
    }
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 250, exit: 250 }
        }
        if(!fish) return null; //make sure the fish is loaded before we continue
        if(!isAvailable) {
            return (        
            <CSSTransition { ...transitionOptions } >    
                <li key={key}>
                    Sorry {fish ? fish.name : 'fish'} is no longer available 
                </li>
            </CSSTransition>
            )
        }
        return (
            <CSSTransition { ...transitionOptions } >
                <li key={key}>
                    {count} lbs {fish.name}
                    {formatPrice(count * fish.price)}
                    <button onClick={() => this.props.deleteOrder(key) }> &times;</button>
                </li>
            </CSSTransition>
        )
    }

    render () {
        const orderId = Object.keys(this.props.order);
        const total = orderId.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderId.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    <span>Total: </span>
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
            )
    }
}

export default Order;