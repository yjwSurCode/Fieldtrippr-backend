import { Sequelize, DataTypes } from 'sequelize';

const db: { sequelizeRoot?: any } = {};

/*连接数据库   参数：数据库名  用户名  密码  配置 */
const sequelize = new Sequelize('IFB399', 'root', 'your password', {
    host: '106.12.154.161', //主机地址
    dialect: 'mysql', //语言
});

/* 测试连接 */
try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    db.sequelizeRoot = sequelize;
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

import Fuser from './Model/fuser';
import Order from './Model/order';
import Books from './Model/books';

import Student_teacher_profile from './Model/student_teacher_profile';
import Fieldtrippr_class from './Model/fieldtrippr_class';
import Student_booklet from './Model/student_booklet';
import Student_bookshelf from './Model/student_bookshelf';
import Subjects from './Model/subjects';
import Teacher_booklet from './Model/teacher_booklet';
import Teacher_bookshelf from './Model/teacher_bookshelf';

export {
    db,
    DataTypes,
    Order,
    Books,
    Fuser,
    Student_teacher_profile,
    Fieldtrippr_class,
    Student_booklet,
    Student_bookshelf,
    Subjects,
    Teacher_booklet,
    Teacher_bookshelf,
};
