import React from "react";
import "./home.css";
import Banner from "../../components/Banner.js";
import { Container } from "react-bootstrap";
import Blogs from "../../components/Blogs.js";
import WeekSpecial from "../../components/WeekSpecial.js";

const Home = () => {
  return (
    <>
        <Banner />
        <Container>
            <WeekSpecial/>
            <Blogs/>
        </Container>
    </>
  );
};

export default Home;
