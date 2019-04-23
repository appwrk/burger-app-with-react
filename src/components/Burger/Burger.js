import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props);
    // convert ingredientlist from object to array

    /*
    const ingredientnames = Object.entries(props.ingredients);
    console.log(ingredientnames);
    let ingredientlist = [];
    ingredientnames.forEach(function(ingr) {
        let ingrName = ingr[0];
        let ingNr = ingr[1];
        let typelist = [];
        for (var i= 0; i< ingNr; i++) {
            typelist.push(<BurgerIngredient key={ingrName + i} type={ingrName}/>);
        }
        ingredientlist.push(typelist);
    });*/
    

    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        //console.log(props.ingredients);
        //console.log(props.ingredients[igKey]);// 1, 1, 2, 2 the numbers
    
        return [...Array(props.ingredients[igKey])].map((_,i) => {  // Array(2) fx returns an array with 2 empty or undefined position[]
        // _ in map just indicates it's doesn't matter what's there, we only use i   
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    });

    console.log(transformedIngredients);
    // To check if there is anything inside, we flatten the array 
    // takes every array inside one by one, and checks if there is sg inside
    /*
    transformedIngredients.reduce((arr, el) => {
        return arr.concat(el)
    }, [])*/

    // We can also use filter:

    let flattenned = transformedIngredients.filter(memberarr => {
        return memberarr.length > 0
    })
    console.log(flattenned);

    // if there is no ingredient added:
    if (flattenned.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;