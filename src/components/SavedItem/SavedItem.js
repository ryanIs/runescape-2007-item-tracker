import React from 'react'

class SavedItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="saved-item">
        <div>{this.props.itemName}</div>
        <div>{this.props.itemId}</div>
        <div>{this.props.itemCost}</div>
        <div>{this.props.itemDescription}</div>
      </div>
    )
  }
}

export default SavedItem