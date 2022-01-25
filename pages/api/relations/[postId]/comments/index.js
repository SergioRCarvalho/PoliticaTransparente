import { ValidateProps } from '@/api-lib/constants';
import { findPostById } from '@/api-lib/db';
import { findComments, insertComment } from '@/api-lib/db/comment';
import { auths, database, validateBody } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(database);

handler.get(async (req, res) => {
  const comments = await findComments(
    req.db,
    req.query.postId,
    req.query.before ? new Date(req.query.before) : undefined,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  return res.json({ comments });
});

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      content: ValidateProps.comment.content,
    },
    required: ['content'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const content = req.body.content;

    const comment = await insertComment(req.db, req.query.postId, {
      creatorId: req.user._id,
      content,
    });

    return res.json({ comment });
  }
);

export default handler;
