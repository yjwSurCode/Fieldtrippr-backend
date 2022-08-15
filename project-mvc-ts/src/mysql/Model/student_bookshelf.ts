import { db, DataTypes } from '../index';

//定义模型
const Student_bookshelf = db.sequelizeRoot.define(
    'student_bookshelf',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, //设置主键
            autoIncrement: true, //设置自动增长
            comment: '自增id', //添加描述
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '状态',
        },
        teacher_feedback: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '反馈',
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    },
);

//模型同步，迁移模型映射到数据库
Student_bookshelf.sync({
    force: false, //将创建表,如果表已经存在,则将其首先删除
});

export default Student_bookshelf;
