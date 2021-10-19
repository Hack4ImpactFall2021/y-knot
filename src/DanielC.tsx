import React from 'react'


// Wondering if there's a better way to make a more readable/cleaner interface
// for Daniel Props

interface CommonProps {
  firstName: string,
  lastName: string,
  age: number
}
type PizzaProps =
  | {likesPizza?: false; toppings?: never}
  | {likesPizza: true; toppings: Array<string>}

type DanielsProps = CommonProps & PizzaProps


const DanielsComponent:React.FC<DanielsProps> = (props) =>  {



  return (
    <ul>
      <li>{props.firstName}</li>
      <li>{props.lastName}</li>
      <li>{props.age}</li>
      <li>likesPizza: {props.likesPizza}</li>

      {props.likesPizza && (
        <ul>
          {
            props.toppings.map(t => (
              <li>{t}</li>
            ))
          }
        </ul>
      )}

    </ul>
  )
}

export default DanielsComponent 
