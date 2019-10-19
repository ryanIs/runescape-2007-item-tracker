/**
 * This component is a single item (div) placed into the item list component (Item.js)
 */
import React from 'react'

class Item extends React.Component {

  /**
   * This is the constructor for this Item component.
   * @param {Object} props - props passed to this item.
   */
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="item">
        this.props.item.item.name
      </div>
    )
  }
}

export default Item