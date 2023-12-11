import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
// import { Component } from "react";
import css from "./ImageGallery.module.css";
// import * as basicLightbox from "basiclightbox";

function ImageGallery(props) {
  const handleOnClick = (evt) => {
    evt.preventDefault();

    const elem = evt.target;
    // const src = elem.currentSrc;
    const largeImageURL = elem.dataset.scr;
    // console.log('elem: ', elem);
    // console.log('largeImageURL: ', largeImageURL);

    if (elem.tagName === "IMG") {
      props.selectImage(largeImageURL);
      props.showModal();
    }
  };

  return (
    <ul className={css.ImageGallery} onClick={handleOnClick}>
      <ImageGalleryItem
        data={props.data}
      />
    </ul>
  );
}

export default ImageGallery;
