import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => (
    <nav>
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="twitter" onClick={() => props.authenticate('Twitter')}>
            Log in with Twitter
        </button>
        <button className="facebook" onClick={() => props.authenticate('Facebook')}>
            Log in with Facebook
        </button>
    </nav>
)

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
}

export default Login;