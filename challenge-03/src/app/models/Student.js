import Sequelize, { Model } from 'sequelize';
import { differenceInYears, parseISO } from 'date-fns';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        birthday: Sequelize.VIRTUAL,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async student => {
      if (student.birthday) {
        student.age = differenceInYears(new Date(), parseISO(student.birthday));
      }
    });
    return this;
  }
}

export default Student;
