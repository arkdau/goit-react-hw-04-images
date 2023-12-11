import { useEffect, useState } from "react";
import css from "./styles.css";
import fetchGetAllItems from "./services/PixabayAPI";
import SearchBar from "./SearchBar/SearchBar";
import Images from "./ImageGallery/Images";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
// import Modal from "./Modal/Modal";

const DEFAULT_QUERY = "";

export const App = () => {
  // state = {
  //   images: [],
  //   isLoading: false,
  //   errorMsg: "",
  //   totalHits: 0,
  //   totalPage: 0,
  //   page: 0,
  //   query: "",
  //   show: false,
  //   imageSelect: "",
  // };

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [images, setImages] = useState([]);
  const [imageSelect, setImageSelect] = useState("");
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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

    // this.setState({
    //   page: pageTemp,
    // });
    return pageTemp;
  }
  //
  // getTotalPage() {
  //   return this.setTotalPage(this.state.totalHits);
  // }
  // getPage() {
  //   return this.state.page;
  // }
  //

  useEffect(() => {
    fetchData(DEFAULT_QUERY, 1);
    // console.log('Mouting fase');
  }, []);

  useEffect(() => {
      fetchData(query, page);
  }, [query, page]);

  // componentDidMount() {
  //   this.fetchData(DEFAULT_QUERY);
  // }
  //
  // componentWillUnmount() {
  // }
  //
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (this.state.page !== prevState.page) {
  //     this.fetchData(this.state.query, this.state.page);
  //   }
  //   // console.log("selectImage: ", this.state.imageSelect);
  // }
  //
  async function fetchData(q, page) {
    try {
      // this.setState({
      //   isLoading: true,
      //   // images: [],
      //   errorMsg: "",
      //   page: page,
      //   query: q,
      // });

      setIsLoading(true);
      setImages([]);
      setErrorMsg("");
      setPage(page);
      setQuery(q);

      const upImages = await fetchGetAllItems(q, page);
      // console.log("images: ", images);

      if (page === undefined || page === 1) {
        setImages([]);

        // this.setState({
        //   images: [],
        // });
      }
      let imageSum = [];
      if (page === 1) {
        imageSum = upImages.hits;
      } else {
        imageSum = [...images, ...upImages.hits];
      }
      let maxPages = setTotalPage(upImages.totalHits);
      setImages(imageSum);
      setTotalHits(upImages.totalHits);
      setTotalPages(maxPages);

      // this.setState({
      //   images: imageSum,
      //   totalHits: images.totalHits,
      //   totalPage: maxPages,
      // });
    } catch (err) {
      console.error(err.message);
      setErrorMsg(err.message);

      // this.setState({
      //   errorMsg: err.message,
      // });
    } finally {
      setIsLoading(false);
      // this.setState({
      //   isLoading: false,
      // });
    }
  }
  //
  // showModal = () => {
  //   this.setState({ sho w: true });
  // };
  //
  // hideModal = () => {
  //   this.setState({ show: false });
  // };
  //
  const selectImage = (src) => {
    setImageSelect(src);

    // this.setState({
    //   imageSelect: src,
    // });
  };
  //
  // // Close modal window
  // escspePress(e) {
  //   e.preventDefault();
  //   if (e.key === "Escape") {
  //     this.hideModal();
  //     this.selectImage("");
  //   }
  // }
  //
  function Submit(q, page) {
    // this.fetchData();
    // this.setState({
    //   query: q,
    //   page: page,
    // });
    setQuery(q);
    setPage(page);
  }

  return (
    <div className="App">
      <SearchBar onSubmit={Submit} />
      {isLoading && <Loader />}
      {errorMsg && <div className="error">{errorMsg}</div>}
      {
        /*<Modal
    show={this.state.show}
    handleClose={this.hideModal}
    escape={this.escspePress}
  >
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img
          src={this.state.imageSelect}
          alt=""
        />
      </div>
    </div>
  </Modal>*/
      }

      {!errorMsg && (
        <Images
          data={images}
          selectImage={selectImage}
          // showModal={this.showModal}
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
