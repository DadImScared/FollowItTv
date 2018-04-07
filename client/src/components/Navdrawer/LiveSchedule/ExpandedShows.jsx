
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';



export class ExpandedShows extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      expanded: false
    };
  }

  componentDidMount() {
    const { panels } = this.props;
    this.changePanel(true, panels[0][0].length ? 0:1);
  }

  changePanel = (expanded, panel) => {
    this.setState({
      expanded: expanded ? panel:false
    });
  };

  render() {
    const { panels, shows } = this.props;
    const { expanded } = this.state;
    return (
      <div>
        {
          panels.map(([panel, description], index) => {
            return (
              <ExpansionPanel
                expanded={expanded === index}
                onChange={(event, expanded) => this.changePanel(expanded, index)}
                key={`${description}-${index}`}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    {description}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                    {
                      panel.map((item, index) => (
                        <div key={`${item}-${index}`}>
                          {shows[item] && shows[item].name}
                        </div>
                      ))
                    }
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
        }
      </div>
    );
  }
}

ExpandedShows.propTypes = {
  panels: PropTypes.array.isRequired,
  shows: PropTypes.object.isRequired
};

export default ExpandedShows;

