import {useState, useEffect, Fragment} from 'react';
import {FixedSizeList} from 'react-window';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import trimDate from './util/util.js';
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
    const currTable = determineAttributes(rowObject)[0].title.replace(/( Name)|( ID)/,'s').toLowerCase();
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


/*
function renderRow(props) {
  const { transactions, index, style } = props;

  return (
    <>
    {
        transactions.map((transaction, index) =>
            <ListItem style={style} key={index} component="div" disablePadding>
                {
                    Object.keys(transaction).map(key =>
                        <ListItemText>
                            {transaction[key]}
                        </ListItemText>
                    )
                }
            </ListItem>
        )
    }
    </>
  );
}


function VirtualizedList(props) {
  const {transactions} = props;
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow({transactions: transactions})}
      </FixedSizeList>
    </Box>
  );
}
*/

export default function RowDescriptor({rowObject}) {
  const [open, setOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    {
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
    }
  ]);
  console.log(`In RowDescriptor, transactions is: ${JSON.stringify(transactions)}`);

  const toggleOpen = () => {
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
      onClick={() => toggleOpen()}
    >
      <Stack >
          <List>
              <ListItem>
                  {
                      DBattrs.transactionsTableAttributes.map((attr, idx) => (
                          <ListItemText key={idx}
                                    justifyContent='center' alignItems='center'>
                            {attr.title}
                          </ListItemText>
                      ))
                  }
              </ListItem>
          </List>
          <Divider/>
          <List sx={{ maxHeight: 200, overflow: 'auto' }}>
            {
              transactions.map((transaction, idx) => (
                  <ListItem key={idx}>
                  {
                      Object.keys(transaction).map(key => 
                              <ListItemText justifyContent='center' alignItems='center'>
                                  {trimDate(transaction, key)}
                              </ListItemText>
                      )
                  }
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
                                  trimDate(rowObject, attr.attributeDBName)
                              }
                          </TableCell>)
                  }
              </TableRow>
              {
                  open &&
                  <TableRow
                    open={open}
                    onClick={() => toggleOpen()}
                  >
                    <TableCell colSpan='100%'>{list(transactions)}</TableCell>
                  </TableRow>
              }
          </>
    )
  }

  return <TRow rowObject={rowObject} onClick={toggleOpen}/>
}

