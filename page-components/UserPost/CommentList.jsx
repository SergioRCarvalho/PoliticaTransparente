import { Button } from '@/components/Button';
import { Comment } from '@/components/Comment';
import { Container, Spacer } from '@/components/Layout';
import { Text } from '@/components/Text';
import { useCommentPages } from '@/lib/comment';
import styles from './CommentList.module.css';

const CommentList = ({ post }) => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = useCommentPages(
    { postId: post._id }
  );

  const comments = data
    ? data.reduce((acc, val) => [...acc, ...val.comments], [])
    : [];

  return (
    <div className={styles.root}>
      <Spacer axis="vertical" size={1} />
      {comments.map((comment) => (
        <div key={comment._id} className={styles.wrap}>
          <Comment className={styles.comment} comment={comment} />
        </div>
      ))}
      <Container justifyContent="center">
        {isReachingEnd ? (
          <Text color="secondary">Não foram encontrados mais comentários.</Text>
        ) : (
          <Button
            variant="ghost"
            type="success"
            loading={isLoadingMore}
            onClick={() => setSize(size + 1)}
          >
            Carregar mais
          </Button>
        )}
      </Container>
    </div>
  );
};

export default CommentList;
