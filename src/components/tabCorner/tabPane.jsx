import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AppTable from '../../components/appTable/appTable'
import {futureCamp, liveCamp, pastCamp} from '../appTable/tableOrganizing'

import './tab.css';

class TabPane extends Component {
    constructor(props){
        super(props);
        this.state = {
            "futureCamp" : futureCamp,
            "liveCamp": liveCamp,
            "pastCamp": pastCamp
        }
    }

    anyUpdatesInTable = (sampleData, changeData, tablename, oldtable) => {
        if(tablename == oldtable){
            this.setState({
                tablename : sampleData.push(changeData)
            })
        }
        else{
            this.setState({
                tablename : this.state[tablename].push(changeData),
                oldtable : sampleData
            })
        }
        
    }
    render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>Upcoming Campaigns</Tab>
                    <Tab>Live Campaigns</Tab>
                    <Tab>Past Campaigns</Tab>
                </TabList>
                <TabPanel key="tab1">
                    <AppTable tableObj={this.state.futureCamp} tabTable={this.anyUpdatesInTable}></AppTable>
                </TabPanel>
                <TabPanel key="tab2">
                    <AppTable tableObj={this.state.liveCamp} tabTable={this.anyUpdatesInTable}></AppTable>
                </TabPanel>
                <TabPanel key="tab3">
                    <AppTable tableObj={this.state.pastCamp} tabTable={this.anyUpdatesInTable}></AppTable>
                </TabPanel>
            </Tabs>
        )
    }
}

export default TabPane;