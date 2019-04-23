import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    // it is too late to call onInitPurchase() in componentWillMount in the Checkout container 
    // it runs before render runs, but it doesn't prevent the rendering with the old props we received, where the purchased is still true
    // we can't dispatch this action here
    /*
    componentWillMount() {
        // we dispatch our init action here
        
        this.props.onInitPurchase();
    } */

    checkoutCancelledHandler = () => {
        // goes back to last page
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }


    render() {
        // if ingredients are not yet loaded, we get an error message
        // we redirect to burger builder page, where there is a loader until no ingredients are loaded. 
        let summary = <Redirect to='/'/>;
        if (this.props.ings) {
            // we also redirect if the purchase is finished
            const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                    {/* we no longer need pass in props, that will go through Redux, so we simply add as component, and not render as JSX*/}
                </div>
            )
        }

        return summary;
    }
}

// we use Redux now, no longer need to extract query params. 
// get the ingredients from the Redux store instead

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

/* WE don't need it here, instead in BurgerBuilder, after order now button clicked
const mapDispatchToProp = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}*/

export default connect(mapStateToProps)(Checkout);