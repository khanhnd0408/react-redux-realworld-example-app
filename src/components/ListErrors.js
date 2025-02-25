import React from 'react';

class ListErrors extends React.PureComponent {
  render() {
    const errors = this.props.errors;
    if (errors) {
      return (
        <ul className={`error-messages ${this.props.shouldDisplay ? '' : "not-display"}`}>
          {
            Object.keys(errors).map(key => {
              return (
                <li key={key}>
                  {key} {errors[key]}
                </li>
              );
            })
          }
        </ul>
      );
    } else {
      return null;
    }
  }
}

export default ListErrors;
