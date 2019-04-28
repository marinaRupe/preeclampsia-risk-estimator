import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as riskActions from '../../redux/actions/risk.actions';
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
        match: { params: { patientId, pregnancyNumber } },
      } = this.props;

      this.setState({
        isLoading: false,
      });
    });
  }

  generatePDF = async () => {
    const {
      generatePDFReport,
      match: { params: { patientId } },
      patient
    } = this.props;

    await generatePDFReport(patientId, patient);
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

const mapStateToProps = ({ patients }) => {
  return {
    patient: patients.patientDetails,
    pregnancy: patients.pregnancyDetails,
  };
};

const mapDispatchToProps = {
  generatePDFReport: riskActions.generatePDFReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PregnancyDetails));