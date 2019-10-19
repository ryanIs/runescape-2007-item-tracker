/**
 * Main application file for the application.
 */

import React from 'react'
import itemNames from './json/Names.json'
import itemBank from './json/Ids.json'
import SavedItems from './components/SavedItems/SavedItems'
import Items from './components/Items/Items'
import Item from './components/Item/Item'
import imgRuneScapeLogo from './img/runescape-logo.png'
import './css/App.css'

/**
 * Log a message to the browser console
 * 
 * @param {Any} message - Message you would like to display
 */
function consoleLog(message) {
  console.log(message)
}

/**
 * This is the main section of code for the RuneScape app.
 * 
 * @returns {Object} - Object containing the react output.
 */
class App extends React.Component {

  // This proxy is REQUIRED due to the services.runescape.com domain not allowing COR access at '*'
  // WARNING: the app will fail if this proxy fails
  PROXY = 'https://cors-anywhere.herokuapp.com/'

  // This is the base location for our API
  BASE_URL = 'services.runescape.com/m=itemdb_oldschool/'

  // This is the final destination of our API endpoint
  // ITEM_DATABASE_API_PREFIX = this.BASE_URL + 'results.ws?query='
  ITEM_DATABASE_API_PREFIX = this.BASE_URL + 'api/catalogue/detail.json?item='

  // This is the default state (and structure) of one of the SavedItem components
  DEFAULT_SAVED_ITEM = {
    itemName: 'Empty',
    itemId: -1,
    itemDescription: 'This is an empty item. Click on it to add a new item to track.',
    itemCost: 0,
    itemImage: require('./img/place-holder.png')
  }

  // Sets the initial state (-1) for our savedItem boxes
  INIT_SAVED_ITEMS = [
    this.DEFAULT_SAVED_ITEM,
    this.DEFAULT_SAVED_ITEM,
    this.DEFAULT_SAVED_ITEM,
    this.DEFAULT_SAVED_ITEM,

    this.DEFAULT_SAVED_ITEM,
    this.DEFAULT_SAVED_ITEM,
    this.DEFAULT_SAVED_ITEM,
    this.DEFAULT_SAVED_ITEM
  ]

  // Style attribute for visible DOM objects
  OBJECT_VISIBLE = {
    display: 'block'
  }
  
  // Style attribute for non-visible DOM objects
  OBJECT_NOT_VISIBLE = {
    display: 'none'
  }

  /**
   * This is the main constructor function for our class. Here, we set the 
   * initial state, call the parent constructor, initialize the itemObjects 
   * object and also set each value to 1.
   * 
   * @param {Object} props - contains all propeties for our App.
   */
  constructor(props) {

    super(props)

    // This object acts as a boolean array for each individual item.
    // A 1 represents that the item is visible and a 0 represents invisibility.
    let itemsObject = {}

    // At the beginning of our program, set ALL items to VISIBLE
    for(let i of itemNames) {
      itemsObject[i] = 1
    }

    // Setup our application state
    this.state = {

      // This is the content of our 'search' input field
      searchText: '',

      // This is the selected item. One of eight saved item boxes are available to be selected (0 - 7)
      selectedItem: -1,

      // The visibleItems array contains a state of all items and their visibility states (1 or 0)
      visibleItems: itemsObject,

      // myItems is responsible for containing the view of each of the eight boxes (SavedItem component).
      myItems: this.INIT_SAVED_ITEMS

    }

    // Reference to the item list div (has overflow)
    this.refItemList = React.createRef()

  }

  /**
   * Updates the list of visible items (in the item list view)
   */
  updateVisiblity() {
    
    // Get call-by-value copy of object
    let objVisibleItems = Object.assign({}, this.state.visibleItems)

    // Set visibility based on search result
    for(let i of itemNames) {

      if(i.match(new RegExp(this.state.searchText, "i"))) {
        objVisibleItems[i] = 1
      } else {
        objVisibleItems[i] = 0
      }

    }

    // Set state object
    this.setState({
      visibleItems: objVisibleItems
    })
    
  }

  /**
   * Shows all item names in the item list view
   */
  showAllItemNames() {
    
    // Get call-by-value copy of object
    let objVisibleItems = Object.assign({}, this.state.visibleItems)

    // Set visibility based on search result
    for(let i of itemNames) {

        objVisibleItems[i] = 1

    }

    // Set state object
    this.setState({
      visibleItems: objVisibleItems
    })
    
  }

  /**
   * Gets item data from the RS07 API and populates the UI.
   * 
   * @param {String} itemName - The name of the item to fetch json data for.
   * @returns {String} - json string of information for the requested itemName.
   */
  populateData(itemId, itemName) {

    // Need to use a proxy to get around CORS for this particular API...
    let proxy = this.PROXY

    let destination = proxy + this.ITEM_DATABASE_API_PREFIX + itemId
    // let destinationB = 'http://' + this.ITEM_DATABASE_API_PREFIX + itemId

    let methods = {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      }
    }

    // This output object will be populated by the fetch request. Once it returns, 
    // it will contain the NEW and data generated by the promise.
    let output = {}

    // Initiate the fetch request
    fetch(destination, methods)
    .then(response => {
      // Parse the fetched blob into json

      return response.json()
    })
    .then(response => {
      // Filter the desired json data into our view (item name, description, image and price)

      consoleLog('FETCH SUCCESS:')
      consoleLog(response)

      output = {
        itemName: itemName,
        itemDescription: response.item.description,
        itemId: itemId,
        itemImage: response.item.icon,
        itemCost: response.item.current.price
      }
      
      // Create new array for state update
      let arrItems = this.state.myItems
      arrItems[this.state.selectedItem] = output

      // Set new array into state and reset the search bar (state)
      if(this.state.selectedItem != -1) {
        this.setState({
          selectedItem: -1,
        })
      }

    })
    .catch(error => {
      // Inform the user of the missing data.

      consoleLog('RS07 API Fetch Error (the proxy may be DOWN)')
      consoleLog(error)

      output = {
        itemName: 'Request error',
        itemDescription: 'The proxy or API may be down.',
        itemId: -1,
        itemImage: require('./img/place-holder.png'),
        itemCost: 0
      }
      
      let arrItems = this.state.myItems
      arrItems[this.state.selectedItem] = output

      // Set new array into state and reset the search bar (state)
      if(this.state.selectedItem != -1) {
        this.setState({
          selectedItem: -1,
        })
      }

    })

  }

  /**
   * Adds a new item to watch based on the name.
   * 
   * @param {String} itemName - The name of the item to add to the selected saved item box.
   */
  addItem = (itemName) => {

    // Temporary 'loading' display while the fetch request does its thing
    let loadingData = {
      itemName: 'Loading...',
      itemDescription: 'Fetching data from server...',
      itemId: 1,
      itemImage: require('./img/place-holder.png'),
      itemCost: '0'
    }

    // Get item data from API
    let myItemData = this.populateData(itemBank[itemName], itemName)

    // Create new array for state update
    let arrItems = this.state.myItems
    arrItems[this.state.selectedItem] = loadingData

    // Set new array into state and reset the search bar (state)
    this.setState({
      myItems: arrItems,
      searchText: '',
      items: []
    })

    // Reset search bar and scroll it to the top
    this.showAllItemNames()
    this.refItemList.current.scrollTop = 0

  }

  /**
   * Handles new changes to the header search text and filters through 
   * items based on the search text.
   * 
   * @param {Object} event - The on change event generated by the text-field update.
   */
  handleSearchTextChange = (event) => {

    // Set search value
    this.setState({
      searchText: event.target.value,
      items: []
    })

    this.updateVisiblity()

  }

  /**
   * Handles showing/hiding the item search user interface (search bar and search results).
   */
  itemSearchVisibilityHandler = () => {
    return (this.state.selectedItem == -1) ? this.OBJECT_NOT_VISIBLE : this.OBJECT_VISIBLE
  }

  /**
   * Handles clicking on one of the eight savedItem boxes. Sets the selectedItem state 
   * to the id of the selected box.
   */
  selectSavedItem = (boxId) => {
    this.setState({selectedItem: boxId})
  }

  /**
   * Render the UI.
   */
  render() {
    return (
      <div className="App">

        <div className="header">
          <h1>RuneScape 2007 Item Tracker</h1>
          <a href='http://oldschool.runescape.com' target='_blank' ><img src={imgRuneScapeLogo}></img></a>
        </div>

        <SavedItems items={this.state.myItems} itemClick={this.selectSavedItem} selectedItem={this.state.selectedItem} />
        
        <div className='item-search' style={this.itemSearchVisibilityHandler()}>

          <input className="item-input" title='Type to filter the item list.' type="text" value={this.state.searchText} onChange={this.handleSearchTextChange} />

          <Items itemNames={itemNames} visibleItems={this.state.visibleItems} itemClick={this.addItem} myRef={this.refItemList}/>
          
        </div>

      </div>
    )
  }
}

export default App
