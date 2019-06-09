import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import {
	getReactTableConstants,
	sortDirections,
	defaultPageSize,
} from 'constants/reactTable.constants';
import { APP } from 'constants/routes';
import * as patientActions from 'redux/actions/patient.actions';
import { formatDate } from 'utils/dateTime.utils';
import { getTranslations } from 'utils/translation.utils';
import AddPatientModal from './content/AddPatientModal';
import EditPatientModal from './content/EditPatientModal';
import PatientSidebar from './content/PatientSidebar';
import DeletePatientModal from './content/DeletePatientModal';

class PatientList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			addPatientModalIsOpen: false,
			editPatientModalIsOpen: false,
			deletePatientModalIsOpen: false,
			selectedPatient: null,
			page: 1,
			pageSize: defaultPageSize,
			sortColumn: '',
			sortDirection: '',
			searchInput: ''
		};
	}

  fetchData = (state, instance) => {
  	const { page, pageSize, sorted } = state;

  	const sortColumn = sorted[0] && sorted[0].id;
  	const sortDirection = sorted[0] && (sorted[0].desc ? sortDirections.DESC : sortDirections.ASC);

  	this.setState({
  		page: page + 1,
  		pageSize,
  		sortColumn,
  		sortDirection,
  	}, this.updateTable);
  }

  updateTable = () => {
  	const { page, pageSize, sortColumn, sortDirection, searchInput } = this.state;

  	this.setState({
  		isLoading: true,
  	}, async () => {
  		const { fetchPatientList } = this.props;
  		await fetchPatientList(page, pageSize, sortColumn, sortDirection, searchInput);

  		this.setState({
  			isLoading: false,
  		});
  	});
  }

  refreshTable = () => {
  	this.setState({
  		page: 1,
  		pageSize: defaultPageSize,
  		sortColumn: '',
  		sortDirection: '',
  	}, this.updateTable);
  }

  onSearchInputChange = (e) => {
  	if (e.key && e.key !== 'Enter') {
  		return;
  	}

  	e.preventDefault();
  	e.stopPropagation();

  	this.setState({
  		searchInput: this.searchInput.value.trim(),
  	}, this.updateTable);
  }

  selectPatient = (selectedPatient) => {
  	this.setState({ selectedPatient });
  }

  unselectPatient = () => {
  	this.setState({ selectedPatient: null });
  }

  isRowSelected = (rowData) => {
  	const { selectedPatient } = this.state;
  	return selectedPatient && selectedPatient.id === rowData.id;
  }

  openAddPatientModal = () => {
  	this.setState({ addPatientModalIsOpen: true });
  }

  closeAddPatientModal = () => {
  	this.setState({ addPatientModalIsOpen: false });
  }

  openEditPatientModal = () => {
  	this.setState({ editPatientModalIsOpen: true });
  }

  closeEditPatientModal = () => {
  	this.setState({ editPatientModalIsOpen: false });
  }

  openDeletePatientModal = () => {
  	this.setState({ deletePatientModalIsOpen: true });
  }

  closeDeletePatientModal = () => {
  	this.setState({ deletePatientModalIsOpen: false });
  }

  addPatient = async (patientData) => {
  	const { createPatient } = this.props;
  	await createPatient(patientData);
  	this.closeAddPatientModal();
  	this.refreshTable();
  };

  editPatient = async (patientData) => {
  	const { updatePatient } = this.props;
  	await updatePatient(patientData);
  	this.closeEditPatientModal();
  };

  deletePatient = async (patientId) => {
  	const { removePatient } = this.props;
  	await removePatient(patientId);
  	this.unselectPatient();
  	this.closeDeletePatientModal();
  	this.refreshTable();
  };

  getColumns = () => {
  	const translations = getTranslations();

  	return [
  		{
  			Header: 'MBO',
  			accessor: translations.patient.property.MBO,
  			Cell: props => (
  				<span>
  					<Link to={APP.PATIENT.DETAILS(props.original.id)}>
  						{props.value}
  					</Link>
  				</span>
  			)
  		},
  		{
  			Header: translations.patient.property.firstName,
  			accessor: 'firstName',
  			Cell: props => <span>{props.value}</span>
  		},
  		{
  			Header: translations.patient.property.lastName,
  			accessor: 'lastName',
  			Cell: props => <span>{props.value}</span>
  		},
  		{
  			Header: translations.patient.property.createdAt,
  			accessor: 'createdAt',
  			Cell: props => <span>{formatDate(props.value)}</span>
  		},
  	];
  }

  render() {
  	const { patients, totalPages }  = this.props;
  	const {
  		isLoading,
  		addPatientModalIsOpen,
  		editPatientModalIsOpen,
  		deletePatientModalIsOpen,
  		selectedPatient
  	} = this.state;

  	const translations = getTranslations();

  	return (
  		<div className='page'>
  			<AddPatientModal
  				show={addPatientModalIsOpen}
  				handleClose={this.closeAddPatientModal}
  				onSubmit={this.addPatient}
  			/>
  			<EditPatientModal
  				show={editPatientModalIsOpen}
  				handleClose={this.closeEditPatientModal}
  				onSubmit={this.editPatient}
  				initialValues={selectedPatient}
  			/>
  			<DeletePatientModal
  				show={deletePatientModalIsOpen}
  				patient={selectedPatient}
  				deletePatient={this.deletePatient}
  				handleClose={this.closeDeletePatientModal}
  			/>
  			<div className='page__header mb-10'>
  				<h1>{translations.patient.listTitle}</h1>
  				<div className='align-vertical--center'>
  					<div className='redux-form__input-container patient-list__search mr-20'>
  						<input
  							type='text'
  							className='redux-form__input'
  							onKeyDown={this.onSearchInputChange}
  							ref={r => { this.searchInput = r; } }
  							placeholder={translations.patient.search}
  						/>
  						<i className='material-icons'>search</i>
  					</div>
            
  					<Button
  						bsStyle='primary'
  						onClick={this.openAddPatientModal}
  					>
  						{translations.patient.action.add}
  					</Button>
  				</div>
  			</div>

  			<div className={`ml-20 table-view ${selectedPatient ? 'row-selected' : ''}`}>
  				<div className='table-view--table'>
  					<ReactTable
  						loading={isLoading}
  						data={patients}
  						pages={totalPages}
  						columns={this.getColumns()}
  						onFetchData={this.fetchData}
  						{...getReactTableConstants()}
  						getTrProps={(state, rowInfo) => {
  							if (!rowInfo) {
  								return {};
  							}
  							return {
  								onClick: this.selectPatient.bind(null, rowInfo.original),
  								className:`react-table__row ${this.isRowSelected(rowInfo.original) ? 'is-active' : ''}`
  							};
  						}}
  					/>
  				</div>
  				{
  					selectedPatient &&
            <PatientSidebar
            	patient={selectedPatient}
            	closeSidebar={this.unselectPatient}
            	openEditPatientModal={this.openEditPatientModal}
            	openDeletePatientModal={this.openDeletePatientModal}
            />
  				}
  			</div>
  		</div>
  	);
  }
}

const mapStateToProps = ({ patients }) => {
	return {
		patients: patients.list.data,
		totalPages: patients.list.totalPages,
	};
};

const mapDispatchToProps = {
	fetchPatientList: patientActions.fetchPatientList,
	createPatient: patientActions.createPatient,
	updatePatient: patientActions.updatePatient,
	removePatient: patientActions.removePatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
