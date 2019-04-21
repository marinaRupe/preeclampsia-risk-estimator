import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import history from '../../history';
import { APP } from '../../constants/routes';
import * as pregnancyActions from '../../redux/actions/pregnancy.actions';
import Spinner from '../../components/Spinner';
import TrimesterDetails from './components/TrimesterDetails';
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
    const { pregnancyDetails } = this.props;
    const { isLoading } = this.state;

    if (isLoading || !pregnancyDetails) {
      return (
        <div className='page'>
          <h1>Detalji o trudnoći</h1>
          <div className='align-horizontal--center'>
            <Spinner />
          </div>
        </div>
      );
    }

    return (
      <div className='page'>
        <h1>Detalji o trudnoći</h1>
      
        <div>
          <BasicInfo pregnancy={pregnancyDetails} />

          <h2>Trimestri</h2>

          <TrimesterDetails pregnancyId={pregnancyDetails.id} trimesterNumber={1} />

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

const mapStateToProps = ({ pregnancy }) => {
  return {
    pregnancyDetails: pregnancy.details,
    trimesters: pregnancy.trimesters,
  };
};

const mapDispatchToProps = {
  fetchPregnancyDetails: pregnancyActions.fetchPatientPregnancyDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PregnancyDetails));
