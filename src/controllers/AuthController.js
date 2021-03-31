import jwt from 'jsonwebtoken';
import User from '../models/User';

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ error: ['Credenciais inválidas'] });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: ['Usuário não encontrado'] });
    }

    if (!await (user.passwordIsValid(password))) {
      res.status(401).json({ error: ['A senha é inválida'] });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.json({ token });
  }
}

export default new AuthController();
