import { useEffect, useState } from "react";
import FugiImg from "../images/fuji.jpg";
import HokusaiImg from "../images/hokusai.jpg";

export default function GalleryPage(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [gallery, setGallery] = useState([]);

  const sampleGallery = [
    { i_id: 1, name: "/images/fuji.jpg", author_id: "marko", public: 1 },
    { i_id: 2, name: "/images/fuji.jpg", author_id: "marko", public: 1 },
    { i_id: 3, name: "/images/fuji.jpg", author_id: "marko", public: 1 },
    { i_id: 4, name: "/images/fuji.jpg", author_id: "marko", public: 1 },
    { i_id: 5, name: "/images/fuji.jpg", author_id: "marko", public: 1 },
    { i_id: 6, name: "/images/fuji.jpg", author_id: "marko", public: 1 },
  ];

  useEffect(() => {
    // TODO: check if this works? i cant test it becouse my login doesnt work
    sessionStorage.getItem("username") ? fetchUserGallery() : fetchAllGallery();
  }, []);

  const fetchUserGallery = async () => {
    const username = sessionStorage.getItem("username");
    const response = await fetch("api/gallery?username=" + username);

    const text = await response.text();

    const images = JSON.parse(text);

    setGallery(images);
  };

  const fetchAllGallery = async () => {
    const response = await fetch("api/gallery");

    const text = await response.text();

    const images = JSON.parse(text);

    setGallery(images);
  };

  const Buttons = (props) => {
    return (
      <div>
        <div>
          <button class="btn btn-primary mt-3 " onClick={fetchAllGallery}>
            Load all images
          </button>
        </div>
        <div>
          <button class="btn btn-primary mt-3 " onClick={fetchUserGallery}>
              Load user images
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-100">
      <h1 className="mt-2">Gallery</h1>
      <Buttons />
      <div className="d-flex flex-wrap align-content-center justify-content-around">
        {gallery.map((item) => PaintingCard(item))}
      </div>
    </div>
  );
}

const PaintingCard = (props) => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; ++i) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const extractName = (path) => {
    const filePath = path;
    const fileName = filePath.split("/").pop().split(".")[0];
    return fileName;
  };

  return (
    // TODO: add onClick functionality
    <div
      className="card"
      style={{ width: "18rem", height: "auto" }}
      onClick={() => {
        // TODO: navigate to room
      }}
    >
      <img className="card-img-top" src={props.name} alt={props.name} />
      <div className="card-body">
        <h5 className="card-title">{extractName(props.name)}</h5>
        <div className="d-flex flex-row justify-content-center">
          {/* {typeof props.author_id === Array ? (
            props.author_id.map((author) => (
              <div
                className="badge me-1"
                style={{
                  backgroundColor: getRandomColor(),
                }}
              >
                {author_id}
              </div>
            ))
          ) : ( */}
          <div
            className="badge me-1"
            style={{
              backgroundColor: getRandomColor(),
            }}
          >
            {props.author_id}
          </div>
          {/* ) */}
          {/* } */}
        </div>
      </div>
    </div>
  );
};


