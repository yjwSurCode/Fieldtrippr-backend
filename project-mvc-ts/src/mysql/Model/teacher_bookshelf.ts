import { db, DataTypes } from '../index';

//定义模型
const Teacher_bookshelf = db.sequelizeRoot.define(
    'teacher_bookshelf',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, //设置主键
            autoIncrement: true, //设置自动增长
            comment: '自增id', //添加描述
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false, //是否允许为空，默认为true
            comment: '状态',
        },
        teacher_feedback: {
            type: DataTypes.STRING,
            allowNull: false, //是否允许为空，默认为true
            comment: '反馈',
        },
    },
    {
        // 其他模型参数
        timestamps: false, //禁用时间戳，去掉createdAt和updatedAt字段，默认为true
        freezeTableName: true, //表名冻结，Model对应的表名将与定义的'books'相同，默认为true
    },
);

//模型同步，迁移模型映射到数据库
Teacher_bookshelf.sync({
    force: false, //将创建表,如果表已经存在,则将其首先删除
});

export default Teacher_bookshelf;
