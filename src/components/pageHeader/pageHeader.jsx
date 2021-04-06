import React,{Component} from 'react';

import './pageHeader.css'

class PageHeader extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div class="pageHead">
                Manage Campaigns
            </div>
        )
    }
}

export default PageHeader;