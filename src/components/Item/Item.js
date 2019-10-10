import React from 'react'

class Item extends React.Component {
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