import Carousel from "react-material-ui-carousel";
import React from "react";
import "./IImageSilder.css";

const defaultOptions = {};

export default function IImageSlider({ children, ...propsOptions }) {
  const options = {
    ...defaultOptions,
    ...propsOptions,
  };
  return (
    <Carousel animation="slide" {...options}>
      {children}
    </Carousel>
  );
}
