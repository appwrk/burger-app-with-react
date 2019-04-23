
import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

// turn into Class component, so we can add lifecycle hooks, and to see when it's updated
class OrderSummary extends Component {
    // this could be a functional component, doesn't nedd to be a class
    componentDidUpdate() {
        // OrderSummary updates even though not showing, doesn't need to rerender. We can stop that in modal. 
        console.log('[OrderSummary] componentDidUpdate'  );
    }
    
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>)
        });
        return (
            <>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </>
        );
    }
}

export default OrderSummary;