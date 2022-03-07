'use strict';

const users = (sequelize, DataTypes) => sequelize.define('users',{

userName: {
type: DataTypes.STRING ,
allowNull : false,
unique : true

},

passWord: {

    type: DataTypes.STRING ,
    allowNull : false,
}


})

module.exports = users