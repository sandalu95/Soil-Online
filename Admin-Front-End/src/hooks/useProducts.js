import { useQuery, useMutation, gql } from "@apollo/client";
import client from "../apollo/client"; // Import the Apollo Client

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      discount
      stock
      description
      onSale
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $price: Float!
    $discount: Float
    $stock: Int!
    $description: String
    $onSale: Boolean
  ) {
    addProduct(
      name: $name
      price: $price
      discount: $discount
      stock: $stock
      description: $description
      onSale: $onSale
    ) {
      id
      name
      price
      discount
      stock
      description
      onSale
    }
  }
`;

const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $id: ID!
    $name: String
    $price: Float
    $discount: Float
    $stock: Int
    $description: String
    $onSale: Boolean
  ) {
    editProduct(
      id: $id
      name: $name
      price: $price
      discount: $discount
      stock: $stock
      description: $description
      onSale: $onSale
    ) {
      id
      name
      price
      discount
      stock
      description
      onSale
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

const useProducts = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, { client });
  const [addProduct] = useMutation(ADD_PRODUCT, {
    client,
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
  const [editProduct] = useMutation(EDIT_PRODUCT, { client });
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    client,
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const handleAddProduct = (
    name,
    price,
    discount,
    stock,
    description,
    onSale
  ) => {
    addProduct({
      variables: { name, price, discount, stock, description, onSale },
    });
  };

  const handleEditProduct = (
    id,
    name,
    price,
    discount,
    stock,
    description,
    onSale
  ) => {
    editProduct({
      variables: {
        id,
        name,
        price: parseFloat(price),
        discount: parseFloat(discount),
        stock: parseInt(stock),
        description,
        onSale,
      },
    });
  };

  const handleDeleteProduct = (id) => {
    deleteProduct({ variables: { id } });
  };

  return {
    loading,
    error,
    products: data ? data.products : [],
    addProduct: handleAddProduct,
    editProduct: handleEditProduct,
    deleteProduct: handleDeleteProduct,
  };
};

export default useProducts;
