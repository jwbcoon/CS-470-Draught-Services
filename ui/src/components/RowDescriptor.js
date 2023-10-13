import {useState, useEffect, Fragment} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import * as DBattrs from './DBattrs.js';
import API from '../API_Interface/API_Interface';


const determineAttributes = rowObject => {
    const rowKeys = Object.keys(rowObject);
    return Object.values(DBattrs).filter(tableAttrs => {
        const filtered = tableAttrs.filter((attr, idx) => attr.attributeDBName === rowKeys[idx]);
        return filtered.length === rowKeys.length;
    })[0];
}


const determineRequest = (api, rowObject) => {
    const currTable = determineAttributes(rowObject)[0].title.replace(/ Name/,'s').toLowerCase();
    switch (currTable) {
    case 'accounts':
        return () => api.getAccountTransactionsByAccountID(rowObject.accountID);
    case 'markets':
        return () => api.getMarketTransactionsByMarketID(rowObject.marketID);
    case 'routes':
        return () => api.getRouteTransactionsByRouteID(rowObject.routeID);

      default:
        break;
    }
}




export default function RowDescriptor({rowObject}) {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([{
                                                      transactionID: 0,
                                                      transactionDate: '',
                                                      employeeID: 0,
                                                      accountID: 0,
                                                      productID: 0,
                                                      distributorID: 0,
                                                      marketID: 0,
                                                      routeID: 0,
                                                      cycleID: 0,
                                                      taps: 0,
                                                      lastModified: ''
                                                   }]);
  console.log(`In RowDescriptor, transactions is: ${JSON.stringify(transactions)}`);

  const toggleDrawer = () => {
    console.log(`In RowDescriptor::toggleDrawer open is: ${open}`);
    setOpen(!open);
  };

  useEffect(() => {
      const api = new API();
      
      async function getTransaction(request) {
          const transactionsJSONString = await request();
          //console.log(`RowDescriptor::transactions from the DB ${JSON.stringify(transactionsJSONString)}`);
          setTransactions(transactionsJSONString.data);
      }

      getTransaction(determineRequest(api, rowObject));
  }, []);

  const list = transactions => (
    <Box
      sx={{ width: '100%' }}
      onClick={() => toggleDrawer()}
    >
      <Stack >
          <Stack orientation='horizontal'>
            {
              DBattrs.transactionsTableAttributes.map((attr, idx) => (
                  <Box key={idx}
                            justifyContent='center' alignItems='center'>
                    {attr.title}
                  </Box>
              ))
            }
          </Stack>
          <List>
            {
              transactions.map((transaction, idx) => (
                  <ListItem key={idx} disablePadding>
                      <Stack>
                          {
                              Object.keys(transaction).map(key => 
                                  <Box>
                                      <Typography justifyContent='center' alignItems='center'>
                                          {key}: {transaction[key]}
                                      </Typography>
                                  </Box>
                              )
                          }
                      </Stack>
                  </ListItem>
              ))
            }
          </List>
      </Stack>
    </Box>
  );

  const TRow = ({rowObject, onClick}) => {
      return (
          <>
              <TableRow
                  sx={{
                    '&:last-child td, &:last-child th': {border: 0},
                  }}
                  onClick={onClick}
              >
                  {
                      determineAttributes(rowObject).map((attr, idx) =>
                          <TableCell key={idx}
                                      align={attr.align}>
                              {
                                  rowObject[attr.attributeDBName]
                              }
                          </TableCell>)
                  }
              </TableRow>
              {
                  open &&
                  <TableRow
                    open={open}
                    onClick={() => toggleDrawer()}
                  >
                    <TableCell colspan='100%'>{list(transactions)}</TableCell>
                  </TableRow>
              }
          </>
    )
  }

  return <TRow rowObject={rowObject} onClick={toggleDrawer}/>
}

