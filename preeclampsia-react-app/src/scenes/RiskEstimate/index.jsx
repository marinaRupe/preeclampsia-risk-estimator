import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as patientActions from '../../redux/actions/patient.actions';
import * as riskActions from '../../redux/actions/risk.actions';
import * as pregnancyActions from '../../redux/actions/pregnancy.actions';
import Spinner from '../../components/Spinner';

class PregnancyDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const {
        fetchPatientDetails,
        fetchPregnancyDetails,
        match: { params: { patientId, pregnancyNumber } },
      } = this.props;

      await fetchPatientDetails(patientId);
      await fetchPregnancyDetails(patientId, pregnancyNumber);

      this.setState({
        isLoading: false,
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { pregnancy } = this.props;

    if (!pregnancy || (prevProps.pregnancy && pregnancy.id === prevProps.pregnancy.id)) {
      return;
    }

    this.setState({
      isLoading: true,
    }, async () => {
      const {
        fetchTrimesterDetails,
        pregnancy,
        match: { params: { trimesterNumber } },
      } = this.props;

      await fetchTrimesterDetails(pregnancy.id, trimesterNumber);

      this.setState({
        isLoading: false,
      });
    });
  }

  generatePDF = async () => {
    const {
      generatePDFReport,
      trimesters,
      match: { params: { trimesterNumber } },
    } = this.props;

    const trimester = trimesters[`trimester${trimesterNumber}`];
    await generatePDFReport(trimester.id);
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className='page'>
        <h1>Izvješće o riziku</h1>

        <div>
          TODO
        </div>

        <br />

        {
          isLoading &&
          <div className='align-horizontal--center'><Spinner /></div>
        }

        <div>
          <Button
            bsStyle='primary'
            onClick={this.generatePDF}
          >
            Generiraj PDF izvješće
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ patients, pregnancy }) => {
  return {
    patient: patients.patientDetails,
    pregnancy: pregnancy.details,
    trimesters: pregnancy.trimesters,
  };
};

const mapDispatchToProps = {
  generatePDFReport: riskActions.generatePDFReport,
  fetchPatientDetails: patientActions.fetchPatient,
  fetchPregnancyDetails: pregnancyActions.fetchPatientPregnancyDetails,
  fetchTrimesterDetails: pregnancyActions.fetchPregnancyTrimesterDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PregnancyDetails));
