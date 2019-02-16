import React from 'react';
import purple from '@material-ui/core/colors/purple';
import Theme from './Theme.jsx';
import TopNav from './components/TopNav.jsx';
import SwapiPersonSearcher from './components/SwapiPersonSearcher.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      primaryColour: purple,
    };
  }
  render() {
    return (
      <Theme primary={this.state.primaryColour}>
        <CssBaseline />
        <TopNav />
        <SwapiPersonSearcher/>
      </Theme>
    );
  }
}

export default Application;
