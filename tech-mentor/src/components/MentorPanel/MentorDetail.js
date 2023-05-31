import React, { useEffect, useState } from "react";
import Account from "./Account";
import axios from "axios";
import { API_URL } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchMentorDetails } from "../../redux/slices/dataSlice";
import Loading from "../Layout/Loading";

export default function MentorDetail() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const mentor = useSelector((state) => state.data.mentor);

  useEffect(() => {
    dispatch(fetchMentorDetails(user.email));
  }, [user.email]);

  return <div>{!mentor ? <Loading /> : <Account />}</div>;
}
