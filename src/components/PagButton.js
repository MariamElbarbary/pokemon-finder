import React, { Fragment } from 'react';
import './styles/PagButton.css'


const PagButton = ({ page, text }) => {
    return (
        <Fragment>
            <div >
                <button className="pagButton" type="button"
                    onClick={page}> {text}
                </button>
            </div>
        </Fragment>
    );
}

export default PagButton;