import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface';
import {marketsTableAttributes} from '../DBattrs.js';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RowDescriptor from '../RowDescriptor';


export default function MarketsTable(props) {


    const [markets, setMarkets] = useState([]);
    console.log(`in MarketsTable contains ${JSON.stringify(markets)}`);


    useEffect(() => {
        const api = new API();

        async function getMarkets() {
            const marketsJSONString = await api.allMarkets();
            console.log(`markets from the DB ${JSON.stringify(marketsJSONString)}`);
            setMarkets(marketsJSONString.data);
        }

        getMarkets();
    }, []);


    return <Fragment>
        {
            markets.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="market table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#9eb9ef' }}>
                                {
                                    marketsTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}
                                                    sx={{m: 'auto', p: '0 30px 0 30px'}}>
                                            <h4 style={
                                                {
                                                    color: '#ffffff',
                                                    textShadow: '1px 1px 2px #000000'
                                                }}>
                                                {attr.title}
                                            </h4>
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                markets.map((market, idx) => (
                                    <RowDescriptor rowObject={market} key={idx} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}


