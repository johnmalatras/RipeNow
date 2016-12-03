import React, { PropTypes } from 'react';
import MarketList from '../components/MarketList.jsx';
import ItemModal from '../components/ItemModal.jsx';
import { connect } from 'react-redux';
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var Table = ReactBootstrap.Table;
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

class MarketView extends React.Component {

  componentWillMount() {
    this.props.actions.requestItems();
  }
  render() {
    return (
      <div>
        <h1>Market</h1>
        <Table responsive>
            <thead>
              <tr>
                <th>Item</th>
                <th>Seller</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Metric</th>
                <th>Quality</th>
              </tr>
            </thead>
            <MarketList items={ this.props.items }
                        onItemSelect={selectedItem => this.props.actions.openModal({selectedItem}) }/>
        </Table>
        <ItemModal show={this.props.modalIsOpen} 
                  selectedItem={this.props.selectedItem} 
                  onHide={ () => this.props.actions.closeModal() } 
                  cart={this.props.cart}
                  addToCart={ cartAdd => this.props.actions.addToCart({cartAdd}) }
                  userInfo={this.props.userInfo} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    items: state.items.items,
    modalIsOpen: state.modal.modalIsOpen,
    selectedItem: state.modal.selectedItem,
    cart: state.cart.cart,
    userInfo: state.AuthReducer.userInfo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MarketView);