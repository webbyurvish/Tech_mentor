import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../../redux/slices/dataSlice";
import Loading from "../../components/Layout/Loading/Loading";
import { fetchVideos, setSearchTerm } from "../../redux/slices/videoSlice";

import "./Yt.css";

export const Skills = () => {
  const dispatch = useDispatch();
  const { skills, loading } = useSelector((state) => state.data);
  const searchTerm = useSelector((state) => state.video.searchterm);

  const handleskillchange = (skill) => {
    dispatch(setSearchTerm(skill)); // Dispatch the setTechnology action with the selected skill
  };

  useEffect(() => {
    dispatch(fetchSkills());
  }, []);

  useEffect(() => {
    dispatch(fetchVideos(searchTerm));
  }, [searchTerm]);

  return (
    <div className="skills-container">
      {loading ? (
        <Loading />
      ) : (
        <div className="skills-list">
          {skills.map((skill, index) => (
            <div className="yt-saveorclose-btn">
              <button
                onClick={() => handleskillchange(skill.name)}
                key={skill.id}
                className="skill-item"
              >
                {skill.name}
              </button>
              {index > 0 && (index + 1) % 7 === 0 && <br />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
