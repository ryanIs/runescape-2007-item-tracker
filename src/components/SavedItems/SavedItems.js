/**
 * This is the wrapper for holding eight SavedItem components.
 */
import React from 'react';
import SavedItem from '../SavedItem/SavedItem'

class SavedItems extends React.Component {

  // Default style (loaded from css)
  DEFAULT_BOX_STYLE = {}

  // Style of component when the user has clicked on it (selecting it)
  SELECTED_BOX_STYLE = {
    opacity: '0.80',
    background: 'rgba(255, 255, 200, 0.2)',
    boxShadow: 'inset 0 0 5px 3px rgba(255, 255, 200, 0.8)',
  }

  /**
   * SavedItems.js constructor
   * @param {Object} props - Constructor properties
   */
  constructor(props) {
    super(props)
  }

  /**
   * Handles automatic styling based on whether or not the a particular component has been
   * selected. This is determined by this.state.selectedItem matching same index of the 
   * components within the saved-item-wrapper div.
   * 
   * @param {Number} boxId - The given box id.
   */
  selectedStyleHandler = (boxId) => { 
    if(this.props.selectedItem == boxId) {
      return this.SELECTED_BOX_STYLE
    }
    else {
      return this.DEFAULT_BOX_STYLE
    }
  }

  /**
   * Render our SavedItems component
   */
  render() {

    return(
      <div className="saved-items">

        <div className="header">
          <h1>Grand Exchange</h1>
          <h2>Select an item slot then search for a name to track the item.</h2>
        </div>

        <div className="saved-items-wrapper">
          {
            this.props.items.map(
              (itemObject, index) => {
              return(
                <span 
                  onClick={(mouseEvent) => this.props.itemClick(index)} 
                  key={`saved-item-${index}`} 
                  style={this.selectedStyleHandler(index)}
                  title={itemObject.itemDescription}
                >

                  <SavedItem 
                    itemImage={itemObject.itemImage} 
                    itemName={itemObject.itemName} 
                    itemCost={itemObject.itemCost} 
                    itemId={itemObject.itemId}
                  />

                </span>
              )
            })
          }
        </div>

      </div>
    )

  }

}

export default SavedItems