import React from 'react';
import { injectIntl } from 'react-intl';

const InputIntl = ({ intl, idName, type,name }) => {
	const placeholder = intl.formatMessage({ id: idName });
	return <input className="auth__input" name={name} type={type} placeholder={placeholder} />;
};


export default injectIntl(InputIntl);
