export const ValidateProps = {
  user: {
    username: { type: 'string', minLength: 4, maxLength: 20 },
    name: { type: 'string', minLength: 1, maxLength: 50 },
    password: { type: 'string', minLength: 8 },
    email: { type: 'string', minLength: 1 },
    bio: { type: 'string', minLength: 0, maxLength: 160 },
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  comment: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
  },
  relation: {
    enta: { type: 'string', minLength: 1, maxLength: 280 },
    entb: { type: 'string', minLength: 1, maxLength: 280 },
    titulo: { type: 'string', minLength: 1, maxLength: 280 },
    tipo: { type: 'string', minLength: 1, maxLength: 280 },
    nota: { type: 'string', minLength: 1, maxLength: 280 },
  },
  voto: {
    voto: { type: 'string', minLength: 1, maxLength: 280 },
    idRelation: { type: 'string', minLength: 1, maxLength: 280 },
  },
};
