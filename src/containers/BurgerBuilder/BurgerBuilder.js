import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    //constructor(props) {
    //    super(props);
    //    this.state = {...}
    //}
    state = {
        // we set ingredients to null, we get it from database from now on.
        // we move over ingredients and totalPrice to the reducer
       
        // the following: local UI states (showing modals, error messages, disable/enable button , etc) Not neceserraly needs Redux
        purchasing:false

    }

    // best place to fetch data: componentDidMount
    // In the guidelines discouraged is that you immediately call setState(), because It'll trigger an instant re-render 
    //it's fine to use it in some callback/ async code (ajax ), because it then doesn't run instantly. 
    componentDidMount() {
        console.log(this.props.ings);
        // this is replacing the direct axios call now, and goes through Redux
        this.props.onInitIngredients();
    }

    // need to update the purchasable prop whenever our ingredients change
    updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        },0);
        // we don't update the state anymore, just return the result of checking the sum. 
        return sum > 0
    } 

    purchaseHandler = () => {
        //this.setState works only with arrow functions (because of 'this')
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

            // we call the init action here instead, on clicking the continue button 
            this.props.onInitPurchase();
            // we use Redux now, no longer need to pass through query params. 
            // get the ingredients from the Redux store instead

            this.props.history.push({
                pathname: "/checkout"
            });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 // returns true/false
        }
       
        
        
        // we add spinner to those components, that are waiting for the data to load (Burger, BuildControls)
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        // we pass error with props and not through state anymore. But for that it needs to be part of our Redux state . 

        //this.state.ingredients !== null
        
        if (this.props.ings) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.price}
                    />
                </>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
                />
        }
        // we don't need that anymore, we are not doing anything asyncrunous when loading the modal
        /*
        if(this.state.loading) {
            orderSummary = <Spinner />
        } */
        
        return(
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        )
    }
}

const mapStateToProps = state => {
    return { 
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

// exporting the axios instance we use
// can add as many hoc here as we want
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));