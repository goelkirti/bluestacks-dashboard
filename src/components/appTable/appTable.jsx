import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { headerData } from '../../tableData'
import Modal from '../../components/pricePortal/pricePortal'
import AppCalendar from '../../components/calendarPlugin/calendarHandler'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faChartLine, faCoffee, faDollarSign, faFile } from '@fortawesome/free-solid-svg-icons'

import './appTable.css'
// import faStyles from 'font-awesome/css/font-awesome.css'

class AppTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "showModal": false,
            "pricetag": [],
            "imgUrl": "",
            "name": "",
            "region": "",
            "showCal": false,
            "trInd": 0
        }
    }

    modalHandler = (price, imgUrl, name, region) => {
        this.setState({
            "showModal": true,
            "pricetag": price,
            "imgUrl": imgUrl,
            "name": name,
            "region": region
        })
    }

    closeHandler = (fromChild) => {
        this.setState({
            "showModal": fromChild,
            "pricetag": [],
            "imgUrl": "",
            "name": "",
            "region": ""
        })
    }

    calendarHandle = (e) => {
        $('span.calSpan').removeClass('showCal');
        $('div.react-calendar').hide()
        $(e.target).parents('span').addClass('showCal')
        var ind = $(e.target).parents('tr').index();
        this.setState({
            "trInd": ind
        })
        $('span.showCal div.react-calendar').show();
    }

    updatedTable = (sampleData, changeData, tablename, oldtable) => {
        this.props.tabTable(sampleData, changeData, tablename, oldtable)
    }

    componentDidMount() {
        $('body').on('click', function (e) {
            e.stopPropagation();
            if($(e.target).attr('class') != undefined)
                var x = $(e.target).attr('class').indexOf('react-calendar')
            if (!($(e.target).hasClass('calInnerspan') || $(e.target).hasClass('calIcon') || x !=-1)) {
                $('div.react-calendar').hide()
            }
        })
    }

    render() {
        var finalTableHead = headerData.map((headitem) => {
            return <Th>{headitem.toUpperCase()}</Th>
        });

        var finalTableData = this.props.tableObj.map((item, index) => {
            return (
                <Tr key={index}>
                    <Td>
                        <div>{new Date(item.createdOn).toDateString()}</div>
                        <div className="daysDiff">{item.dateDiff}</div>
                    </Td>
                    <Td className="nameDetails">
                        <div className="itemLogo">
                            <img src={item.image_url}></img>
                        </div>
                        <div className="itemDetails">
                            <div>{item.name}</div>
                            <div className="daysDiff">{item.region}</div>
                        </div>
                    </Td>
                    <Td onClick={() => this.modalHandler(item.price, item.image_url, item.name, item.region)}>
                        <span className="curCont">
                            <FontAwesomeIcon icon={faDollarSign} color="#FFFFFF"/>
                        </span>
                        <span className="iconSpan priceTxt">View Pricing</span>
                    </Td>
                    <Td>
                        <span className="iconsCont">
                            <FontAwesomeIcon icon={faFile} color="#C1D896" />
                            <span className="iconSpan">CSV</span>
                        </span>
                        <span className="iconsCont">
                            <FontAwesomeIcon icon={faChartLine} color="#F29E7A"/>
                            <span className="iconSpan">Report</span>
                        </span>
                        <span onClick={this.calendarHandle} className="calSpan iconsCont">
                            <AppCalendar calValue={new Date(item.createdOn)} tableData={this.props.tableObj} index={this.state.trInd} updates={this.updatedTable} />
                            <FontAwesomeIcon icon={faCalendarAlt} className="calIcon" color="#7BAFE3" />
                            <span className="iconSpan calInnerspan">Schedule Again</span>
                        </span>
                    </Td>
                </Tr>
            )

        })
        return (
            <React.Fragment>
                <Table id="appTable">
                    <Thead>
                        <Tr>
                            {finalTableHead}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {finalTableData}
                    </Tbody>

                </Table>
                {this.state.showModal ? <Modal pricetag={this.state.pricetag} img_url={this.state.imgUrl} name={this.state.name} region={this.state.region} closeHandler={this.closeHandler}></Modal> : null}
            </React.Fragment>
        )
    }
}

export default AppTable;