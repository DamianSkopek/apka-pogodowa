import React from 'react'

const Form = (props) => {
    return (
        <form onSubmit={props.submit} >
            <input 
            type="text" 
            value={props.value}
            placeholder="Wpisz miasto"
            // na zmianę aktywujemy props.change
            onChange={props.change}

            />
            <button>Wyszukaj miasto</button>
        </form>
    )
}


export default Form