import React,{Component} from 'react';
import logo from '../../images/logo.png'
import './appHeader.css'

class AppHeader extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <header class="appHead">
            <img className="bluestchImg" alt="Bluestacks!!!!" src={logo} />
            {/* <span>Bluestacks</span> */}
            </header>
        )
    }
}

export default AppHeader;