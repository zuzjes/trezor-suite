import { useEffect, FunctionComponent } from 'react';

declare global {
    interface Window {
        Cypress: any;
        store: any;
    }
}

interface Props {
    store: any;
}

/**
 * expose store to window when run in Cypress
 * @param {Store} store
 */
const CypressExportStore: FunctionComponent<Props> = ({ store }) => {
    useEffect(() => {
        if (window && !window.store && window.Cypress) {
            window.store = store;
        }
        return () => {
            delete window.store;
        };
    });

    return null;
};

export default CypressExportStore;