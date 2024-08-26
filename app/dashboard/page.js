
'use client'
import { useEffect, useState } from 'react';
import './dashboard.css'
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { BikeCard, Loading, SubHeader } from '../../components/commonComponents';
import { getApi, postApi } from '../response/api';
import { useDispatch, useSelector } from 'react-redux';
import { CitiesModal } from '../../utils/modal';
import { Button } from '@nextui-org/button';
import TabData from '../../components/tabs';

export default function Page() {
  const dispatch = useDispatch()
  const {loading, citiesData} = useSelector(state => state)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      window.location.href = "/"
    } else {
      dispatch({ type: "LOADING", payload: true })
      getApi('/getLocations').then((res) => {
        if (res && res.status == 200) {
          dispatch({ type: "LOCATIONDATA", payload: res.data })
          dispatch({
            type: "CITIESDATA", payload: [{label: "Please select the location", value: "Please select the location"}, ...res.data.map(ele => {
              return {label: ele.myLocation, value: ele.myLocation}
            })]
          })
          dispatch({ type: "LOADING", payload: false })
        }
      })
    }

  }, [])

  return (
    <div className='container'>
      {
        loading ? <Loading /> : ""
      }
      <TabData />
    </div>
  );
}
