
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
        summary,
        image
      },
      shows,
      classes
    } = this.props;
    return (
      <div>
        <Card>
          <CardHeader
            title={shows[show].name || 'no name'}
            subheader={airtime}
          />
          <CardMedia
            component={'img'}
            className={classes.media}
            // image={shows[show] && shows[show].image && shows[show].image.medium}
            image={(image && image.medium) || (shows[show] && shows[show].image && shows[show].image.medium)}
            title={`episode ${name}. show ${shows[show] || 'no name'}`}
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
              <FollowShowButton showId={show} />
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Episode);
