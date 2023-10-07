import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const transactionsTableAttributes = [
    {
        title: 'Transaction ID',
        attributeDBName: 'transactionID',
        align: 'left'
    },
    {
        title: 'Transaction Date',
        attributeDBName: 'transactionDate',
        align: 'left'
    },
    {
        title: 'Employee ID',
        attributeDBName: 'employeeID',
        align: 'left'
    },
    {
        title: 'Account ID',
        attributeDBName: 'accountID',
        align: 'left'
    },
    {
        title: 'Product ID',
        attributeDBName: 'productID',
        align: 'left'
    },
    {
        title: 'Distributor ID',
        attributeDBName: 'distributorID',
        align: 'left'
    },
    {
        title: 'Market ID',
        attributeDBName: 'marketID',
        align: 'left'
    },
    {
        title: 'Route ID',
        attributeDBName: 'routeID',
        align: 'left'
    },
    {
        title: 'Cycle ID',
        attributeDBName: 'cycleID',
        align: 'left'
    },
    {
        title: 'Taps',
        attributeDBName: 'taps',
        align: 'left'
    },
    {
        title: 'Last Modified',
        attributeDBName: 'lastModified',
        align: 'left'
    }
];

export default function TransactionTable(props) {


    const [transactions, setTransactions] = useState([]);
    console.log(`in TransactionTable contains ${JSON.stringify(transactions)}`);


    useEffect(() => {
        const api = new API();

        async function getTransactions() {
            const transactionsJSONString = await api.allRoutes();
            console.log(`transactions from the DB ${JSON.stringify(transactionsJSONString)}`);
            setTransactions(transactionsJSONString.data);
        }

        getTransactions();
    }, []);

    const TRow = ({transactionObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                transactionsTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            transactionObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }

    return <Fragment>
        {
            transactions.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="transaction table">
                        <TableHead>
                            <TableRow>
                                {
                                    transactionsTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}>
                                            {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                transactions.map((route, idx) => (
                                    <TRow transactionObject={route} key={idx}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}
