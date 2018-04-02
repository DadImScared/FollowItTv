
import React, { Component } from 'react';

import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';

import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import FollowShowButton from './FollowShowButton';
import styles from '../styles/Episode.css';


export class Episode extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: false,
      height: 0
    };
  }

  handleExpand = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  setRef = (el) => {
    this.el = el;
  };

  componentDidMount() {
    if (this.el) {
      this.setState({ height: this.el.clientHeight });
    }
  }

  render() {
    const {
      item: {
        name,
        show,
        airtime,
        airdate,
        summary,
        image
      } = {},
      shows = {},
      classes
    } = this.props;
    const currentShow = this.props.show || shows[show];
    const currentId = (this.props.show && this.props.show.id) || show;
    return (
      <div>
        <Card>
          <CardHeader
            title={(this.props.show ? name:currentShow.name || 'no name')}
            subheader={`${this.props.show ? `${airdate} | `:''}${airtime}`}
          />
          <CardMedia
            component={'img'}
            className={classes.media}
            // image={shows[show] && shows[show].image && shows[show].image.medium}
            image={(image && image.medium) || (currentShow.image && currentShow.image.medium)}
            title={`episode ${name}. show ${currentShow.name || 'no name'}`}
          />
          <CardContent>
            <Collapse collapsedHeight={'40px'} in={this.state.isOpen}>
              <CardContent>
                <Typography component={'div'}>
                  {
                    summary ?
                      <div ref={this.setRef}>{summary}</div>
                      :
                      'No summary entered.'
                  }
                </Typography>
              </CardContent>
            </Collapse>
            <div
              id={'read-more'}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                visibility: this.state.height >= 40 ? 'visible':'hidden'
              }}>
              <span style={{ alignSelf: 'center' }}>read more</span>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.isOpen
                })}
                onClick={this.handleExpand}
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </CardContent>
          <CardActions>
            <div>
              <FollowShowButton showId={currentId} />
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Episode);
