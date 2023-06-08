import React, { useEffect, useState } from "react";
import "../style/youtube.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos, setSearchTerm } from "../../redux/slices/videoSlice";
import { fetchSkills } from "../../redux/slices/dataSlice";

function SearchBar() {
  const dispatch = useDispatch();

  const { skills } = useSelector((state) => state.data);

  const searchTerm = useSelector((state) => state.video.searchterm);

  useEffect(() => {
    dispatch(fetchSkills());
  }, []);

  useEffect(() => {
    dispatch(fetchVideos(searchTerm));
  }, [searchTerm]);

  return (
    <>
      <div className="search-bar ui segment">
        <div className="filter-input">
          <label htmlFor="text">Skills</label>
          <input
            type="text"
            value={searchTerm}
            list="names"
            onChange={(e) => {
              dispatch(setSearchTerm(e.target.value));
            }}
          />
          <datalist id="names">
            {skills.map((skill, index) => {
              return <option key={index} value={skill.name} />;
            })}
          </datalist>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
