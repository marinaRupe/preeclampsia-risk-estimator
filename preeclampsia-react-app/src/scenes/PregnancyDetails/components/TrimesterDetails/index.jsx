import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as pregnancyActions from '../../../../redux/actions/pregnancy.actions';
import MaternalCharacteristics from './components/MaternalCharacteristics';
import MedicalHistory from './components/MedicalHistory';
import BiophysicalMeasurements from './components/BiophysicalMeasurements';
import BiochemicalMeasurements from './components/BiochemicalMeasurements';
import BasicInfo from './components/BasicInfo';

class TrimesterDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEditModeOn: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const {
        fetchTrimesterDetails,
        pregnancyId,
        trimesterNumber
      } = this.props;

      await fetchTrimesterDetails(pregnancyId, trimesterNumber);

      this.setState({
        isLoading: false,
      });
    });
  }
  
  render() {
    const { trimesterData, trimesterNumber } = this.props;
    const { isLoading } = this.state;

    if (isLoading || !trimesterData) {
      return (
        <div className='pregnancy__trimester'>
          <h3>{trimesterNumber}. trimestar</h3>
          <h4>Učitavanje podataka...</h4>
          {/* add spinner */}
        </div>
      );
    }

    return (
      <div className='pregnancy__trimester'>
        <h3>{trimesterNumber}. trimestar</h3>
      
        <div>
          <BasicInfo trimesterData={trimesterData} />
          <MaternalCharacteristics trimesterData={trimesterData} />
          <MedicalHistory trimesterData={trimesterData} />
          <BiophysicalMeasurements trimesterData={trimesterData} />
          <BiochemicalMeasurements trimesterData={trimesterData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ pregnancy }) => {
  return {
    trimesterData: pregnancy.trimesters.trimester1,
  };
};

const mapDispatchToProps = {
  fetchTrimesterDetails: pregnancyActions.fetchPregnancyTrimesterDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrimesterDetails);
