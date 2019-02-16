import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import SWPerson from './SWPerson.jsx';

const styles = () => ({
  progress: { textAlign: 'center' },
});

const SwapiResults = ({ classes, loading, results }) => {
  if (loading)
    return (<div className={classes.progress} test_selector="progress"><CircularProgress /></div>);
  if (!results)
    return null;
  if (!results.length)
    return (<div>No Results</div>);
  return results.map(person => (<SWPerson key={person.url} person={person} />));
};

export default withStyles(styles)(SwapiResults);
