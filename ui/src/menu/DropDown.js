import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Transactions from '../components/transactions/Transactions';

function TabPanel(props) {
  const { children, target, index, ...other } = props;
  const ChildTransactions = children.renderTransaction();
  console.log(`In DropDown::TabPanel: children is ${JSON.stringify(children)}`);

  return (
    <div
      role="tabpanel"
      hidden={target !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {
        target === index && <ChildTransactions/>
      }
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({param}) {
  const [target, setTarget] = React.useState(0);

  const handleChange = (event, newTarget) => {
    setTarget(newTarget);
  };
  console.log(`In DropDown: param is ${param}`);

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, width: '100%',
            justifyContent: 'flex-end', borderLeftWidth: 1, borderLeftStyle: 'solid', borderLeftColor: 'grey' }}
    >
      <Tabs
        orientation="vertical"
        value={target}
        onChange={handleChange}
        aria-label="vertical tabs"
      >
        <Tab label="By Account" {...a11yProps(0)} />
        <Tab label="By Route" {...a11yProps(1)} />
        <Tab label="For All Routes" {...a11yProps(2)} />
        <Tab label="By Market" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={target} index={0}>
          {{ renderTransaction: () => React.createElement(Transactions, { requestIndex: 0, param: param }) }}
      </TabPanel>
      <TabPanel value={target} index={1}>
          {{ renderTransaction: () => React.createElement(Transactions, { requestIndex: 1, param: param }) }}
      </TabPanel>
      <TabPanel value={target} index={2}>
          {{ renderTransaction: () => React.createElement(Transactions, { requestIndex: 2, param: param }) }}
      </TabPanel>
      <TabPanel value={target} index={3}>
          {{ renderTransaction: () => React.createElement(Transactions, { requestIndex: 3, param: param }) }}
      </TabPanel>
    </Box>
  );
}
