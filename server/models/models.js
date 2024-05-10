const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define(
    'user',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        lastName:{type: DataTypes.STRING},
        firstName:{type: DataTypes.STRING},
        login:{type: DataTypes.STRING, unique: true},
        email:{type: DataTypes.STRING, unique: true},
        password:{type: DataTypes.STRING},
        role:{type: DataTypes.STRING, defaultValue: 'USER'},
    }
)

const Basket = sequelize.define(
    'basket',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}
    }
)

const BasketDevice = sequelize.define(
    'basket_device',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    }
)

const Device = sequelize.define(
    'device',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name:{type: DataTypes.STRING, allowNull: false},
        image:{type: DataTypes.STRING},
        raiting:{type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
        price:{type: DataTypes.INTEGER, allowNull: false},
    }
)

const Type = sequelize.define(
    'type',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name:{type: DataTypes.STRING, unique: true, allowNull: false},
    }
)

const Brand = sequelize.define(
    'brand',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name:{type: DataTypes.STRING, unique: true, allowNull: false},
    }
)

const Raiting = sequelize.define(
    'raiting',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        rate:{type: DataTypes.INTEGER, allowNull: false}
    }
)

const DeviceInfo = sequelize.define(
    'device_info',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        title:{type: DataTypes.STRING, allowNull: false},
        description:{type: DataTypes.STRING, allowNull: false},
    }
)

const TypeBrand = sequelize.define(
    'type_brand',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}
    }
)

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Raiting);
Raiting.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Raiting);
Raiting.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand,{through: TypeBrand});
Brand.belongsToMany(Type,{through: TypeBrand});

module.exports = {
    User,
    Basket,
    Device,
    Brand,
    Type,
    TypeBrand,
    DeviceInfo,
    BasketDevice,
    Raiting,
}