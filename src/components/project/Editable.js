import React, { useEffect, useState } from 'react';
import { Plus, X } from 'react-feather';
import './Editable.css';

const Editable = (props) => {
    const [show, setShow] = useState(props?.handler || false);
    const [text, setText] = useState(props.defaultValue || '');
    const [data, setData] = useState(
        localStorage.getItem('orangenode') ? JSON.parse(localStorage.getItem('orangenode')) : []
    );

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (text && props.onSubmit) {
            props.onSubmit(text);
        }
        setText('');

        setShow(false);
    };

    return (
        <div className={`editable ${props.parentClass}`}>
            {show ? (
                <form onSubmit={handleOnSubmit}>
                    <div className={`editable__input ${props.class}`}>
                        <textarea
                            placeholder={props.placeholder}
                            autoFocus
                            id={'edit-input'}
                            type={'text'}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <div className="btn__control">
                            <button className="add__btn" type="submit">
                                {props.btnName || 'Add'}
                            </button>
                            <X
                                className="close"
                                onClick={() => {
                                    setShow(false);
                                    if (typeof props.setHandler === 'function') {
                                        props.setHandler(false);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </form>
            ) : (
                <p
                    onClick={() => {
                        setShow(true);
                    }}
                >
                    {props.defaultValue === undefined ? <Plus /> : <></>}
                    {props?.name || 'Add'}
                </p>
            )}
        </div>
    );
};

Editable.defaultProps = {
    setHandler: () => {},
};

export default Editable;
