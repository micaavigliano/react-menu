import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({ user }) //lo que hace es si ya me logge una vez, y refresco la página me mantiene la sesión abierta
            }
        })
    }

    authHandler = async authData => {
        //look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store)
        // claim it if there is no owner
        if(!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }
        // set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
        console.log(authData);
    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler); //para conectar con la autenticación
    };

    logout = async () => {
        await firebase.auth().signOut()
        this.setState({ uid: null })
    }
    

    render () {
        const logout = <button onClick={this.logout}>Log out</button>

        if(!this.state.uid) {
            return (
                <Login authenticate={this.authenticate} />
            )
        }

        if(this.state.uid !== this.state.owner) { //si el usuario no es el owner de la tienda perdón
            return (
                <div>
                    <p>You're not the owner, bye</p>
                    {logout}
                </div>
            )
        }
        //si es el owner render el inventory :)
        return (
            <div className="Inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm 
                        key={key} 
                        index={key}
                        fish={this.props.fishes[key]} 
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}/>
                ))}
                <AddFishForm addFish={this.props.addFish}/>
                <button 
                    onClick={this.props.loadSampleFishes}
                >
                    Load sample Fishes
                </button>
            </div>
        )
    }
}

export default Inventory;