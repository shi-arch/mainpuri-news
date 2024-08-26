import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "@nextui-org/dropdown";
import { DropDown, Loading } from "./commonComponents";
import { postApi } from "@/app/response/api";

const styles = {
    errorStyle: {
        margin: "0px 0px 0px 10px", fontSize: "13px", color: "red"
    }
}

export default function TabData() {
    const dispatch = useDispatch()
    const [locationStr, setLocationStr] = useState("")
    const [localError, setLocalError] = useState({type: "", message: ""})
    const [subLocationArr, setSubLocationArr] = useState([])
    const { vehicleDetails, citiesData, locationData, subLocations, error, loading } = useSelector(state => state)
    const handleSelection = (val) => {
        const cloned = { ...vehicleDetails }
        cloned['location'] = val
        const find = locationData.find(ele => ele.myLocation == val)
        if (find) {
            dispatch({ type: "SUBLOCATIONS", payload: find.subLocation })
        }
        dispatch({ type: "VEHICLEDETAILS", payload: cloned })
    }

    const handleSublocation = (val) => {
        const cloned = { ...vehicleDetails }
        cloned['pickupLocation'] = val
        dispatch({ type: "VEHICLEDETAILS", payload: cloned })
    }

    const handleChange = (e, name) => {
        const { value } = e.target
        const cloned = { ...vehicleDetails }
        cloned[name] = value
        dispatch({ type: "VEHICLEDETAILS", payload: cloned })
    }
    const isValid = () => {
        const { name, url, pricePerday, distanceLimit, brand, vehicleNumber, transmissionType, pickupLocation, bookingAmount, location, accessChargePerKm } = vehicleDetails
        let isValid = true
        if (!name) {
            isValid = false
            dispatch({ type: "ERROR", payload: { type: "name", message: "Please enter vehicle name" } })
        } else if (!url) {
            isValid = true
            dispatch({ type: "ERROR", payload: { type: "url", message: "Please enter url" } })
        } else if (!pricePerday) {
            isValid = false
            dispatch({ type: "ERROR", payload: { type: "pricePerday", message: "Please enter pricePerday" } })
        } else if (!distanceLimit) {
            isValid = false
            dispatch({ type: "ERROR", payload: { type: "distanceLimit", message: "Please enter distance limit" } })
        } else if (!accessChargePerKm) {
            isValid = false
            dispatch({ type: "ERROR", payload: { type: "accessChargePerKm", message: "Please enter accessChargePerKm" } })
        } else if (!brand) {
            isValid = false
            dispatch({ type: "ERROR", payload: { type: "brand", message: "Please enter brand" } })
        } else if (!vehicleNumber) {
            isValid = false
            dispatch({ type: "ERROR", payload: { type: "vehicleNumber", message: "Please enter vehicleNumber" } })
        } else if (!transmissionType) {
            isValid = false
            dispatch({ type: "ERROR", payload: { type: "transmissionType", message: "Please enter transmissionType" } })
        } else if (!vehicleNumber) {
            isValid = false
            dispatch({ type: "ERROR", payload: { type: "vehicleNumber", message: "Please enter vehicleNumber" } })
        } else if (!bookingAmount) {
            isValid = false
            dispatch({ type: "ERROR", payload: { type: "bookingAmount", message: "Please enter bookingAmount" } })
        } else if (!location) {
            isValid = false
            dispatch({ type: "ERROR", payload: { type: "location", message: "Please enter location" } })
        } else if (!pickupLocation) {
            isValid = false
            dispatch({ type: "ERROR", payload: { type: "pickupLocation", message: "Please enter pickupLocation" } })
        } else {
            dispatch({ type: "ERROR", payload: "" })
        }
        return isValid
    }
    const submit = async () => {
        if (isValid()) {
            dispatch({ type: "LOADING", payload: true })
            console.log(vehicleDetails)
            const res = await postApi('/createVehicle', vehicleDetails)
            if (res.status == 200) {
                swal({
                    title: "Congratulation!",
                    text: "Vehicle created successfully!",
                    icon: "success",
                    dangerMode: true,
                })
            } else {
                swal({
                    title: "Error!",
                    text: "Something went wrong!",
                    icon: "Error",
                    dangerMode: true,
                })
            }
            dispatch({ type: "LOADING", payload: false })
        }
    }
    const handleCreateLocation = () => {

    }
    return (
        <div className="flex w-full flex-col" style={{ marginTop: "20px" }}>
            {
                loading ? <Loading /> : ""
            }
            <Tabs aria-label="Options">
                <Tab key="photos" title="Add Vehicle">
                    <Card>
                        <CardHeader className="flex gap-3">
                            <h4>Create Vehicle +</h4>
                        </CardHeader>
                        <CardBody>
                            <div className="row" style={{ marginBottom: "20px" }}>
                                <div className="col-md-4">
                                    <Input type="name" onChange={(e) => handleChange(e, 'name')} label="Vehicle name" />
                                    <p style={styles.errorStyle}>{error?.type == "name" && error?.message}</p>
                                </div>
                                <div className="col-md-4">
                                    <Input type="url" onChange={(e) => handleChange(e, 'url')} label="Image url" />
                                    <p style={styles.errorStyle}>{error?.type == "url" && error?.message}</p>
                                </div>
                                <div className="col-md-4">
                                    <Input placeholder="Price per day" onChange={(e) => handleChange(e, 'pricePerday')} />
                                    <p style={styles.errorStyle}>{error?.type == "pricePerday" && error?.message}</p>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "20px" }}>
                                <div className="col-md-4">
                                    <Input type="email" placeholder="Distance limit" onChange={(e) => handleChange(e, 'distanceLimit')} />
                                    <p style={styles.errorStyle}>{error?.type == "distanceLimit" && error?.message}</p>
                                </div>
                                <div className="col-md-4">
                                    <Input type="email" placeholder="Access charge per km" onChange={(e) => handleChange(e, 'accessChargePerKm')} />
                                    <p style={styles.errorStyle}>{error?.type == "accessChargePerKm" && error?.message}</p>
                                </div>
                                <div className="col-md-4">
                                    <Input type="email" placeholder="Brand name" onChange={(e) => handleChange(e, 'brand')} />
                                    <p style={styles.errorStyle}>{error?.type == "brand" && error?.message}</p>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "20px" }}>
                                <div className="col-md-4">
                                    <Input type="email" placeholder="Vehicle number" onChange={(e) => handleChange(e, 'vehicleNumber')} />
                                    <p style={styles.errorStyle}>{error?.type == "vehicleNumber" && error?.message}</p>
                                </div>
                                <div className="col-md-4">
                                    <Input type="email" placeholder="Transmission type" onChange={(e) => handleChange(e, 'transmissionType')} />
                                    <p style={styles.errorStyle}>{error?.type == "transmissionType" && error?.message}</p>
                                </div>
                                <div className="col-md-4">
                                    <Input type="email" placeholder="Booking amount" onChange={(e) => handleChange(e, 'bookingAmount')} />
                                    <p style={styles.errorStyle}>{error?.type == "bookingAmount" && error?.message}</p>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "20px" }}>
                                {
                                    citiesData.length ?
                                        <>
                                            <div className="col-md-4">
                                                <DropDown list={citiesData} onSelect={handleSelection} />
                                                <p style={styles.errorStyle}>{error?.type == "location" && error?.message}</p>
                                            </div>
                                        </> : ""
                                }
                                {
                                    subLocations.length ?
                                        <>
                                            <div className="col-md-4">
                                                <DropDown list={subLocations} onSelect={handleSublocation} />
                                                <p style={styles.errorStyle}>{error?.type == "pickupLocation" && error?.message}</p>
                                            </div>
                                        </> : ""
                                }
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <button onClick={submit} style={{ background: "black", color: "white", width: "50%", marginTop: "20px" }} className="btn btn-primary form-controll">Submit</button>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="music" title="Music">
                    <Card>
                        <CardHeader className="flex gap-3">
                            <h4>Create Location +</h4>
                        </CardHeader>
                        <CardBody>
                            <div className="row" style={{ marginBottom: "20px" }}>
                                <div className="col-md-4">
                                    <Input type="name" onChange={(e) => setLocationStr(e.target.value)} label="Enter city name eg., Banglore" />
                                    <p style={styles.errorStyle}>{error?.type == "location" && error?.message}</p>
                                </div>
                                <div className="col-md-4">
                                    <Input type="url" onChange={(e) => setSubLocationArr(e.target.value)} label="Sub location 1" />
                                    <p style={styles.errorStyle}>{localError?.type == "sublocation" && error?.message}</p>
                                </div>
                                <div className="col-md-4">
                                    <Input type="url" onChange={(e) => setSubLocationArr(e.target.value)} label="Sub location 2" />
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: "20px" }}>
                                <div className="col-md-4">
                                    <Input type="url" onChange={(e) => setSubLocationArr(e.target.value)} label="Sub location 3" />
                                </div>
                                <div className="col-md-4">
                                    <Input type="url" onChange={(e) => setSubLocationArr(e.target.value)} label="Sub location 4" />
                                </div>
                                <div className="col-md-4">
                                    <Input type="url" onChange={(e) => setSubLocationArr(e.target.value)} label="Sub location 5" />
                                </div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <button onClick={submit} style={{ background: "black", color: "white", width: "50%", marginTop: "20px" }} className="btn btn-primary form-controll">Submit</button>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="videos" title="Videos">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
