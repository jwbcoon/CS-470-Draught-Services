import React, {useState, useEffect, Fragment} from 'react';
import API from '../../API_Interface/API_Interface';
import {routesTableAttributes} from '../DBattrs.js';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RowDescriptor from '../RowDescriptor';


export default function RoutesTable(props) {


    const [routes, setRoutes] = useState([]);
    console.log(`in RouteTable routes contains is ${JSON.stringify(routes)}`);


    useEffect(() => {
        const api = new API();

        async function getRoutes() {
            const routesJSONString = await api.allRoutes();
            console.log(`routes from the DB ${JSON.stringify(routesJSONString)}`);
            setRoutes(routesJSONString.data);
        }

        getRoutes();
    }, []);


    return <Fragment>
        {
            routes.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="route table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#9eb9ef' }}>
                                {
                                    routesTableAttributes.map((attr, idx) =>
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
                                routes.map((route, idx) => (
                                    <RowDescriptor rowObject={route} key={idx} />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        }
    </Fragment>
}
