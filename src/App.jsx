import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

//FIXME: shouldn't render components into body
ReactDOM.render(
    <h1 className="h4">Hello world!</h1>,
    document.querySelector('body'),
)
