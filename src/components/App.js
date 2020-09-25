import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    
    static propTypes = {
        match: PropTypes.object
    }

    state = {
        fishes: {},
        order: {}
    }

    componentDidMount() {
        const { params } = this.props.match;
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    componentDidUpdate() {
        console.log(this.state.order);
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }

    addFish = fish => {
        //1. Take a copyof the existing state
        const fishes = { ...this.state.fishes };
        //2. Add out new fish to that fishesvariable
        fishes[`fish${Date.now()}`] = fish;
        //3. Set the new fishes object to state
        this.setState({ fishes: fishes }) //we wantto update thelistof fishes and overwrite the existing key 'fishes' on state. Se puede simplificar solo usando ({ fishes }) porque ambas tienen el mismo nombre. También como valor solo pasamos el único state que queremos actualizar. En este caso 'fishes'
    };

    updateFish = (key, updatedFish) => {
        //copy of the current state
        const fishes = { ...this.state.fishes };
        //update that state
        fishes[key] = updatedFish;
        //set that to state
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        //copy of state
        const fishes = { ...this.state.fishes }
        //update the state
        fishes[key] = null;
        // update state
        this.setState({ fishes })
    }

    deleteOrder = (key) => {
        const order = { ...this.state.order }
        order[key] = order[key] - 1;
        if(order[key] <= 0) {
            delete order[key]
        }
        this.setState({ order });
    }

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes })
    };

    addToOrder = (key) => {
        const order = { ...this.state.order }
        //add or update an order
        order[key] = order[key] + 1 || 1;
        this.setState({ order });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul>
                        {Object.keys(this.state.fishes).map(key => 
                            <Fish 
                                key={key}
                                index={key} 
                                details={this.state.fishes[key]} 
                                addToOrder={this.addToOrder} />
                        )}
                    </ul>
                </div>
                    <Order 
                        fishes={this.state.fishes} 
                        order={this.state.order}
                        deleteOrder={this.deleteOrder}
                    />
                    <Inventory 
                        addFish={this.addFish} 
                        loadSampleFishes={this.loadSampleFishes} 
                        fishes={this.state.fishes}
                        updateFish={this.updateFish}
                        deleteFish={this.deleteFish}
                        storeId={this.props.match.params.storeId} //comes from react router
                    />
            </div>
        )
    }
}

export default App;