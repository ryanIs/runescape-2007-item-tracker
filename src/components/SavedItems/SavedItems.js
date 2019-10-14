/**
 * This is the wrapper for holding eight SavedItem components.
 */
import React from 'react';
import SavedItem from '../SavedItem/SavedItem'

class SavedItems extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    return(
      <div className="saved-items-wrapper">
        {
          this.props.items.map((itemObject, index) => {
            return(
              <SavedItem 
                itemImage={itemObject.itemImage} 
                itemName={itemObject.itemName} 
                itemCost={itemObject.itemCost} 
                itemId={itemObject.itemId} 
              />
            )
          })
        }
      </div>
    )

  }

}

export default SavedItems