/**
 * The Items component is a simple textarea which will be populated with
 * over 13,000 items. Its purpose is to serve as a simple item name dictonary
 * to help the player remember item names.
 */
import React from 'react';

class Items extends React.Component {

  ITEM_VISIBLE = {
    display: 'block',
  }

  ITEM_INVISIBLE = {
    display: 'none',
  }

  constructor(props) {
    super(props)
  }

  itemClickHandler = (itemName) => {
    this.props.itemClick(itemName)
  }

  render() {
    return(
      <div className="items-wrapper">
        <div className="items-container">
          {
            this.props.itemNames.map((element, index) => {
              return <div className="item" onClick={(event) => this.itemClickHandler(element)} value={element} style={this.props.visibleItems[element] ? this.ITEM_VISIBLE : this.ITEM_INVISIBLE} key={"itemList-" + index}>{element}</div>
            })
          }
        </div>
      </div>
    )
  }

}

export default Items