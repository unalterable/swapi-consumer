import React from 'react';
import axios from 'axios';
import debounce from 'debounce';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import SearchBox from './SearchBox.jsx';
import SwapiResults from './SwapiResults.jsx';
import Alert from './Alert.jsx';

const createUrl = searchTerm => `/api/swapi/people?search=${searchTerm}`;

const styles = theme => ({
  main: {
    display: 'block',
    width: 600,
    margin: `${theme.spacing.unit * 8}px auto 0` ,
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px`,
  },
  section: { textAlign: 'center', margin: `${theme.spacing.unit}px auto` },
});


class SwapiPersonSearcher extends React.Component {
  constructor(props){
    super(props);
    this.state = { loading: false, results: null, searchTerm: '' };
    this.debouncedFetchResults = debounce(this.fetchResults, 500);
  }


  fetchResults() {
    const url = createUrl(this.state.searchTerm);
    axios.get(url)
      .then(({ data }) => url === createUrl(this.state.searchTerm) && this.setState({ loading: false, results: data }))
      .catch(() => this.setState({ error: true, loading: false }));
  }

  search(searchTerm) {
    this.setState({ searchTerm, loading: true, results: null }, this.debouncedFetchResults);
  }

  render () {
    const { classes } = this.props;
    return (
      <Paper className={classes.main}>
        <Alert
          variant="error"
          message="There was an error"
          open={!!this.state.error}
          onClose={() => this.setState({ error: null })} />
        <div className={classes.section}>
          <SearchBox
            searchTerm={this.state.searchTerm}
            onSearchTermChange={this.search.bind(this)}
          />
        </div>
        <div>
          <Divider variant='middle' />
        </div>
        <div className={classes.section}>
          <SwapiResults
            loading={this.state.loading}
            results={this.state.results}
          />
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(SwapiPersonSearcher);
