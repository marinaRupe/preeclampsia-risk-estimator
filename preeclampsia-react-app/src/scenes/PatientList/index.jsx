import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as patientActions from '../../redux/actions/patient.actions';
import { APP } from '../../constants/routes';

class PatientList extends Component {
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
      const { fetchPatientList } = this.props;
      await fetchPatientList();

      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { patients }  = this.props;

    return (
      <div className='page'>
        <h1>Lista pacijenata</h1>

        <div>
          {patients.map((p, index) => (
            <div className='patient-list__item' key={p.id}>
              <span>
                <span>{index + 1}. </span>
                <Link to={APP.PATIENT.DETAILS(p.id)}>
                  {p.firstName} {p.lastName}
                </Link>
              </span>
            </div>
          ))}
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = ({ patients }) => {
  return {
    patients: patients.list.data,
  };
};

const mapDispatchToProps = {
  fetchPatientList: patientActions.fetchPatientList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
