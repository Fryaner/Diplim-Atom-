const {User} = require('../models/models');
const {Role} = require('../models/models');
const {RoleUser} = require('../models/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const ApiError = require('../error/apiError');
const { where } = require('sequelize');

class UserService {
    async registration(lastName, firstName, patronymic, email, phone, login, password) {
        const candidateEmail = await User.findOne({where: {email}});
        const candidateLogin = await User.findOne({where: {login}});
        const candidatePhone = await User.findOne({where: {phone}});
        if (candidateEmail) {
            throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        if (candidateLogin) {
            throw ApiError.badRequest(`Пользователь с таким логином - ${login} уже существует`);
        }
        if (candidatePhone) {
            throw ApiError.badRequest(`Пользователь с таким номером телефона - ${phone} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await User.create({lastName, firstName, patronymic, email, phone, login ,password: hashPassword, activationLink});
        const defaultRole = await Role.findOne({where: {name: "USER"}});
        const userRole = await RoleUser.create({userId: user.id, roleId: defaultRole.id});
        const usersRoles = await RoleUser.findOne({where: {userId: user.id}});
        const role = await Role.findOne({where: {id: usersRoles.roleId}});
        
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
        const tokens = tokenService.generateTokens(
            {
                id: userRole.id,
                email: user.email,
                login: user.login,
                roles: [role.name],
            });
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: {
                email: user.email, 
                lastName: user.lastName, 
                firstName: user.firstName,
                login: user.login,
                password: user.password,
            }
        }
    }
    async activate(activation) {
        const user = await User.findOne({where: {activationLink: activation}});
        if (!user) {
            throw ApiError.badRequest('Неккоретная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, login, password) {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw ApiError.badRequest('Пользователь не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.badRequest('Некорректный пароль');
        }
        const usersRoles = await RoleUser.findAll({where: {userId: user.id}});

        const roles = await Promise.all(usersRoles.map(async (roleUser) => {
            const role = await Role.findOne({ where: { id: roleUser.roleId } });
            return role.name;
          }));
        
        const tokens = tokenService.generateTokens(
            {
                id: user.id,
                email: user.email,
                roles: roles,
            });

        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: {
                email: user.email, 
                lastName: user.lastName, 
                firstName: user.firstName,
                login: user.login,
                password: user.password,
            }
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.unauthorizedError();
        }
        const user = await User.findOne({where: {id: userData.id}});
        const usersRoles = await RoleUser.findOne({where: {userId: user.id}});
        const role = await Role.findOne({where: {id: usersRoles.roleId}});
        const tokens = tokenService.generateTokens(
            {
                id: user.id,
                email: user.email,
                login: user.login,
                roles: [role.name],
            });

        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: {
                email: user.email, 
                lastName: user.lastName, 
                firstName: user.firstName,
                login: user.login,
                password: user.password,
            }
        }

    }

    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }

    async addRole(userId, roleId) {
        const roles = await Role.findAll();
        const rolesId =  await Promise.all(roles.map(async (roles) => {
            return roles.id;
        }))

        if (!rolesId.includes(roleId)) {
            throw new Error('Роль не существует');
          }
        
          const existingUser = await RoleUser.findOne({
            where: { userId }
          });
        
          if (!existingUser) {
            throw new Error('Пользователь не существует');
          }

          const existingRole = await RoleUser.findOne({
            where: {roleId }
          });
        
          if (existingRole) {
            throw new Error('У пользователя уже есть эта роль');
          }

          const newRole = await RoleUser.create({userId, roleId});
          return newRole;
    }

    
    async removeRole(userId, roleId, currentRoleId) {
        const newRole = await RoleUser.destroy({where: {userId, roleId}});
        return newRole;
    }

    async getAllRole() {
        const roles = await Role.findAll();
        return roles;
    }
}

module.exports = new UserService();