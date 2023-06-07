import React, { useEffect, useState } from "react";
import "../style/youtube.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, setSearchTerm } from "../../redux/slices/videoSlice";

function SearchBar() {
  const dispatch = useDispatch();

  const searchTerm = useSelector((state) => state.video.searchterm);

  const [selectedSearchTerm, setSelectedSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setSearchTerm(selectedSearchTerm));
  };

  useEffect(() => {
    dispatch(fetchVideos(searchTerm));
  }, [searchTerm]);

  return (
    <>
      <div className="search-bar ui segment">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              onChange={(e) => {
                setSelectedSearchTerm(e.target.value);
              }}
              name="video-search"
              type="text"
              placeholder="Search for technology videos..."
              value={selectedSearchTerm}
            />
            <button style={{ border: "none" }} type="submit">
              <img src="images/search.png" alt="" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
