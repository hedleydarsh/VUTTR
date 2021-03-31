import Tool from '../models/Tool';
import validateErrors from '../utils/validationErrors';

class ToolController {
  constructor() {
    this.index = this.index.bind(this);
  }

  // Lista todos as ferramentas
  async index(req, res) {
    const { tag } = req.query;

    try {
      const tools = await Tool.findAll(
        {
          attributes: ['id', 'title', 'link',
            'description', 'tags'],
        },
      );
      console.log(tag);
      if (tag) {
        return res.status(200).send(this.getByTag(tag.toLowerCase(), tools));
      }
      return res.status(200).json(tools);
    } catch (e) {
      return res.status(404).json({
        statusCode: 404,
        error: 'Not Found',
        message: 'Não foi possível concluir!',
        data: {
          code: 11003,
        },
      });
    }
  }

  // Lista uma ferramenta por id
  async show(req, res) {
    try {
      const { id } = req.params;
      const tool = await Tool.findByPk(id);
      return res.status(200).send(tool);
    } catch (e) {
      return res.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Paramentros inválidos',
        data: {
          code: 11003,
        },
      });
    }
  }

  // Cria uma ferramenta
  async store(req, res) {
    try {
      const newtools = await Tool.create(req.body);
      return res.status(201).json(newtools);
    } catch (e) {
      const errors = e.errors.map((err) => err.message);
      return res.status(400).json(validateErrors(errors));
    }
  }

  // atualiza uma ferramenta por id
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Parametros inválidos',
          data: {
            code: 11003,
          },
        });
      }

      const tool = await Tool.findByPk(id);

      if (!tool) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Parametros inválidos',
          data: {
            code: 11003,
          },
        });
      }

      const values = { ...req.body };
      const condition = { where: { id } };
      const options = { multi: true };

      await Tool.update(values, condition, options);
      const toolsUpdated = await Tool.findByPk(id);

      return res.status(200).send(toolsUpdated);
    } catch (e) {
      const errors = e.errors.map((err) => err.message);
      return res.status(400).json(validateErrors(errors));
    }
  }

  // deleta uma ferramenta por id
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

      const tool = await Tool.findByPk(id);

      if (!tool) {
        return res.status(400).json({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Paramentros inválidos',
          data: {
            code: 11003,
          },
        });
      }

      await tool.destroy();
      return res.status(204).send({});
    } catch (e) {
      return res.status(406).json({
        statusCode: 406,
        error: 'Not aceptable',
        message: 'Não foi possível concluir',
        data: {
          code: 11003,
        },
      });
    }
  }

  getByTag(tag, tools) {
    tag = tag.replace(/['"]+/g, '');
    return tools.filter((item) => item.tags.indexOf(tag) > -1);
  }
}

export default new ToolController();
