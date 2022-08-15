import { db, DataTypes } from '../index';

//定义模型
const Student__teacher_profile = db.sequelizeRoot.define(
    'student_teacher_profile' /* 自定义表名 */,
    {
        // 定义表中的字段，对象中的属性
        id: {
            type: DataTypes.INTEGER, //定义数据类型
            primaryKey: true, //设置主键
            autoIncrement: true, //设置自动增长
            comment: '自增id', //添加描述
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false, //是否允许为空，默认为true
        },
    },
    {
        // 其他模型参数
        timestamps: false, //禁用时间戳，去掉createdAt和updatedAt字段，默认为true
        freezeTableName: true, //表名冻结，Model对应的表名将与定义的'books'相同，默认为true
    },
);

//模型同步，迁移模型映射到数据库
Student__teacher_profile.sync({
    force: false, //将创建表,如果表已经存在,则将其首先删除
});

export default Student__teacher_profile;
