import React, { useEffect, useState } from "react";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentor } from "../../redux/slices/dataSlice";
import Loading from "../Layout/Loading";

export default function MentorDetail() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { loading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchMentor(user.email));
  }, [user.email]);

  return <div>{loading ? <Loading /> : <Account />}</div>;
}
