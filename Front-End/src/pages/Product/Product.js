import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getProducts } from "../../data/products";
import { getReviews } from "../../data/reviews";
import Review from "../../components/Review";
import { getLoggedInUser } from "../../data/repository";
import ReviewSummary from "../../components/ReviewSummary";
import AddReviewForm from "../../components/AddReviewForm";
import DiscountDisplay from "../../components/PriceTag";
import { useCart } from "../../hooks/useCart";
import Star from "../../components/Star";
import "./product.css";

const Product = () => {
  // Get the route parameter (product-name)
  const { "product-name": productName } = useParams();
  const loggedInUser = getLoggedInUser();
  const [product, setProduct] = useState();
  const [allReviews, setAllReviews] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [enoughStorage, setEnoughStorage] = useState(true);
  const { cartItems, addToCart } = useCart();
  const [cartItemAmount, setCartItemAmount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    async function loadData() {
      const allProducts = await getProducts();
      const currentProduct = allProducts?.find(
        (product) =>
          product.name.toLowerCase().split(/\s+/).join("-") === productName
      );
      setProduct(currentProduct);
      const cartAmount =
        cartItems?.find((item) => item.productId === currentProduct.id)
          ?.quantity || 0;
      setCartItemAmount(cartAmount);
      setEnoughStorage(currentProduct.stock - productQuantity > 0);

      const reviews = await getReviews(currentProduct?.id);
      setAllReviews(reviews);
      setAverageRating(
        parseFloat(
          (
            reviews.reduce((sum, review) => sum + review.stars, 0) /
            reviews.length
          ).toFixed(2)
        )
      );
    }
    loadData();
  }, [productName]);

  useEffect(() => {
    const cartAmount =
      cartItems?.find((item) => item.productId === product?.id)?.quantity || 0;
    setCartItemAmount(cartAmount);
    setEnoughStorage(product?.stock - (cartItemAmount + productQuantity) > 0);
  }, [cartItems]);

  useEffect(() => {
    async function loadData() {
      if (product) {
        const reviews = await getReviews(product.id);
        setAllReviews(reviews);
        setAverageRating(
          parseFloat(
            (
              reviews.reduce((sum, review) => sum + review.stars, 0) /
              reviews.length
            ).toFixed(2)
          )
        );
        setIsReviewSubmitted(false);
      }
    }
    loadData();
  }, [isReviewSubmitted]);

  const handleReviewSubmit = (isSubmitted) => {
    setIsReviewSubmitted(isSubmitted);
  };

  const handleReviewUpdate = async () => {
    if (product) {
      const reviews = await getReviews(product.id);
      setAllReviews(reviews);
    }
  };

  const handleReveiwForm = (visibility) => {
    setIsVisible(visibility);
  };

  return (
    <Container>
      <Row>
        <Col className="product-image-container">
          {product && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="product-image"
            />
          )}
        </Col>
        <Col>
          <Row>
            <h2>{product?.name}</h2>
            <div className="product-top-content">
              {allReviews?.length > 0 && (
                <div className="stars">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      filled={Math.min(1, Math.max(0, averageRating - index))}
                    />
                  ))}{" "}
                  <span>
                    {averageRating} ({allReviews?.length})
                  </span>
                </div>
              )}
              <div className="product-price">
                {product && <DiscountDisplay product={product} />}
              </div>
              <div className="mb-3">
                Quantity:
                <input
                  value={productQuantity}
                  type="number"
                  onChange={(e) => {
                    const quantity = e.target.value;
                    setProductQuantity(parseInt(quantity));
                    setEnoughStorage(product?.stock - quantity > 0);
                  }}
                ></input>
                {!enoughStorage && (
                  <p className="text-danger">{"Reached order limit"}</p>
                )}
              </div>
              <div className="mb-5">
                <Button
                  variant="success"
                  onClick={async () => {
                    if (cartItemAmount > 0) {
                      await addToCart(
                        product?.id,
                        cartItemAmount + productQuantity || 1
                      );
                    } else if (productQuantity > 1) {
                      await addToCart(product?.id, 1);
                      await addToCart(product?.id, productQuantity || 1);
                    } else {
                      await addToCart(product?.id, 1);
                    }
                  }}
                  className="add-to-cart-btn"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </Row>
          <Row>
            <h4>Description</h4>
            <p>{product?.description}</p>
          </Row>
        </Col>
      </Row>
      <Row className="my-5">
        <h2>Customer Reviews</h2>
        {allReviews.length > 0 ? (
          <div>
            <Row>
              <ReviewSummary
                reviews={allReviews}
                handleForm={handleReveiwForm}
                buttonEnabled={!isVisible}
              />
            </Row>
            <Row>
              {isVisible && loggedInUser ? (
                <Col>
                  <AddReviewForm
                    formVisible={handleReveiwForm}
                    product={product}
                    loggedInUser={loggedInUser}
                    handleReviewSubmit={handleReviewSubmit}
                  />
                </Col>
              ) : (
                isVisible && (
                  <p className="login-warning mt-1 mb-4 ml-1">
                    Please log in to write a review
                  </p>
                )
              )}
            </Row>
            <Row>
              {allReviews?.map((review) => (
                <div key={review.id}>
                  <Review
                    review={review}
                    loggedInUser={loggedInUser}
                    handleReviewUpdate={handleReviewUpdate}
                  />
                </div>
              ))}
            </Row>
          </div>
        ) : (
          <div className="d-flex">
            <div>
              <p>Be the first to write a review</p>
              <Button
                variant="success"
                className="mb-4"
                onClick={() => setIsVisible(true)}
                disabled={isVisible}
              >
                Write a review
              </Button>
              {isVisible && !loggedInUser && (
                <p className="login-warning mb-4">
                  Please log in to write a review
                </p>
              )}
            </div>
            {isVisible && loggedInUser && (
              <Col>
                <AddReviewForm
                  formVisible={handleReveiwForm}
                  product={product}
                  loggedInUser={loggedInUser}
                  handleReviewSubmit={handleReviewSubmit}
                />
              </Col>
            )}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Product;
