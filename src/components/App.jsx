import { useEffect, useState } from "react";
import css from "./styles.css";
import fetchGetAllItems from "./services/PixabayAPI";
import SearchBar from "./SearchBar/SearchBar";
import Images from "./ImageGallery/Images";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

const DEFAULT_QUERY = "";

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [images, setImages] = useState([]);
  const [imageSelect, setImageSelect] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  // const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);

  function setTotalPage(totalHits) {
    const totalPage = Math.ceil(totalHits / 12);
    return totalPage;
  }

  function nextPage() {
    let pageTemp = page;
    if (page < totalPages) {
      pageTemp += 1;
    } else {
      pageTemp = 1;
    }

    setPage(pageTemp);

    return pageTemp;
  }

  useEffect(() => {
    fetchData(DEFAULT_QUERY, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  async function fetchData(q, page) {
    try {
      setIsLoading(true);
      setImages([]);
      setErrorMsg("");
      setPage(page);
      setQuery(q);

      const upImages = await fetchGetAllItems(q, page);

      if (page === undefined || page === 1) {
        setImages([]);
      }
      let imageSum = [];
      if (page === 1) {
        imageSum = upImages.hits;
      } else {
        imageSum = [...images, ...upImages.hits];
      }
      let maxPages = setTotalPage(upImages.totalHits);
      setImages(imageSum);
      setTotalPages(maxPages);
    } catch (err) {
      console.error(err.message);
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const selectImage = (src) => {
    setImageSelect(src);
  };
  // Close modal window
  function escspePress(e) {
    e.preventDefault();
    if (e.key === "Escape") {
      hideModal();
      selectImage("");
    }
  }

  function Submit(q, page) {
    setQuery(q);
    setPage(page);
  }

  return (
    <div className="App">
      <SearchBar onSubmit={Submit} />
      {isLoading && <Loader />}
      {errorMsg && <div className="error">{errorMsg}</div>}

      <Modal
        show={show}
        handleClose={hideModal}
        escape={escspePress}
      >
        <div className={css.Overlay}>
          <div className={css.Modal}>
            <img
              src={imageSelect}
              alt=""
            />
          </div>
        </div>
      </Modal>

      {!errorMsg && (
        <Images
          data={images}
          selectImage={selectImage}
          showModal={showModal}
        />
      )}

      {(totalPages > 1) &&
        (
          <Button
            next={nextPage}
          />
        )}
    </div>
  );
};
