import React from 'react';
import { MessageCircle, ThumbsUp, Reply, MoreVertical } from 'lucide-react';
import styled from 'styled-components';

// Mock comment data structure
const commentsData = [
  {
    id: 1,
    author: 'Sarah Chen',
    content:
      'This new update is amazing! The performance improvements are really noticeable.',
    timestamp: '2 hours ago',
    likes: 45,
    replies: [
      {
        id: 11,
        author: 'James Wilson',
        content:
          'Totally agree! The loading speed is at least twice as fast now.',
        timestamp: '1 hour ago',
        likes: 12,
        replies: [
          {
            id: 111,
            author: 'Sarah Chen',
            content:
              'Yes, especially on mobile devices. Have you tried the new features yet?',
            timestamp: '45 minutes ago',
            likes: 8,
          },
        ],
      },
      {
        id: 12,
        author: 'Elena Rodriguez',
        content: 'I noticed that too! The UI feels much more responsive.',
        timestamp: '30 minutes ago',
        likes: 15,
      },
    ],
  },
  {
    id: 2,
    author: 'Mike Johnson',
    content:
      "Could someone help me with the installation process? I'm getting an error on step 3.",
    timestamp: '3 hours ago',
    likes: 23,
    replies: [
      {
        id: 21,
        author: 'Tech Support Alex',
        content:
          "Hi Mike! Could you share the exact error message you're seeing? That would help us diagnose the issue.",
        timestamp: '2 hours ago',
        likes: 18,
      },
    ],
  },
];
// Styled Components
const CommentContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 8px;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentBox = styled.div`
  background-color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  margin-left: ${({ depth }: { depth: number }) =>
    depth * 20}px; /* Indent based on depth */
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Author = styled.div`
  font-weight: 500;
`;

const Timestamp = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

const CommentText = styled.p`
  color: #374151;
  margin-bottom: 12px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #6b7280;

  button {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    &:hover {
      color: #3b82f6; /* Blue color on hover */
    }
  }
`;

const CommentSectionContainer = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 24px;
  space-y: 24px;
`;

const DiscussionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const DiscussionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
`;

const CommentSection = () => {
  return (
    <CommentSectionContainer>
      <DiscussionHeader>
        <DiscussionTitle>Discussion</DiscussionTitle>
        <CommentCount>
          <MessageCircle size={20} />
          <span>{commentsData.length} Comments</span>
        </CommentCount>
      </DiscussionHeader>

      <div>
        {commentsData.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </CommentSectionContainer>
  );
};

const Comment = ({ comment, depth = 0 }) => {
  return (
    <CommentContainer>
      <CommentContent>
        <CommentBox depth={depth}>
          {' '}
          {/* Pass depth to CommentBox */}
          <CommentHeader>
            <Author>{comment.author}</Author>
            <Timestamp>{comment.timestamp}</Timestamp>
          </CommentHeader>
          <CommentText>{comment.content}</CommentText>
          <ActionButtons>
            <button>
              <ThumbsUp size={16} />
              {comment.likes}
            </button>
            <button>
              <Reply size={16} />
              Reply
            </button>
            <button>
              <MoreVertical size={16} />
            </button>
          </ActionButtons>
        </CommentBox>

        {comment.replies?.map(reply => (
          <Comment key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </CommentContent>
    </CommentContainer>
  );
};

export default CommentSection;
