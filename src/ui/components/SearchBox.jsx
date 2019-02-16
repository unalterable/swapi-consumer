import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  title: { textAlign: 'center' },
  value: { textAlign: 'right' },
  section: { marginTop: '40px', marginBottom: '40px' },
});


class SearchBox extends React.Component {
  render () {
    const { classes, searchTerm, onSearchTermChange } = this.props;
    return (
      <div>
        <Typography variant="h6" className={classes.title}>
          SwAPI People Searcher
        </Typography>
        <TextField
          label="Star Wars Person"
          className={classes.section}
          value={searchTerm}
          onChange={e => onSearchTermChange(e.target.value)}
        />
      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBox);
