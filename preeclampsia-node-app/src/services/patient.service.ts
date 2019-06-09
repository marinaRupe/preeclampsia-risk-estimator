import { Sequelize } from 'sequelize';
import values from 'constants/values.constants';
import { patientListSortColumnNames } from 'constants/patient.constants';
import { sortDirections } from 'constants/query.constants';
import { getSortColumnName, getSortDirection } from 'utils/query.utils';
import { db } from 'models/index';

const { Op } = Sequelize as any;

const getAll = async (
  page = values.DEFAULT_PAGE,
  pageSize = values.DEFAULT_PAGE_SIZE,
  sortColumn: string,
  sortDirection: string,
  search: string,
) => (
  await db.Patient.findAndCountAll({
    where: {
      [Op.or]: [
        {
          MBO: {
            [Op.iLike]: search
          }
        },
        {
          lastName: {
            [Op.iLike]: `${search}%`,
          },
        },
        {
          firstName: {
            [Op.iLike]: `${search}%`,
          },
        },
      ]
    },
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [
      [
        getSortColumnName(sortColumn, patientListSortColumnNames),
        getSortDirection(sortDirection, sortDirections.DESC),
      ],
    ],
  })
);

const getById = async (id: number) => await db.Patient.findByPk(id);

const getByIdWithPregnancies = async (id: number) => await db.Patient.findOne({
  where: {
    id
  },
  include: [{ model: db.Pregnancy, as: 'pregnancies' }]
});

const createPatient = async (patientData) => {
  const {
    firstName,
    lastName,
    MBO,
    birthDate,
    racialOrigin,
  } = patientData;

  const patient = await db.Patient.create({
    firstName,
    lastName,
    MBO,
    birthDate,
    racialOrigin,
  });

  return patient;
};

const updatePatient = async (id: number, patientData) => {
  const {
    firstName,
    lastName,
    MBO,
    birthDate,
    racialOrigin,
  } = patientData;

  const patient = await getById(id);

  return await patient.update({
    firstName,
    lastName,
    MBO,
    birthDate,
    racialOrigin,
  });
};

const removePatient = async (id: number) => {
  const patient = await getById(id);

  return await patient.destroy();
};

const existsPatientWithId = async (id: number): Promise<boolean> => !!(await getById(id));

const existsPatientWithMBO = async (MBO: string): Promise<boolean> => {
  const patient = await db.Patient.findOne({
    where: { MBO }
  });

  return !!patient;
};

export default {
  getAll,
  getById,
  getByIdWithPregnancies,
  createPatient,
  updatePatient,
  removePatient,
  existsPatientWithMBO,
  existsPatientWithId,
};
