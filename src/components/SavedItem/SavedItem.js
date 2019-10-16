import React from 'react'

class SavedItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="saved-item">

        <div className="item">
          {/* OBJECTIVE(7,00): <div>{this.props.itemImage}aabc</div>*/}
          <div className='item-image'></div>
          <div>{this.props.itemName}</div>
        </div>

        <div className="cost">
          <div>{this.props.itemCost} coins</div>
        </div>

      </div>
    )
  }
}

export default SavedItem