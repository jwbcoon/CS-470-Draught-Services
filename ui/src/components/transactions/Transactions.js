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


function determineRequest(api, requestIndex) {
    switch (requestIndex) {
      case 0:
          return api.getTransactionsPerCycleByAccountID;
      case 1:
          return api.getTransactionsPerCycleByRouteID;
      case 2:
          return api.getTransactionsPerCycleForAllRoutes;
      case 3:
          return api.getTransactionsPerCycleByMarketID;

      default:
        return api.getTransactions;
    }
}


export default function TransactionTable({dropOpen, requestIndex, params}) {


    const [transactions, setTransactions] = useState([]);
    const limit = 50;
    console.log(`in TransactionTable contains ${JSON.stringify(transactions)}`);
    console.log(`TransactionTable::requestIndex is: ${requestIndex} and TransactionTable::params is ${JSON.stringify(params ? params : limit)}`);


    useEffect(() => {
        const api = new API();

        async function getTransactions(request) {
            const transactionsJSONString = await request(dropOpen ? params : limit); 
            console.log(`transactions from the DB ${JSON.stringify(transactionsJSONString)}`);
            setTransactions(transactionsJSONString.data);
        }

        getTransactions(determineRequest(api, requestIndex));
    }, [dropOpen, params, requestIndex]);

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

    return (
        <Fragment>
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
                                    transactions.map((transaction, idx) => (
                                        <TRow transactionObject={transaction} key={idx}/>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </Fragment>
    )
}
