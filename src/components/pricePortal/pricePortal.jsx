import { Component } from 'react'
import ReactDOM from 'react-dom'

import './pricePortal.css'
// import Bitmap from '../../images/Bitmap.png'

class Modal extends Component {
    render() {
        let duration = ["1 week - 1 month", "6 months", "1 year"]
        var { pricetag, img_url, name, region } = this.props;
        var pricingArr = duration.map((dur, ind) => {
            return <div key={`modal${ind}`} className="priceRow">
                <div className="durDiv">{dur}</div>
                <div className="priceDiv">{pricetag[ind]}</div>
            </div>

        })
        return ReactDOM.createPortal(
            <div className="modalContainer">
                <div className="modalInner">
                    <div className="imgContainer">
                        <img src={this.props.img_url} className="img_host" />
                    </div>
                    <div className="imageDet">
                        <div className="nameDiv">{name.toUpperCase()}</div>
                        <div className="regionDiv">{region}</div>
                    </div>
                    <div>
                        <p className="priceHead">Pricing</p>
                        {pricingArr}
                    </div>
                    <div style={{padding: "10px",textAlign:"center"}}>
                        <button className="closeBtn" onClick={() => this.props.closeHandler(false)}>Close</button>
                    </div>
                </div>
            </div>,
            document.getElementById('portal-root')
        )
    }
}

export default Modal;