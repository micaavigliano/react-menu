import React from 'react';
import Proptypes from 'prop-types';

const Header = ( props ) => (
    <header className="top">
        <h1>Catch 
            <span className="ofThe" aria-hidden="true">
                <span className="of" aria-hidden="true">Of</span>
                <span className="the" aria-hidden="true">The</span>
            </span> 
            day
        </h1>
        <h3 className="tagline">
            <span>{ props.tagline }</span>
        </h3>
    </header>
)

Header.propTypes = {
    tagline: Proptypes.string.isRequired
}

export default Header;