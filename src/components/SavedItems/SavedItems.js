/**
 * This is the wrapper for holding eight SavedItem components.
 */
import React from 'react';
import SavedItem from '../SavedItem/SavedItem'

class SavedItems extends React.Component {

  constructor(props) {
    super(props)
  }
v = () => console.log(5)
  render() {

    return(
      <div className="saved-items">

        <div className="header">
          <h1>Grand Exchange</h1>
          <h2>Select an item slot then search for a name to track the item.</h2>
        </div>

        <div className="saved-items-wrapper">
          {
            this.props.items.map((itemObject, index) => {
              return(
                <span onClick={(mouseEvent) => this.props.itemClick(index)}>
                  <SavedItem 
                    itemImage={itemObject.itemImage} 
                    itemName={itemObject.itemName} 
                    itemCost={itemObject.itemCost} 
                    itemId={itemObject.itemId}
                    key={`saved-item-${index}`}
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