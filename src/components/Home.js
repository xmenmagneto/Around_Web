import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import { GEO_OPTIONS } from "../constants";
import { POS_KEY } from "../constants";

const TabPane = Tabs.TabPane;
const operations = <Button>Extra Action</Button>;


export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
    }

    componentDidMount() {  //不需要bind this， this本来就available
        if ("geolocation" in navigator) {
            /* geolocation is available */
            this.setState({ loadingGeoLocation: true});
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS,
            );
        } else {
            /* geolocation IS NOT available */
            console.log('geo location not supported!');
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        this.setState({ loadingGeoLocation: false});
        const {latitude: lat, longitude: lon} = position.coords;  //get longitude and latitude  (destructing)
        localStorage.setItem(POS_KEY, JSON.stringify({lat: lat, lon: lon}));
    }

    onFailedLoadGeoLocation = () => {
        this.setState({ loadingGeoLocation: false});
    }

    getGalleryPanelContent = () => {
        if (this.state.loadingGeoLocation) {
            //show spinner
            return <Spin tip="Loading geo location..."/>
        }
        return null;
    }



    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Posts" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Map" key="2">
                    Content of tab 2
                </TabPane>
            </Tabs>
        );
    }
}

