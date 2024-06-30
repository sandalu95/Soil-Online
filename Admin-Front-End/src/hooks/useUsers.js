import { useQuery, useMutation, gql } from "@apollo/client";
import client from "../apollo/client"; // Import the Apollo Client

const GET_USERS = gql`
  query GetUsers {
    users {
      email
      username
      isBlocked
      joinDate
      mobile
    }
  }
`;

const BLOCK_USER = gql`
  mutation BlockUser($email: String!) {
    blockUser(email: $email) {
      email
      isBlocked
    }
  }
`;

const UNBLOCK_USER = gql`
  mutation UnblockUser($email: String!) {
    unblockUser(email: $email) {
      email
      isBlocked
    }
  }
`;

const useUsers = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS, { client });
  const [blockUser] = useMutation(BLOCK_USER, {
    client,
    onCompleted: () => refetch(),
  });
  const [unblockUser] = useMutation(UNBLOCK_USER, {
    client,
    onCompleted: () => refetch(),
  });

  const handleBlockUser = (email) => {
    blockUser({ variables: { email } });
  };

  const handleUnblockUser = (email) => {
    unblockUser({ variables: { email } });
  };

  return {
    loading,
    error,
    users: data ? data.users : [],
    blockUser: handleBlockUser,
    unblockUser: handleUnblockUser,
    refetch,
  };
};

export default useUsers;
