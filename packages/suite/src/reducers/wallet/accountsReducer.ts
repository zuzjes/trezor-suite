import produce from 'immer';
import { AccountInfo } from 'trezor-connect';
import { ACCOUNT } from '@wallet-actions/constants';
import { WalletAction, Network } from '@wallet-types';

type AccountNetworkSpecific =
    | {
          networkType: 'bitcoin';
          misc: undefined;
          marker: undefined;
          page: AccountInfo['page'];
      }
    | {
          networkType: 'ripple';
          misc: { sequence: number; reserve: string };
          marker: AccountInfo['marker'];
          page: undefined;
      }
    | {
          networkType: 'ethereum';
          misc: { nonce: string };
          marker: undefined;
          page: AccountInfo['page'];
      };

export type Account = {
    deviceState: string;
    index: number;
    path: string;
    descriptor: string;
    accountType: NonNullable<Network['accountType']>;
    symbol: Network['symbol'];
    empty: boolean;
    visible: boolean;
    imported?: boolean;
    balance: string;
    availableBalance: string;
    formattedBalance: string;
    tokens: AccountInfo['tokens'];
    addresses: AccountInfo['addresses'];
    utxo: AccountInfo['utxo'];
    history: AccountInfo['history'];
} & AccountNetworkSpecific;

const initialState: Account[] = [];

const create = (draft: Account[], account: Account) => {
    // TODO: check if account already exist, for example 2 device instances with same passphrase
    // remove "transactions" field, they are stored in "transactionReducer"
    if (account.history) {
        delete account.history.transactions;
    }
    draft.push(account);
};

const changeVisibility = (draft: Account[], account: Account) => {
    // TODO: extract the find filter condition to separate function
    const index = draft.findIndex(
        a =>
            a.deviceState === account.deviceState &&
            a.symbol === account.symbol &&
            a.descriptor === account.descriptor,
    );
    if (draft[index]) {
        draft[index].visible = true;
    }
};

const remove = (draft: Account[], accounts: Account[]) => {
    accounts.forEach(a => {
        const index = draft.findIndex(
            ac =>
                ac.deviceState === a.deviceState &&
                ac.descriptor === a.descriptor &&
                ac.symbol === a.symbol,
        );
        draft.splice(index, 1);
    });
};

const update = (draft: Account[], account: Account) => {
    const accountIndex = draft.findIndex(
        ac =>
            ac.deviceState === account.deviceState &&
            ac.descriptor === account.descriptor &&
            ac.symbol === account.symbol,
    );

    if (accountIndex !== -1) {
        draft[accountIndex] = account;

        if (!account.marker) {
            // immer.js doesn't update fields that are set to undefined, so instead we delete the field
            delete draft[accountIndex].marker;
        }
    } else {
        console.warn(
            `Tried to update account that does not exist: ${account.descriptor} (symbol: ${account.symbol})`,
        );
    }
};

export default (state: Account[] = initialState, action: WalletAction): Account[] => {
    return produce(state, draft => {
        switch (action.type) {
            case ACCOUNT.CREATE:
                create(draft, action.payload);
                break;
            case ACCOUNT.UPDATE:
                update(draft, action.payload);
                break;
            case ACCOUNT.CHANGE_VISIBILITY:
                changeVisibility(draft, action.payload);
                break;
            case ACCOUNT.REMOVE:
                remove(draft, action.payload);
            // no default
        }
    });
};
