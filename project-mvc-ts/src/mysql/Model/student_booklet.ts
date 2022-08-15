import { db, DataTypes } from '../index';

//定义模型
const Student_booklet = db.sequelizeRoot.define(
    'student_booklet',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, //设置主键
            autoIncrement: true, //设置自动增长
            comment: '自增id', //添加描述
        },
        sl_id: {
            type: DataTypes.INTEGER,
            allowNull: false, //是否允许为空，默认为true
            comment: 'id',
        },
        questions: {
            type: DataTypes.STRING,
            allowNull: false, //是否允许为空，默认为true
            comment: '问题',
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false, //是否允许为空，默认为true
            comment: '答案',
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false, //是否允许为空，默认为true
            comment: '图片',
        },
        video: {
            type: DataTypes.STRING,
            allowNull: false, //是否允许为空，默认为true
            comment: '音视频',
        },
        submission_time: {
            type: DataTypes.DATE,
            allowNull: false, //是否允许为空，默认为true
            comment: '提交时间',
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false, //是否允许为空，默认为true
            comment: 'mark status: 1. yes, 2. no ',
        },
        teacher_feedback: {
            type: DataTypes.STRING,
            allowNull: false, //是否允许为空，默认为true
            comment: '老师的反馈',
        },
        submission_received_page: {
            type: DataTypes.STRING,
            allowNull: false, //是否允许为空，默认为true
            comment: '提交_已收到页数',
        },
    },
    {
        // 其他模型参数
        timestamps: false, //禁用时间戳，去掉createdAt和updatedAt字段，默认为true
        freezeTableName: true, //表名冻结，Model对应的表名将与定义的'books'相同，默认为true
    },
);

//模型同步，迁移模型映射到数据库
Student_booklet.sync({
    force: false, //将创建表,如果表已经存在,则将其首先删除
});

export default Student_booklet;
