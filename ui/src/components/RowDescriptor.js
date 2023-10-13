import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
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


const TRow = ({rowObject}) => {
    return <TableRow
        sx={{'&:last-child td, &:last-child th': {border: 0}}}
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
}


export default function RowDescriptor({rowObject}) {
  const [state, setState] = useState({open: false});
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

  const toggleDrawer = ({open}) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  useEffect(() => {
      const api = new API();
      
      async function getTransaction(request) {
          const transactionsJSONString = await request();
          console.log(`RowDescriptor::transaction from the DB ${JSON.stringify(transactionsJSONString)}`);
          setTransactions(transactionsJSONString.data);
      }

      getTransaction(determineRequest(api, rowObject));
  }, [state.open]);

  const list = transactions => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {DBattrs.transactionsTableAttributes.map((attr, idx) => (
          <ListItem key={idx} disablePadding
                    justifyContent='center' alignItems='center'>
            {attr.title}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {transactions.map((transaction, idx) => (
          <ListItem key={idx} disablePadding>
              {transaction}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {
        <>
          <TRow rowObject={rowObject} onClick={toggleDrawer(state, true)}/>
          <Drawer
            anchor='top'
            open={state.open}
            onClose={toggleDrawer(state, false)}
          >
            {list(transactions)}
          </Drawer>
        </>
      }
    </>
  );
}

