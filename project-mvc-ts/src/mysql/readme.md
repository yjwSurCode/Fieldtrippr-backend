# 数据类型

## 字符串

DataTypes.STRING // VARCHAR(255)，默认长度 255
DataTypes.STRING(1234) // VARCHAR(1234)，指定长度的字符串
DataTypes.STRING.BINARY // VARCHAR BINARY
DataTypes.TEXT // TEXT，文本字符串
DataTypes.TEXT('tiny') // TINYTEXT，小文本字符串

## 布尔

DataTypes.BOOLEAN // TINYINT(1)，小 int 类型，长度为 1（0，1）

## 数字

DataTypes.INTEGER // INTEGER，int 类型
DataTypes.BIGINT // BIGINT，更大的 int 类型
DataTypes.BIGINT(11) // BIGINT(11)，指定长度的 BIGINT
DataTypes.FLOAT // FLOAT，浮点类型
DataTypes.FLOAT(11) // FLOAT(11)，指定长度的浮点类型
DataTypes.FLOAT(11, 10) // FLOAT(11,10)，指定长度和小数点后的位数
DataTypes.DOUBLE // DOUBLE
DataTypes.DOUBLE(11) // DOUBLE(11)
DataTypes.DOUBLE(11, 10) // DOUBLE(11,10)
DataTypes.DECIMAL // DECIMAL，更准确的小数点类型
DataTypes.DECIMAL(10, 2) // DECIMAL(10,2)，指定长度和小数点后的位数

## 日期

DataTypes.DATE // DATETIME 适用于 mysql / sqlite, 带时区的 TIMESTAMP 适用于 postgres
DataTypes.DATE(6) // DATETIME(6) 适用于 mysql 5.6.4+. 支持 6 位精度的小数秒
DataTypes.DATEONLY // 不带时间的 DATE，仅日期部分

## 枚举

DataTypes.ENUM('value 1','value 2','value 3') //枚举类型，从 value 1、value 2、value 3 中取

## JSON

DataTypes.JSON //适用于 mysql 5.7.8+ ，JSON 类型

## 删除表

删除与模型相关的表：
await Books.drop();
console.log("用户表已删除!");

## 删除所有表：

await sequelize.drop();
console.log("所有表已删除!");

## sequelize.QueryTypes

SELECT: 'SELECT',
INSERT: 'INSERT',
UPDATE: 'UPDATE',
BULKUPDATE: 'BULKUPDATE',
BULKDELETE: 'BULKDELETE',
DELETE: 'DELETE',
UPSERT: 'UPSERT',
VERSION: 'VERSION',
SHOWTABLES: 'SHOWTABLES',
SHOWINDEXES: 'SHOWINDEXES',
DESCRIBE: 'DESCRIBE',
RAW: 'RAW',
FOREIGNKEYS: 'FOREIGNKEYS',
SHOWCONSTRAINTS: 'SHOWCONSTRAINTS'
