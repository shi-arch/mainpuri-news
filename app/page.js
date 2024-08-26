'use client'
import { CitiesModal } from "../utils/modal";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { getApi, postApi } from './response/api';
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

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter()
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.error);
  const mobilePattern = /^\d{10}$/;

  useEffect(() => {
    // const isLoggedIn = localStorage.getItem("isLoggedIn")
    // if (isLoggedIn) {
    //   window.location.href = "/dashboard"
    // }
  }, [])

  const isValid = () => {
    let isValid = true
    if (!contact) {
      isValid = false
      dispatch({ type: "ERROR", payload: { type: "contact", message: "Please enter contact number or email" } })
    } else if (contact && !mobilePattern.test(contact)) {
      isValid = false
      dispatch({ type: "ERROR", payload: { type: "contact", message: "Enter 10 digit mobile number" } })
    } else if (!password) {
      isValid = false
      dispatch({ type: "ERROR", payload: { type: "password", message: "Enter password" } })
    } else {
      dispatch({ type: "ERROR", payload: "" })
    }
    return isValid
  }
  const verify = async () => {
    if (isValid()) {
      const res = await postApi('/getUsersByContact', { contact: parseInt(contact), userType: "ADMIN" })
      if (res.status == 200) {
        localStorage.setItem('adminLogin', JSON.stringify(res.data))
        router.push('/dashboard')
      } else {
        swal({
          title: "Error!",
          text: "Invalid credentials",
          icon: "error",
          dangerMode: true,
        })
      }
    }
  }
  return (
    <>
      <h3 style={{ marginTop: "30px", color: "#e03546" }}>Todays News Headlines Are ... !</h3>
      <div style={styles.container}>
        <h1 style={styles.title}>Hurricane Gilma tracker: See latest details, projected path of storm in Pacific</h1>
        <div className="row">
          <div className="col-md-6">
          <p style={{ textAlign: "justify", padding: "0px 20px" }}>
          After getting soaked by Hurricane Hone this past weekend, another hurricane threat could impact the islands of Hawaii in the coming days. Hurricane Gilma is currently about 1,260 miles east of Hilo, Hawaii, and is moving west at about 9 miles per hour, the National Hurricane Center said Monday morning. The storm is forecast to continue moving west-northwestward for the next several days "with some increase in forward speed" expected Tuesday evening.
          Maximum sustained winds have decreased to about 100 mph, according to the NHC, and although gradual weakening is forecast in the next few days, Gilma is "forecast to remain a hurricane as it approaches the central Pacific basin."
          Two named storms have not come within 300 miles of the main Hawaiian islands in a week's span since 1992, according to AccuWeather, which said more than 40% of the tropical cyclones to have an effect on the state throughout the year take place in August.
          Characters whose Unicode scalar values are greater than U+FFFF (such as some rare Chinese/Japanese/Korean/Vietnamese characters and some emoji) are stored in UTF-16 with two surrogate code units each. For example, a string containing the single character U+1F600 "Emoji grinning face" will have length 2. Accessing the individual code units in such a string using square brackets may have undesirable consequences such as the formation of strings with unmatched surrogate code units, in violation of the Unicode standard. (Examples should be added to this page after MDN bug 857438 is fixed.)
        </p>
          </div>
          <div className="col-md-6">
            <img src="https://media.suara.com/pictures/970x544/2020/02/01/65333-bidik-layar-potongan-rekaman-pemberitaan-kompas-tv-soal-virus-corona-istimewa.jpg" alt=""/>
          </div>
        </div>
      </div>
    </>

  );
}

const styles = {
  container: {
    margin: '40px',
    textAlign: 'center',
    border: "1px solid #f0f3f5",
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  title: {
    margin: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#333',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

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
