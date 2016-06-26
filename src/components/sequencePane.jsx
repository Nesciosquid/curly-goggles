import React from 'react';
import { HighlightedSequence } from './highlightedSequence.jsx';
import { getHightlightStrings } from '../sequenceOperations.js';
import { SequenceBox } from './sequenceBox.jsx';

export class SequencePane extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.blur = this.blur.bind(this);
    this.focus = this.focus.bind(this);
    this.state = {
      focused: false,
    };
  }

  handleChange(event) {
    this.context.store.dispatch({
      type: 'SET_SEQUENCE',
      sequence: event.target.value.toUpperCase(),
    });
  }

  focus() {
    this.setState({ focused: true });
  }

  blur() {
    this.setState({ focused: false });
  }

  render() {
    const style = {
      padding: '20px',
      marginBottom: '20px',
      marginTop: '20px',
      border: '1px solid black',
      borderRadius: '5px',
    };

    const inputStyle = {
      width: '100%',
    };

    const highlightedStrings =
      getHightlightStrings(this.props.value, this.props.oligo);

    const unfocusedContents = (
      <HighlightedSequence
        onFocus={this.focus}
        highlightedStrings={highlightedStrings}
      />
    );

    const focusedContents = (
      <SequenceBox
        value={this.props.value}
        onBlur={this.blur}
        onChange={this.handleChange}
        style={inputStyle}
      />
    );

    let contents;
    if (this.state.focused) contents = focusedContents;
    else contents = unfocusedContents;

    return (
      <div style={style} className={'eight columns'}>
        <h3>{this.props.title}</h3>
        {contents}
      </div>
    );
  }
}

SequencePane.propTypes = {
  title: React.PropTypes.string,
  value: React.PropTypes.string,
  oligo: React.PropTypes.string,
};

SequencePane.contextTypes = {
  store: React.PropTypes.object,
};
