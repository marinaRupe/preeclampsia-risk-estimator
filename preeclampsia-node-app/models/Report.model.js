const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Report = sequelize.define('Report', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    protocolNumber: {
      type: Sequelize.STRING,
    },
    calculatedRisk: {
      type: Sequelize.DOUBLE,
    },
    note: {
      type: Sequelize.STRING,
    },
    dateGenerated: {
      type: Sequelize.DATE,
    },
  });

  Report.associate = (models) => {
    models.Report.belongsTo(models.User, {
      foreignKey: {
        name: 'generatedById',
        allowNull: false,
      },
      as: 'generatedBy',
    });

    models.Report.belongsTo(models.MedicalExamination, {
      foreignKey: {
        name: 'medicalExaminationId',
        allowNull: false,
      },
      as: 'medicalExamination',
    });
  };

  return Report;
};
