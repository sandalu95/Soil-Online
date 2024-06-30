
# Soil Organic Food Web App Project

Welcome to SOIL, the organic online food web app!

This full stack web application is designed to enhance the online experience for customers of SOIL. This README provides an overview of the features, technology stack, and architecture of the new website

### Features

- Data Management: All data is managed/fetched through REST API created by our team in Node + Express layer calls to Cloud MySQL database.

- Secure Authentication: Passwords are hashed using bcryptjs at backend.

- Sign-up includes validation for strong passwords and confirmation.

- Product Display: Clear display of standard and special products.

- Shopping Cart: Users can add and delete multiple products in the cart, checkout with a purchase summary confirmation.

- Reviews: Users can leave, edit, and delete reviews. Replies can be added to reviews, but not to other replies.

- Unit Tests: Comprehensive unit tests for shopping cart and review features.

- Admin dashboard: Enhanced control and oversight functionalities for admin users.

### Technology Stack

#### Front-End

- React
- Axios: For API calls

#### Middle Layer

- Node + Express
- Sequelize/TypeORM

#### Back-End

- Cloud MySQL: Database for storing user data, product information, and other relevant data.

#### Admin Dashboard

- Admin Dashboard Front-End: A separate React application for admin functions.
- Admin Dashboard Backend: The same backend used by the SOIL web application, with added support for GraphQL. The new server supports both REST API and GraphQL.
- Charts: Chat.js
- Styling: Tailwind CSS
- Profanity Filter: Profanity Library (https://github.com/2Toad/Profanity)

## Unit Tests

#### CartItem.js

Four unit tests ensure the shopping cart functionality:

1. Item Display: Verifies correct information display for items.
2. Increase Quantity: Ensures the "+" button increases item quantity.
3. Decrease Quantity: Ensures the "-" button decreases item quantity.
4. Remove Item: Verifies the "remove" button functionality.

#### Review.js

One unit test ensures the review functionality:

1. Render and Display Correct Information for Logged-In User: Verifies that a review renders correctly and displays the appropriate information like edit, delete, and reply buttons properly.

## Admin DashBoard

#### Admin Tasks

Using the dashboard, admin can perform the following tasks:

1. View/Add/Edit/Delete standard products and special products
2. View/Block/Unblock users of the web applications
3. View/Delete/Approve reviews that are flagged as inappropriate
4. Real-Time Moderation - supported by GraphQL subscriptions

#### Dashboard Analytic Widgets

1. **View Total Users and Total Products**
   - Purpose - Provides an overview of the user base and product catalog, helping administrators understand the scope of the application at a glance.
3. **Total Orders Received in the last 5 months distribution**
   - Purpose - Shows trends in orders over time, allowing for analysis of sales patterns and identification of peak periods.
5. **Monthly Revenue Distribution over the last 5 months (Based on orders received)**
   - Purpose - Illustrates revenue trends, enabling financial performance tracking and strategic planning.
7. **Product Purchases distribution of highest ordered products over the last 5 months (Based on orders received)**
   - Purpose - Highlights popular products, helping in inventory and marketing strategies.

#### Widgets Supported by GraphQL Subscription for Real-Time Updates

1. **Total Review Count**
   - Purpose - Provides immediate feedback on the volume of user engagement through reviews.
3. **Five Most Recent Reviews with user, review info, and product info**
   - Purpose - Displays the latest user feedback, aiding in timely moderation and response.
5. **Review Distribution by product (Distribution of 5 highest rated products and other products)**
   - Purpose - Helps identify top-rated products and monitor overall product performance.
7. **Highest Rated Product's Details with its current rating**
   - Purpose - Allows quick identification of standout products.
9. **Least Rated Product's Details with its current rating**
    - Purpose - Helps in identifying products that may need improvement or attention.

## Scenarios where Reviews are Considered Inappropriate

Example review scenarios where reviews are considered inappropriate based on the use of profane words specified in the profanity library: https://github.com/2Toad/Profanity

1. This product is complete shit.
2. The quality of this product is a damn joke.
3. Don't buy this crap, it's a waste of money.
4. This item is total bullshit.