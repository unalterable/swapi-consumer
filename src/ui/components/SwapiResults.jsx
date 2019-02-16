import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SWPerson from './SWPerson.jsx';

const styles = theme => ({
  title: { textAlign: 'center' },
  progress: { textAlign: 'center' },
  value: { textAlign: 'right' },
  section: { marginTop: '40px', marginBottom: '40px' },
});

const SwapiResults = props => {
  const { classes, loading, results } = props;
  if (loading)
    return (<div className={classes.progress} test="progress"><CircularProgress /></div>);
  if (!results)
    return null;
  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        Results
      </Typography>
      <div test="results">
        {results.map(person => (<SWPerson key={person.url} person={person} />))}
      </div>
    </div>
  );
};

SwapiResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwapiResults);
