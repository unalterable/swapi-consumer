import React from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import Redirect from 'react-router-dom/Redirect';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import LockIcon from '@material-ui/icons/LockOutlined';

import Alert from './Alert.jsx';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
});


class LoanQuote extends React.Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
  }

  render () {
    const { classes } = this.props;
    const handleSumbit = async (e) => {
      e.preventDefault();
      const { username, password } = this.state;
      try {
        await axios.post('/api/authenticate', { username, password });
        this.props.history.push('/profile');
      } catch (e) {
        this.setState({ errMsg: e.response.data });
      }
    };

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
        </Paper>
      </main>
    );
  }
}

LoanQuote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoanQuote);
