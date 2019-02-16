import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  title: { textAlign: 'center' },
  value: { textAlign: 'right' },
  section: { marginTop: '40px', marginBottom: '40px' },
});

const SearchBox = ({ classes, searchTerm, onSearchTermChange }) => (
  <div test_selector="swapi-search-box">
    <Typography variant="h6" className={classes.title}>
      SWAPI Person Searcher
    </Typography>
    <TextField
      label="Star Wars Person"
      className={classes.section}
      value={searchTerm}
      onChange={e => onSearchTermChange(e.target.value)}
    />
  </div>
);

export default withStyles(styles)(SearchBox);
