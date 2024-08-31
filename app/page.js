'use client'
import { CitiesModal } from "../utils/modal";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { getApi } from './response/api';
import { dispatchFunction, isValid, TimeRangeArr } from "../utils/constants";
import { parseDate } from "@internationalized/date";
import { DatePickerComponent, DateSelection, Loading, TimerSelection } from "../components/commonComponents";
import { getLocalTimeZone, today } from "@internationalized/date";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import 'sweetalert2/dist/sweetalert2.min.css';
import '@sweetalert2/theme-dark/dark.min.css';
import { DateIcon, LockIcon } from "../utils/icons";

const arrrr = ["12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 PM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
]

export default function Home() {
  return (
    <>
      <div style={{ width: "100%" }} className="row">
                
      </div>
    </>

  );
}

const CustomInput = ({ value, onClick, label }) => (
  <div style={{ cursor: 'pointer', padding: "5px 0px", border: "2px solid rgb(225 225 245)", borderRadius: "10px", boxShadow: "var(--bs-box-shadow-sm) !important" }}>
    <span style={{ display: 'block', fontSize: '13px', fontWeight: '400', marginLeft: '12px', fontWeight: "bold" }}>{label}</span>
    <div onClick={onClick} tabIndex="0" role="button" className="custom-input d-flex align-items-center container" >
      <button className="custom-input" style={{ fontWeight: '400', fontSize: '15px', color: "#797982" }}>
        {value}
      </button>
      <div style={{ marginLeft: '128px' }}>
        <DateIcon />
      </div>
    </div>
  </div>
);
