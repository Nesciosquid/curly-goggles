import React from 'react';

export class OligoPane extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const oligo = event.target.value.toUpperCase();
    if (oligo.length >= 3) {
      this.context.store.dispatch({
        type: 'SET_OLIGOS',
        oligos: oligo,
      });
    }
  }

  render() {
    const style = {
      padding: '20px',
      border: '1px solid black',
      borderRadius: '5px',
      marginBottom: '20px',
      marginTop: '20px',
    };

    const inputStyle = {
      width: '100%',
    };

    return (
      <div style={style} className={'four columns'}>
        <h3>{this.props.title}</h3>
        <textArea
          style={inputStyle}
          defaultValue={this.props.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

OligoPane.propTypes = {
  title: React.PropTypes.string,
  value: React.PropTypes.string,
};

OligoPane.contextTypes = {
  store: React.PropTypes.object,
};
