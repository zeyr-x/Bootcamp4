import React from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';

class RemoveBuilding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }

    performRemove() {
        if (this.name.value && this.code.value) {
            let building = {
                code: this.code.value,
                name: this.name.value,
                address: this.addr.value,
                coordinates: {
                    latitude: this.lat.value,
                    longitude: this.lon.value
                }
            };
            this.props.removeBuilding(building);
        } else {
            this.setState({error: true});
        }
    }

    render() {

        let error = this.state.error ? <p className="error-text">Invalid name or code</p> : null;

        return (
            <div>
                <input type="text" placeholder="Enter name" ref= { (value) => { this.name = value } }/>
                <input type="text" placeholder="Enter code" ref= { (value) => { this.code = value } }/>
                <input type="text" placeholder="Enter address" ref= { (value) => { this.addr = value } }/>
                <input type="text" placeholder="Enter latitude" ref= { (value) => { this.lat = value } }/>
                <input type="text" placeholder="Enter longitude" ref= { (value) => { this.lon = value } }/>
                {error}
                <Button variant="danger" onClick={this.performRemove.bind(this)}>Remove</Button>
                <Button variant="dark" onClick={this.props.cancelRemove}>Cancel</Button>
            </div>
        )
    }
}

export default RemoveBuilding; 