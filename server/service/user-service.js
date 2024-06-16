const {User} = require('../models/models');
const {Role} = require('../models/models');
const {RoleUser} = require('../models/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const ApiError = require('../error/apiError');

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
                id: user.id,
                email: user.email,
                phone: user.phone, 
                lastName: user.lastName, 
                firstName: user.firstName,
                patronymic: user.patronymic,
                login: user.login,
                password: user.password,
                isActivated: user.isActivated,
                createdAt: user.createdAt,
            }
        }
    }

    async delete(id, password) {
        const currentDataUser = await User.findOne({where: {id}});
        const isPassEquals = await bcrypt.compare(password, currentDataUser.password);
        if (!isPassEquals) {
            throw new Error('Вы ввели не верный пароль');
        }
        const deleteUser = await User.destroy({where: {id}});
        return deleteUser;
    }

    async activate(activation) {
        const user = await User.findOne({where: {activationLink: activation}});
        if (!user) {
            throw ApiError.badRequest('Неккоретная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, login, phone, password) {

        const checks = [
            { name: 'email', value: email },
            { name: 'login', value: login },
            { name: 'phone', value: phone }
        ];
    
        let user;
    
        for (const check of checks) {
            user = await User.findOne({ where: { [check.name]: check.value } });
            if (user) {
                break; 
            }
        }
    
        if (!user) {
            throw ApiError.badRequest('Пользователь не найден');
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
                id: user.id,
                email: user.email,
                phone: user.phone, 
                lastName: user.lastName, 
                firstName: user.firstName,
                patronymic: user.patronymic,
                login: user.login,
                password: user.password,
                isActivated: user.isActivated,
                createdAt: user.createdAt,
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

    async getUser(id) {
        const user = await User.findOne({where: {id}});
        return user;
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

    async edit(id, email, login, phone,  lastName, firstName, patronymic, password, newPassword, isActivated) {
        const currentDataUser = await User.findOne({where: {id}});
        if (email) {
            if (email === currentDataUser.email) {
                throw new Error('Почта уже привязана к данному аккаунту');
            }
            const isEmail = await User.findOne({where: {email}});
            if (isEmail) {
                throw new Error('Почта уже привязана в какому-то аккаунту');
            }
            const activationLink = uuid.v4();
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
            const editUserEmail = await User.update({email, isActivated, activationLink},{where: {id}});
        }
        if (phone) {
            if (phone === currentDataUser.phone) {
                throw new Error('Телефон уже привязан к данному аккаунту');
            }
            const isPhone = await User.findOne({where: {phone}});
            if (isPhone) {
                throw new Error('Телефон уже привязан в какому-то аккаунту');
            }
        }
        if (login) {
            if (login === currentDataUser.login) {
                throw new Error('Логин уже привязан к данному аккаунту');
            }
            const isLogin = await User.findOne({where: {login}});
            if (isLogin) {
                throw new Error('Логин уже привязан к какому-то аккаунту');
            }
        }
        if (newPassword) {
            const isPassEquals = await bcrypt.compare(password, currentDataUser.password);
            if (password === newPassword && isPassEquals) {
                throw new Error('У вас уже имеется данный пароль');
            }
            if (!isPassEquals) {
                throw new Error('Вы ввели не верный старый пароль');
            }
            const hashPassword = await bcrypt.hash(newPassword, 3);
            const editUserPassword = await User.update({password: hashPassword},{where: {id}});
        }
        const editUser = await User.update({lastName, firstName, patronymic, phone, login},{where: {id}});
        const EditCurrentDataUser = await User.findOne({where: {id}});
        return EditCurrentDataUser;
    }

}

module.exports = new UserService();