import User from '../models/User';
import validateErrors from '../utils/validationErrors';

class UserController {
  // Lista todos os usuários
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.status(200).json(users);
    } catch (e) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Not Found',
        message: 'Não foi possível concluir',
        data: {
          code: 11003,
        },
      });
    }
  }

  // Lista um usuário por id
  async show(req, res) {
    try {
      const { id } = req.params;
      const users = await User.findByPk(id);
      return res.status(200).send(users);
    } catch (e) {
      return res.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Parametros inválidos',
        data: {
          code: 11003,
        },
      });
    }
  }

  // Cria o usuário
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.status(201).json(newUser);
    } catch (e) {
      const errors = e.errors.map((err) => err.message);
      return res.status(400).json(validateErrors(errors));
    }
  }

  // atualiza o usuário por id
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Paramentros inválidos',
          data: {
            code: 11003,
          },
        });
      }

      const user = await User.findByPk(id);

      if (!id) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Paramentros inválidos',
          data: {
            code: 11003,
          },
        });
      }

      const userUpdated = await user.update(req.body);

      return res.status(200).send(userUpdated);
    } catch (e) {
      const errors = e.errors.map((err) => err.message);
      return res.status(400).json(validateErrors(errors));
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Paramentros inválidos',
          data: {
            code: 11003,
          },
        });
      }

      const user = await User.findByPk(id);

      if (!id) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Paramentros inválidos',
          data: {
            code: 11003,
          },
        });
      }

      await user.destroy();
      return res.status(204).send();
    } catch (e) {
      return res.status(406).json({
        statusCode: 406,
        error: 'Not Acceptable',
        message: 'Não foi possível concluir',
        data: {
          code: 11003,
        },
      });
    }
  }
}

export default new UserController();
