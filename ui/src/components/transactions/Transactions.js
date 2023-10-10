import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface'
import {transactionsTableAttributes} from '../DBattrs.js';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const transactionTable = tableType => {
    if (tableType === 'cycleCount')
        return [
         {
            title: 'Cycle ID',
            attributeDBName: 'cycleID',
            align: 'left'
        },
        {
            title: 'Total Transactions',
            attributeDBName: 'tot_transactions',
            align: 'left'
        }
    ];
    else
        return transactionsTableAttributes;
}


export default function TransactionTable(props) {


    const [transactions, setTransactions] = useState([]);
    console.log(`in TransactionTable contains ${JSON.stringify(transactions)}`);
    const cycleID = 300;


    useEffect(() => {
        const api = new API();

        async function getTransactions() {
            const transactionsJSONString = await api.getTransactionCountPerCycle(cycleID);
            console.log(`transactions from the DB ${JSON.stringify(transactionsJSONString)}`);
            setTransactions(transactionsJSONString.data);
        }

        getTransactions();
    }, [cycleID]);

    const TRow = ({transactionObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                transactionTable('cycleCount').map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            transactionObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }

    return
    <Fragment>
        {
            transactions.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="transaction table">
                        <TableHead>
                            <TableRow>
                                {
                                    transactionTable('cycleCount').map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}>
                                            {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                transactions.map((transaction, idx) => (
                                    <TRow transactionObject={transaction} key={idx}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}
