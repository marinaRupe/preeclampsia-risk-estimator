const translations = {
  hr: {
    response: {
      defaultError: 'Dogodila se pogreška',
      success: {
        patient: {
          delete: 'Pacijent je uspješno izbrisan',
        },
        user: {
          delete: 'Korisnik je uspješno izbrisan',
        }
      },
      notFound: {
        patient: 'Pacijent nije pronađen',
        pregnancy: 'Podaci o trudnoći nisu pronađeni',
        medicalExamination: 'Podaci o pregledu nisu pronađeni',
        user: 'Korisnik nije pronađen',
      },
      error: {
        patient: {
          create: 'Unos pacijenta nije uspio',
          update: 'Ažuriranje podataka o pacijentu nije uspjelo',
          delete: 'Brisanje pacijenta nije uspjelo',
        },
        user: {
          create: 'Unos korisnika nije uspio',
          update: 'Ažuriranje podataka o korisniku nije uspjelo',
          delete: 'Brisanje korisnika nije uspjelo',
        },
        pregnancy: {
          create: 'Unos podataka o trudnoći nije uspio',
          update: 'Ažuriranje podataka o trudnoći nije uspjelo',
        },
        medicalExamination: {
          create: 'Unos podataka o pregledu nije uspio',
          update: 'Ažuriranje podataka o pregledu nije uspjelo',
        },
        measurements: {
          update: 'Ažuriranje podataka nije uspjelo',
        },
      }
    },
    user: {
      validation: {
        dataRequired: 'Podaci o korisniku su obavezni',
        firstNameRequired: 'Ime je obavezno polje',
        lastNameRequired: 'Prezime je obavezno polje',
        roleRequired: 'Uloga je obavezno polje',
        roleNotExist: 'Uloga ne postoji',
        emailRequired: 'E-mail je obavezno polje',
        emailInvalid: 'E-mail je neispravan',
        userWithEmailExist: 'Korisnik s ovom E-mail adresom već postoji',
        passwordRequired: 'Lozinka je obavezno polje',
        minPasswordLength: (length) => `Lozinka mora sadržavati minimalno ${length} znakova`,
        repeatedPasswordRequired: 'Ponovljena lozinka je obavezno polje',
        passwordsNotMatch: 'Lozinke se ne podudaraju'
      },
    },
    patient: {
      validation: {
        dataRequired: 'Podaci o pacijentu su obavezni',
        firstNameRequired: 'Ime je obavezno polje',
        lastNameRequired: 'Prezime je obavezno polje',
        birthDateRequired: 'Datum rođenja je obavezno polje',
        racialOriginRequired: 'Etnička skupina je obavezno polje',
        racialOriginNotExist: 'Etnička skupina ne postoji',
        MBORequired: 'MBO je obavezno polje',
        patientWithMBOExist: 'Pacijent s ovim MBO-om već postoji',
      },
    },
    pregnancy: {
      property: {
        lastPeriodDate: 'Datum posljednje mjesečnice',
        lastPeriodDateIsReliable: 'Datum posljednje mjesečnice pouzdan',
        deliveryDate: 'Datum poroda',
        numberOfPreviousPregnancies: 'Broj ranijih trudnoća',
        numberOfPreviousBirths: 'Broj poroda',
        hadPEInPreviousPregnancy: 'Preeklampsija u prethodnoj trudnoći',
      },
      validation: {
        dataRequired: 'Podaci o trudnoći su obavezni',
      }
    },
    medicalExamination: {
      property: {
        protocol: 'Protokol',
        bloodTestDate: 'Datum vađenja krvi',
        ultrasoundDate: 'Datum ultrazvuka',
        gestationalAgeByUltrasound: 'Gestacijska dob na ultrazvuku',
        gestationalAgeOnBloodTest: 'Gestacijska dob na dan vađenja krvi',
        note: 'Napomena',
      },
      validation: {
        dataRequired: 'Podaci o pregledu su obavezni',
      },
    },
    measurement: {
      validation: {
        dataRequired: 'Podaci o mjerenjima su obavezni',
        characteristicIdRequired: 'ID karakteristike je obavezan',
        invalidValue: 'Unesena vrijednost je neispravna',
        valueMustBeNumber: 'Vrijednost mora biti numerička',
      }
    },
    report: {
      title: 'Probir za preeklampsiju',
      subtitle: {
        patient: 'Pacijent',
        pregnancy: 'Trudnoća',
        biochemycalMeasurements: 'Biokemijski biljezi i korigirane MoM vrijednosti',
        ultrasoundData: 'UZV podaci',
        risks: 'Rizici na dan vađenja krvi',
        comment: 'Komentar',
      },
    },
    word: {
      yes: 'da',
      no: 'ne',
      unknown: 'nepoznato',
    },
  },

  en: {
    response: {
      defaultError: 'An error occured',
      success: {
        patient: {
          deleted: 'Patient is successfully deleted',
        },
        user: {
          deleted: 'User is successfully deleted',
        }
      },
      notFound: {
        patient: 'Patient not found',
        pregnancy: 'Pregnancy data not found',
        medicalExamination: 'Medical examination data not found',
        user: 'User not found',
      },
      error: {
        patient: {
          create: 'Could not create new patient',
          update: 'Could not update patient',
          delete: 'Could not delete patient',
        },
        user: {
          create: 'Could not create new user',
          update: 'Could not update user',
          updatePassword: 'Could not update user password',
          delete: 'Could not delete user',
        },
        pregnancy: {
          create: 'Could not create new pregnancy',
          update: 'Could not update pregnancy',
        },
        medicalExamination: {
          create: 'Could not create new medical examination',
          update: 'Could not update medical examination',
        },
        measurements: {
          update: 'Could not update measurements',
        },
      }
    },
    user: {
      validation: {
        dataRequired: 'User data is required',
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required',
        roleRequired: 'Role is required',
        roleNotExist: 'Role does not exist',
        emailRequired: 'Email is required',
        emailInvalid: 'Email is invalid',
        userWithEmailExist: 'User with this email already exists',
        passwordRequired: 'Password is required',
        minPasswordLength: (length) => `Minimum password length is ${length} characters`,
        repeatedPasswordRequired: 'Repeated password is required',
        passwordsNotMatch: 'Passwords do not match',
      },
    },
    patient: {
      validation: {
        dataRequired: 'Patient data is required',
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required',
        birthDateRequired: 'Birth date is required',
        racialOriginRequired: 'Racial origin is required',
        racialOriginNotExist: 'Racial origin does not exist',
        MBORequired: 'MBO is required',
        patientWithMBOExist: 'Patient with this MBO already exists',
      },
    },
    pregnancy: {
      property: {
        lastPeriodDate: 'Last period date',
        lastPeriodDateIsReliable: 'Last period date is reliable',
        deliveryDate: 'Delivery date',
        numberOfPreviousPregnancies: 'Number of previous pregnancies',
        numberOfPreviousBirths: 'Number of previous births',
        hadPEInPreviousPregnancy: 'PE in previous pregnancy',
      },
      validation: {
        dataRequired: 'Pregnancy data is required',
      }
    },
    medicalExamination: {
      property: {
        protocol: 'Protocol',
        bloodTestDate: 'Blood test date',
        ultrasoundDate: 'Ultrasound date',
        gestationalAgeByUltrasound: 'Gestational age by ultrasound',
        gestationalAgeOnBloodTest: 'Gestational age on blood test',
        note: 'Note',
      },
      validation: {
        dataRequired: 'Medical examination data is required',
      },
    },
    measurement: {
      validation: {
        dataRequired: 'Measurement data is required',
        characteristicIdRequired: 'Characteristic ID is required',
        invalidValue: 'Value is invalid',
        valueMustBeNumber: 'Value must be a number',
      }
    },
    report: {
      title: 'Preeclampsia Screening Results',
      subtitle: {
        patient: 'Patient',
        pregnancy: 'Pregnancy',
        biochemycalMeasurements: 'Biochemycal measurements',
        ultrasoundData: 'Ultrasound data',
        risks: 'Risks on the blood test date',
        comment: 'Comment',
      },
    },
    word: {
      yes: 'yes',
      no: 'no',
      unknown: 'unknown',
    },
  },
};

module.exports = {
  translations
};