
import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';

import Search from 'material-ui-icons/Search';


class Searchbar extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      inputVal: ''
    };
  }

  handleChange = ({ target: { value: inputVal } }) => {
    this.setState({ inputVal });
  };

  pushSearch = (e) => {
    e.preventDefault();
    const { history: { push } } = this.props;
    const { inputVal } = this.state;
    if (inputVal) {
      push(`/search/${inputVal}`);
      this.setState({ inputVal: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.pushSearch}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton type={'submit'}>
                  <Search />
                </IconButton>
              </InputAdornment>
            )
          }}
          placeholder={'Search shows'}
          aria-label={'Search shows'}
          value={this.state.inputVal}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default Searchbar;
