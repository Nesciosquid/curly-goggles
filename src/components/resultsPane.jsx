import React from 'react';

export class ResultsPane extends React.Component {
  render() {
    const style = {
      border: '1px solid black',
    };

    const fragments = [];

    console.log(this.props);

    this.props.fragments.forEach((fragment, index) => {
      fragments.push(
        <li>
          <span>Fragment {index}: </span>
          <span>{fragment}</span>
        </li>
      );
    });

    return (
      <div style={style} className={'two columns'}>
        <h3>{this.props.title}</h3>
        <span>Cuts: {this.props.cuts}</span>
        <span>Time: {this.props.time}</span>
        <ul>
          {fragments}
        </ul>
      </div>
    );
  }
}

ResultsPane.propTypes = {
  title: React.PropTypes.string,
  time: React.PropTypes.string,
  cuts: React.PropTypes.number,
  fragments: React.PropTypes.array,
};
