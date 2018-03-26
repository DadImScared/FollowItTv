
import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Fade from 'material-ui/transitions/Fade';

import { reSendEmailConfirm } from '../actions/users';


const styles = theme => ({
  wrapper: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

export class ReSendEmail extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      message: this.props.message || '',
      afterSend: this.props.afterSend || false
    };
  }

  sendEmail = async () => {
    try {
      await reSendEmailConfirm(this.props.email);
      this.showEmailSent();
    }
    catch (e) {
      console.log(e);
    }
  };

  showEmailSent = () => {
    this.setState({
      message: 'Email sent if it did not show up please ',
      afterSend: true
    });
  };

  render() {
    const { message, afterSend } = this.state;
    const { shouldShow, fadeProps, wrapperProps, classes } = this.props;
    return (
      <Fade {...fadeProps} in={shouldShow}>
        <Typography className={classes.wrapper} gutterBottom component={'div'} {...wrapperProps}>
          <span>{message} click</span>
          <span id={'send-more'} style={{ cursor: 'pointer' }} onClick={this.sendEmail}> here </span>
          <span>{`to${afterSend ? ' re ':' '}send the email confirmation`}</span>
        </Typography>
      </Fade>
    );
  }
}

export default withStyles(styles)(ReSendEmail);
