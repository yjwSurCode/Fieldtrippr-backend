import { db, DataTypes } from '../index';

//定义模型
const Fieldtrippr_class = db.sequelizeRoot.define(
    'fieldtrippr_class',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, //设置主键
            autoIncrement: true, //设置自动增长
            comment: '自增id', //添加描述
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '班级名称',
        },
    },
    {
        // 其他模型参数
        timestamps: false,
        freezeTableName: true,
    },
);

//模型同步，迁移模型映射到数据库
Fieldtrippr_class.sync({
    force: false, //将创建表,如果表已经存在,则将其首先删除
});

export default Fieldtrippr_class;
