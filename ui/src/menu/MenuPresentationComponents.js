import Accounts from '../components/accounts/Accounts';
import Routes from '../components/routes/Routes';
import Markets from '../components/markets/Markets';
import Transactions from '../components/transactions/Transactions';
import Summary from '../components/summarypage/Summary';
import React from 'react';

const presentationComponents = (props) => {
    return [
        {
            title: 'Summary',
            component: <Summary/>
        },
        {
            title: 'Markets',
            component: <Markets/>
        },
        {
            title: 'Routes',
            component: <Routes/>
        },
        {
            title: 'Accounts',
            component: <Accounts/>
        },
        {
            title: 'Transactions',
            component: <Transactions />,
        }
    ];
};


const containerComponents = ({dropOpen, index, params}) => {
    return [
        {
            title: 'DropDown',
            component: () => React.createElement(Transactions, { dropOpen: dropOpen, requestIndex: index, params: params })
        }
    ];
};

export {presentationComponents, containerComponents};
