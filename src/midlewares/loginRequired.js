import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Não autorizado, login é necessário!',
      data: {
        code: 11003,
      },
    });
  }

  try {
    const dados = jwt.verify(authorization, process.env.JWT_SECRET);
    const { id, email } = dados;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    return res.status(401).json(
      {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Token expirado ou inválido!',
        data: {
          code: 11003,
        },
      },
    );
  }
};
