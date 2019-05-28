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
        trimester: 'Podaci o tromjesečju nisu pronađeni',
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
        }
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
        trimester: 'Trimester data not found',
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
  },
};

module.exports = {
  translations
};