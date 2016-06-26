import React from 'react';

export class ResultsPane extends React.Component {
  render() {
    const style = {
      padding: '20px',
      border: '1px solid black',
      borderRadius: '5px',
    };

    const fragments = [];
    this.props.fragments.forEach((fragment, index) => {
      fragments.push(
        <li key={fragment + index}>
          <span>{fragment.length}</span>
        </li>
      );
    });

    return (
      <div style={style} className={'twelve columns'}>
        <h3>{this.props.title}</h3>
        <ul>
          <li>Cuts: {this.props.cuts}</li>
          <li>Time: {this.props.time}</li>
        </ul>
        <ul>Fragments:
          {fragments}
        </ul>
      </div>
    );
  }
}

ResultsPane.propTypes = {
  title: React.PropTypes.string,
  time: React.PropTypes.number,
  cuts: React.PropTypes.number,
  fragments: React.PropTypes.array,
};
