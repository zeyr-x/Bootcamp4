import React from 'react';
import Search from './components/Search';
import ViewBuilding from './components/ViewBuilding';
import BuildingList from './components/BuildingList';
import Credit from './components/Credit';
import AddBuilding from './components/AddBuilding';
import RemoveBuilding from './components/RemoveBuilding';
import { Button } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      selectedBuilding: 0,
      buildingData: this.props.data,
      addingBuilding: false,
      removingBuilding: false
    };

  }

  performingAdd() {
     this.setState({addingBuilding: true});
  }

  cancelAdd() {
    this.setState({addingBuilding: false});
  }

  performingRemove() {
     this.setState({removingBuilding: true});
  }

  cancelRemove() {
    this.setState({removingBuilding: false});
  }

  insertBuilding(buildingName) {
      let buildingData = this.state.buildingData;
      buildingName.id = buildingData[buildingData.length - 1].id + 1;
      buildingData.push(buildingName);
      this.setState({buildingData: buildingData, addBuilding: false, selectedBuilding: buildingName.id});
  }

  removeBuilding(id) {
    let buildingData = this.state.buildingData;
    const buildingIndex = buildingData.findIndex((el) => el.id == id);
    buildingData.splice(buildingIndex, 1);
    this.setState({buildingData: buildingData});
  }


  filterUpdate(value) {
    //Here you will need to set the filterText property of state to the value passed into this function
    this.setState({filterText: value});
  }

  selectedUpdate(id) {
    //Here you will need to update the selectedBuilding property of state to the id passed into this function
    this.setState({selectedBuilding: id});
  }

  render() {

    let buildings = (
      <div>
        <Button onClick={this.performingAdd.bind(this)}>Add a Building</Button>
        <Button onClick={this.performingRemove.bind(this)}>Remove a Building</Button>
        <tr>
          <b>&nbsp; Name &nbsp; &nbsp; &nbsp; Code</b>
        </tr>
        <BuildingList
          data={this.state.buildingData}
          filterText={this.state.filterText}
          selectedUpdate={this.selectedUpdate.bind(this)}
        />
      </div>
    );
    
     let addView = (
      <AddBuilding 
        insertBuilding={this.insertBuilding.bind(this)}
        cancelAdd={this.cancelAdd.bind(this)}
      />
    );

    let removeView = (
      <RemoveBuilding 
        removeBuilding={this.removeBuilding.bind(this)}
        cancelRemove={this.cancelRemove.bind(this)}
      />
    );

     let buildingView = (
      <ViewBuilding 
        data={this.state.buildingData}
        selectedBuilding={this.state.selectedBuilding}
      />
    );

     let rightView = buildingView;

     let leftView;
     if(this.state.removingBuilding) {
      leftView = removeView;
     }
     else if (this.state.addingBuilding) {
      leftView = addView;
     }
     else {
      leftView = buildings;
     }


    return (
      <div className="bg">
        <div className="row">
          <h1>UF Directory App</h1>
        </div>

        <Search
          filterUpdate={this.filterUpdate.bind(this)}
        />
        <main>
          <div className="row">
            <div className="column1">
              <div className="tableWrapper">
                <table className="table table-striped table-hover">
                  {leftView}
                </table>
              </div>
            </div>
            <div className="column2">
              {rightView}
            </div>
          </div>
          <Credit />
        </main>
      </div>
    );
  }
}

export default App;
