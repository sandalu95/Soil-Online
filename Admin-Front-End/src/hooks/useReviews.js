import { useQuery, useMutation, gql } from "@apollo/client";
import client from "../apollo/client"; // Import the Apollo Client

const GET_FLAGGED_REVIEWS = gql`
  query GetFlaggedReviews {
    flaggedReviews {
      id
      content
      date
      stars
      user {
        username
        email
      }
      product {
        name
      }
      isFlagged
      isAdminDeleted
    }
  }
`;

const SET_ADMIN_DELETED = gql`
  mutation SetAdminDeleted($id: ID!) {
    setAdminDeleted(id: $id)
  }
`;

const SET_FLAGGED = gql`
  mutation SetFlagged($id: ID!) {
    setFlagged(id: $id)
  }
`;

const useReviews = () => {
  const { loading, error, data, refetch } = useQuery(GET_FLAGGED_REVIEWS, { client });
  const [setAdminDeleted] = useMutation(SET_ADMIN_DELETED, { client });
  const [setFlagged] = useMutation(SET_FLAGGED, { client });

  const handleDeleteReview = async (id) => {
    await setAdminDeleted({ variables: { id } });
    refetch();
  };

  const handleApproveReview = async (id) => {
    await setFlagged({ variables: { id } });
    refetch();
  };

  return {
    loading,
    error,
    reviews: data ? data.flaggedReviews : [],
    deleteReview: handleDeleteReview,
    approveReview: handleApproveReview,
    refetch,
  };
};

export default useReviews;
