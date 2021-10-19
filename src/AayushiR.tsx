import React from 'react';

interface CommonProps {
    firstName: string;
    lastName: string;
    age: number;
}

type PizzaProps = 
    | { likesPizza: false; favoriteToppings?: never}
    | { likesPizza: true; favoriteToppings?: Array<string>}

type AayushisProps = CommonProps & PizzaProps

function AayushisComponent (props: AayushisProps) {
    if (props.likesPizza) {
        
    }

    return (
        <div>
            <h2>About Me</h2>
            <p><b>First Name:</b> {props.firstName}</p>
            <p><b>Last Name:</b> {props.lastName}</p>
            <p><b>Age:</b> {props.age}</p>
            I {props.likesPizza ? 'do' : 'do not'} like pizza.
            {props.likesPizza && <p>These are my favorite toppings: 
                <ul>{props.favoriteToppings?.map(topping => <li>{topping }</li>)}</ul></p>}
            <hr></hr>
        </div>
    )
}

export default AayushisComponent;