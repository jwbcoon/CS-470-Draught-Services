import {useState, useEffect, Fragment} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import trimDate from './util/util.js';
import * as DBattrs from './DBattrs.js';
import API from '../API_Interface/API_Interface';


/*
 *
 *  Receives a generic database packet and 
 *  matches it to one of the existing table 
 *  schemas in the DBattrs.js file, accepting
 *  databases that match the schema in exact order
 *  and returning the data when validated, otherwise
 *  returning an empty array.
 *
 * *******************************/
const determineAttributes = rowObject => {
    const rowKeys = Object.keys(rowObject);
    return Object.values(DBattrs).filter(tableAttrs => {
        const filtered = tableAttrs.filter((attr, idx) => attr.attributeDBName === rowKeys[idx]);
        return filtered.length === rowKeys.length;
    })[0];
}


/*
 *
 *  Receives a generic database packet and 
 *  returns a corresponding query upon validation
 *  by determineAttributes().
 *
 * *********************/
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

/*
 *
 *  Returns a TableRow with a hidden DescriptorRow beneath
 *  it that facilitates api calls to provision detail about
 *  its corresponding row and table when revealed with a click.
 *
 * ***********************/
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

  const toggleOpen = () => {
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

  const descriptorList = transactions => (
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
                    sx={{
                        backgroundColor: '#e2e2e2'
                    }}
                  >
                    <TableCell colSpan='100%'>
                        {
                            transactions.length > 0 
                          ? descriptorList(transactions) 
                          : <Box width='100%'
                                 onClick={() => toggleOpen()}
                                 sx={{p: '0 0 0 450px'}}
                            >
                                {`No transactions for this ${determineAttributes(rowObject)[0].title.replace(/( Name)|( ID)/, '').toLowerCase()}`}
                            </Box>
                        }
                    </TableCell>
                  </TableRow>
              }
          </>
    )
  }

  return <TRow rowObject={rowObject} onClick={toggleOpen}/>
}

