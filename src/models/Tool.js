import Sequelize, { Model } from 'sequelize';

export default class Tool extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo title deve ter entre 3 e 255 caracteres',
            },
          },
        },
        link: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            isUrl: {
              msg: 'Url inválida ou mal formatada',
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'O campo description é obrigatório',
            },
          },
        },
        tags: {
          type: Sequelize.STRING,
          validate: {
            notEmpty: {
              msg: 'O campo tags é obrigatório',
            },
          },
          get() {
            return this.getDataValue('tags').toLowerCase().split(';');
          },
          set(val) {
            this.setDataValue('tags', val.join(';'));
          },
        },
      },
      {
        sequelize,
      },
    );

    return this;
  }
}
