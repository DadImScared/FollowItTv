
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';

import Television from 'mdi-material-ui/Television';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import Summary from './Summary';
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
      showActions = true,
      classes,
      followProps = {}
    } = this.props;
    const currentShow = this.props.show || shows[show];
    const currentId = (this.props.show && this.props.show.id) || show;
    return (
      <div>
        <Card>
          <CardHeader
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant={'subheading'}>
                  {this.props.show ? name:currentShow.name || 'no name'}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography style={{ marginRight: '4px' }}>
                    {currentShow.network && currentShow.network.name}
                  </Typography>
                  <a href={`${currentShow.officialSite}`} style={{ display: 'flex' }}>
                    <SvgIcon color={'primary'}>
                      <Television />
                    </SvgIcon>
                  </a>
                </div>
              </div>
            }
            subheader={`${this.props.show ? `${airdate} | `:''}${airtime}${!this.props.show ? ` | ${name}`:''}`}
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
                      <Summary summary={summary} setRef={this.setRef} />
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
              <Typography style={{ alignSelf: 'center' }}>read more</Typography>
              <IconButton
                color={'secondary'}
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.isOpen
                })}
                onClick={this.handleExpand}
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </CardContent>
          {
            showActions ?
              <CardActions>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <FollowShowButton {...followProps} showId={currentId} />
                  <Button component={Link} to={`/show/${currentId}/general`} color={'secondary'}>
                    View show
                  </Button>
                </div>
              </CardActions>
              :
              null
          }
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Episode);
