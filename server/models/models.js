const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define(
    'user',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        lastName:{type: DataTypes.STRING},
        firstName:{type: DataTypes.STRING},
        patronymic: {type: DataTypes.STRING},
        login:{type: DataTypes.STRING, unique: true},
        phone: {type: DataTypes.STRING, unique: true},
        email:{type: DataTypes.STRING, unique: true},
        password:{type: DataTypes.STRING},
        isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
        activationLink: {type: DataTypes.STRING}
    }
)

const RoleUser = sequelize.define(
    'role_user',
    {
    id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}
    },
    {
        indexes: [
          {
            unique: true,
            fields: ['userId', 'roleId']
          }
        ]
    }
)

const Role = sequelize.define(
    'role',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING, defaultValue: 'USER'},
    }
)

const Token = sequelize.define(
    'token',
    {
        refreshToken: {type: DataTypes.STRING}
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

const Favorite = sequelize.define(
    'favorite',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true}
    }
)

const FavoriteDevice = sequelize.define(
    'favorite_device',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    }
)

const Device = sequelize.define(
    'device',
    {
        id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        model:{type: DataTypes.STRING, allowNull: false},
        image:{type: DataTypes.STRING},
        rating:{type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
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

User.hasOne(Favorite);
Favorite.belongsTo(User);

User.hasMany(Raiting);
Raiting.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(RoleUser, { onDelete: 'CASCADE' });
RoleUser.belongsTo(User, { onDelete: 'CASCADE' });

Role.hasMany(RoleUser);
RoleUser.belongsTo(Role);

Basket.hasMany(BasketDevice, { onDelete: 'CASCADE' });
BasketDevice.belongsTo(Basket, { onDelete: 'CASCADE' });

Favorite.hasMany(FavoriteDevice, { onDelete: 'CASCADE' });
FavoriteDevice.belongsTo(Favorite,  { onDelete: 'CASCADE' });

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Raiting);
Raiting.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(FavoriteDevice);
FavoriteDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand,{through: TypeBrand});
Brand.belongsToMany(Type,{through: TypeBrand});

module.exports = {
    User,
    Role,
    RoleUser,
    Token,
    Basket,
    Device,
    Brand,
    Type,
    TypeBrand,
    DeviceInfo,
    BasketDevice,
    Raiting,
    Favorite,
    FavoriteDevice
}