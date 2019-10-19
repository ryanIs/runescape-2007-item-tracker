/**
 * The SavedItem component is the container for our saved items. This 
 * component contains the most essential function of our application 
 * which is simply to keep a track of the requested item.
 */
import React from 'react'

class SavedItem extends React.Component {

  /**
   * SavedItems.js constructor
   * @param {Object} props - Constructor properties
   */
  constructor(props) {
    super(props)
  }

  /**
   * Render our SavedItem component
   */
  render() {
    return (
      <div className="saved-item">

        <div className="item">
          <img className='item-image' src={this.props.itemImage}></img>
          <div>{this.props.itemName}</div>
        </div>

        <div className="cost">
          {this.props.itemCost} coins
        </div>

      </div>
    )
  }
}

export default SavedItem