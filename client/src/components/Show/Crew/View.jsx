
import React from 'react';

import classNames from 'classnames';
import Masonry from 'react-masonry-component';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';

import { Crew as styles } from '../../../styles/Show';

export const View = ({ classes, people, crew, showId }) => (
  <div style={{ padding: '16px' }}>
    <Masonry elementType={'div'}>
      {
        Object.entries(crew[showId]).map(([personId, crewCredits]) => {
          const person = people[personId];
          return (
            <div className={classes.col} key={personId}>
              <Card>
                <CardHeader
                  title={person.name}
                />
                {
                  person.image ?
                    <CardMedia
                      className={classes.image}
                      image={person.image.medium}
                    />
                    :
                    null
                }
                <CardContent className={classes.content}>
                  {
                    crewCredits.map((credit, index) => (
                      <Chip
                        className={classNames(classes.chipBase, {
                          [classes.chipMain]: index === 0,
                          [classes.chipSecondary]: index === 1,
                          [classes.chipOthers]: index > 1
                        })}
                        key={`${credit}-${index}`}
                        label={credit}
                      />
                    ))
                  }
                </CardContent>
                <CardActions>
                  <Button color={'primary'} component={'a'} href={person.url}>
                    View bio
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        })
      }
    </Masonry>
  </div>
);

export default withStyles(styles)(View);
