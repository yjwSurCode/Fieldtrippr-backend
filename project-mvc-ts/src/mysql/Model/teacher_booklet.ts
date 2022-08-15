import { db, DataTypes } from '../index';

//定义模型
const Teacher_booklet = db.sequelizeRoot.define(
    'teacher_booklet',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, //设置主键
            autoIncrement: true, //设置自动增长
            comment: '自增id', //添加描述
        },
        sl_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'id',
        },
        questions: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '问题',
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '答案',
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '图片',
        },
        video: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '音视频',
        },
        release_time: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '发布时间',
        },
    },
    {
        // 其他模型参数
        timestamps: false,
        freezeTableName: true,
    },
);

//模型同步，迁移模型映射到数据库
Teacher_booklet.sync({
    force: false, //将创建表,如果表已经存在,则将其首先删除
});

export default Teacher_booklet;
