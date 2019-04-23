import React, {Component} from 'react';
import classes from './Modal.module.css';
//import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

// turning modal component to class component, to be able to implement shouldComponentUpdate
class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // only need to update, if show changes
        // or gets new children in the modal (a.k.a spinner)
        if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
            return true;
        } else {
            return false;
        }
        // return nextProps.show !== this.props.show
    }

    componentDidUpdate() {
        console.log('[Modal] DidUpdate');
    }
    render() {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        // -100vh - viewport height. Will slide off the screen if not show
                        opacity: this.props.show ? '1' : '0'
                    }}   >
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Modal;