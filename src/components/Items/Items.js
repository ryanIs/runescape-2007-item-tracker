/**
 * The Items component is a simple textarea which will be populated with
 * over 13,000 items. Its purpose is to serve as a simple item name dictonary
 * to help the player remember item names.
 */
import React from 'react';

class Items extends React.Component {

  // Visible style
  ITEM_VISIBLE = {
    display: 'block',
  }

  // Invisible style
  ITEM_INVISIBLE = {
    display: 'none',
  }

  /**
   * Items.js constructor
   * @param {Object} props - Constructor properties
   */
  constructor(props) {
    super(props)
  }

  /**
   * Handles clicking on the item
   * 
   * @param {String} itemName - Name of the selected item.
   */
  itemClickHandler = (itemName) => {
    this.props.itemClick(itemName)
  }

  /**
   * Render our Item component
   */
  render() {
    return(
      <div className="items-wrapper" ref={this.props.myRef}>

        <div className="items-container">
          {
            // Loop through each individual itemName (pulled from stored json) and add it to the DOM
            this.props.itemNames.map((element, index) => {
              return <div 
                className="item" 
                onClick={(event) => this.itemClickHandler(element)} 
                value={element} 
                style={this.props.visibleItems[element] ? this.ITEM_VISIBLE : this.ITEM_INVISIBLE} 
                key={"itemList-" + index}>
                {element}
              </div>
            })
          }
        </div>
        
      </div>
    )
  }

}

export default Items