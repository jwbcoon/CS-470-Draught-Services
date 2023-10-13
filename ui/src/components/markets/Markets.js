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

    const TRow = ({marketObject}) => {
        return <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            {
                marketsTableAttributes.map((attr, idx) =>
                    <TableCell key={idx}
                               align={attr.align}>
                        {
                            marketObject[attr.attributeDBName]
                        }
                    </TableCell>)
            }
        </TableRow>
    }

    return <Fragment>
        {
            markets.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="market table">
                        <TableHead>
                            <TableRow>
                                {
                                    marketsTableAttributes.map((attr, idx) =>
                                        <TableCell  key={idx}
                                                    align={attr.align}>
                                            {attr.title}
                                        </TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                markets.map((market, idx) => (
                                    <TRow marketObject={market} key={idx}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}


