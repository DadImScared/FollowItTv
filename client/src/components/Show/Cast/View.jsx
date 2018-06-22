
import React from 'react';

import _ from 'lodash';
import Masonry from 'react-masonry-component';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

import { Cast as styles } from '../../../styles/Show';

export const View = ({ classes, people, characters, characterIds }) => (
  <div style={{ padding: '16px' }}>
    <Masonry options={{ horizontalOrder: true }} elementType={'div'}>
      {
        characterIds.map((castId) => {
          const character = characters[castId];
          const person = people[character.person];
          // try for character image fall back to person image if none
          const image = _.get(character, 'image.medium', _.get(person, 'image.medium', false));
          return (
            <div className={classes.col} key={castId}>
              <Card>
                <CardHeader
                  title={character.name}
                  subheader={`played by: ${person.name}`}
                />
                {
                  image ?
                    <CardMedia
                      className={classes.image}
                      image={image}
                    />
                    :
                    null
                }
                <CardActions style={{ justifyContent: 'center' }}>
                  <Button
                    component={'a'}
                    size={'large'}
                    color={'secondary'}
                    variant={'raised'}
                    href={character.url}
                  >
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
