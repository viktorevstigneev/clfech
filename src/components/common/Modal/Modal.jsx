import React from 'react';


import './style.css';

const Modal = (props) => (
	<div className="modal__window" onClick={props.onOverlayClick} style={props.style}>
		<div className="modal__container">
			<button className="modal__close-button" onClick={props.onCloseButtonClick}>
				&times;
			</button>
			<div className="modal__header">
				<h2 className="modal__title">{props.title}</h2>
				{props.children}
			</div>
		</div>
	</div>
);



export default Modal;
