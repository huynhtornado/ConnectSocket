import React from 'react';
import { withTranslation } from 'react-i18next';

const ChangeLanguage = ({ i18n }) => {
    return (
        <div>
            <button onClick={() => i18n.changeLanguage('en')}>en</button>
            <button onClick={() => i18n.changeLanguage('de')}>in</button>
        </div>
    )
}

export default withTranslation()(ChangeLanguage);