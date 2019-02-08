import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import history from '../../history';
import { APP } from '../../constants/routes';
import * as patientActions from '../../redux/actions/patient.actions';
import MaternalCharacteristics from './components/MaternalCharacteristics';
import MedicalHistory from './components/MedicalHistory';
import BiophysicalMeasurements from './components/BiophysicalMeasurements';
import BiochemicalMeasurements from './components/BiochemicalMeasurements';
import BasicInfo from './components/BasicInfo';

class PregnancyDetails extends Component {
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
        fetchPregnancyDetails,
        match: { params: { patientId, pregnancyNumber } },
      } = this.props;

      await fetchPregnancyDetails(patientId, pregnancyNumber);

      this.setState({
        isLoading: false,
      });
    });
  }

  calculateRisk = () => {
    const {
      match: { params: { patientId, pregnancyNumber } },
    } = this.props;

    history.push(APP.RISK_ESTIMATE(patientId, pregnancyNumber));
  }

  render() {
    const { pregnancy } = this.props;
    const { isLoading } = this.state;

    if (isLoading || !pregnancy) {
      return (
        <div className='page'>
          <h1>Detalji o trudnoći</h1>
          <h4>Učitavanje podataka...</h4>
          {/* add spinner */}
        </div>
      );
    }

    return (
      <div className='page'>
        <h1>Detalji o trudnoći</h1>
      
        <div>
          <BasicInfo pregnancy={pregnancy} />
          <MaternalCharacteristics pregnancy={pregnancy} />
          <MedicalHistory pregnancy={pregnancy} />
          <BiophysicalMeasurements pregnancy={pregnancy} />
          <BiochemicalMeasurements pregnancy={pregnancy} />

          <Button
            bsStyle='primary'
            onClick={this.calculateRisk}
          >
            Izračunaj rizik
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ patients }) => {
  return {
    pregnancy: patients.pregnancyDetails,
  };
};

const mapDispatchToProps = {
  fetchPregnancyDetails: patientActions.fetchPatientPregnancyDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PregnancyDetails));
