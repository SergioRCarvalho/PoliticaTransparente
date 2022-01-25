import { ValidateProps } from '@/api-lib/constants';
import {
  findUserByEmail,
  findUsers,
  findUserByUsername,
  insertUser,
} from '@/api-lib/db';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import { slugUsername } from '@/lib/user';
import nc from 'next-connect';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { createwallet } from './createwallet';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const user = await findUsers(req.db);
  res.json({ user });
});

handler.post(
  validateBody({
    type: 'object',
    properties: {
      username: ValidateProps.user.username,
      name: ValidateProps.user.name,
      password: ValidateProps.user.password,
      email: ValidateProps.user.email,
    },
    required: ['username', 'name', 'password', 'email'],
    additionalProperties: false,
  }),
  ...auths,
  async (req, res) => {
    let { username, name, email, password } = req.body;
    username = slugUsername(req.body.username);
    email = normalizeEmail(req.body.email);
    if (!isEmail(email)) {
      res
        .status(400)
        .json({ error: { message: 'The email you entered is invalid.' } });
      return;
    }
    if (await findUserByEmail(req.db, email)) {
      res
        .status(403)
        .json({ error: { message: 'The email has already been used.' } });
      return;
    }
    if (await findUserByUsername(req.db, username)) {
      res
        .status(403)
        .json({ error: { message: 'The username has already been taken.' } });
      return;
    }
    let wallet = '';
    await createwallet(req.body.username)
      .then((x) => {
        if (x?.errors?.length > 0) {
          res.status(400).json({ error: { message: x.errors[0].message } });
          return;
        } else if (x?.resu) wallet = x.resu[0].user_id;
        else {
          res
            .status(400)
            .json({ error: { message: 'Try it later or contact support' } });
          return;
        }
      })
      .catch((err) => {
        res.status(400).json({ error: { message: err } });
        return;
      });
    const user = await insertUser(req.db, {
      email,
      originalPassword: password,
      bio: '',
      name,
      username,
      wallet,
    });
    req.logIn(user, (err) => {
      if (err) throw err;
      res.status(201).json({
        user,
      });
    });
  }
);

export default handler;
