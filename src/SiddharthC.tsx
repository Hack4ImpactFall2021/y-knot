import React from 'react';

interface CommonProps { 

    firstName: string, 
    lastName: string,
    age: number;

}

type PizzaProps = 
    | { 
        likesPizza?: false; favTop?: never
    }

    | { 
        likesPizza?: true, favTop: Array<string>
    }


type SiddharthProps = PizzaProps & CommonProps

const SiddharthsComponent: any (props: SiddharthProps) => { 

    if (props.likesPizza) { }

    return { 

        <p><b>Name: </b> {props.firstName + props.lastName}</p>
        <p><b>Age: </b>{ props.age}</p>

        if (props.likesPizza) { 
            <p>I like pizza.</p>
        } else { 
            <p> I do not like pizza.</p>
        }

    }

}

export default SiddharthsComponent;
