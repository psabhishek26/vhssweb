import React, { useState } from "react";
import { dataRef, storage } from './firebase';
import "./style.css";

function Registration() {
    const [profileImage, setProfileImage] = useState("./def_pfp.jpg");
    const [documentFile, setDocumentFile] = useState(null);
    const [isFirmSelected, setIsFirmSelected] = useState(false);

    const handleCheckboxChange = () => {
        setIsFirmSelected(!isFirmSelected);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDocumentUpload = (event) => {
        const file = event.target.files[0];
        setDocumentFile(file);
    };

    const openFileInput = () => {
        document.getElementById("imageUpload").click();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            address: document.getElementById("address").value,
            pincode: document.getElementById("pincode").value,
            dob: document.getElementById("dob").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            aadhaarNo: document.getElementById("aadhaarNo").value,
            educationQualification: document.getElementById("eduQualification").value,
            skillSector: document.getElementById("skillSector").value,
            experience: document.getElementById("experience").value,
            runFirm: document.getElementById("runFirmCheckbox").checked,
            nameOfFirm: document.getElementById("nameOfFirm").value,
            addressOfFirm: document.getElementById("addressOfFirm").value,
            phoneOfFirm: document.getElementById("phoneOfFirm").value,
            placeOfFirm: document.getElementById("placeOfFirm").value,
            municipality_panchayath: document.getElementById("municipality_panchayath").value,
            wardNo: document.getElementById("wardNo").value,
            place: document.getElementById("place").value,
            landMark: document.getElementById("landMark").value,
        };

        // Save data to the database under the user's email name + phone num
        const userID = formData.email.split('@')[0] + formData.phone;

        // Upload profile image
        if (profileImage !== "./def_pfp.jpg") {
            const profileImageRef = storage.child(`profile_images/${userID}`);
            profileImageRef.putString(profileImage, "data_url").then(() => {
                console.log("Profile image uploaded successfully!");
            });
        } else {
            alert("Please select a profile image")
        }

        // Upload document file (Aadhaar)
        if (documentFile) {
            const documentRef = storage.child(`documents/aadhaar/${userID}`);
            documentRef.put(documentFile).then(() => {
                console.log("Aadhaar uploaded successfully!");
            });
        }

        dataRef.ref(`registrations/${userID}`).set(formData);
        console.log("Form data pushed");
    };

    return (
        <div className="container">
            <div className="en-page-header">
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <img
                            src="/logo.png"
                            alt=""
                            className="en-page-header-logo"
                        />
                    </div>
                    <div className="form-group col-md-0">
                        <div
                            id="profile-container"
                            onClick={openFileInput}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                id="profileImage"
                                src={profileImage}
                                className="en-profile-image"
                                alt="Profile"
                            />
                        </div>
                        <input
                            id="imageUpload"
                            type="file"
                            name="profile_photo"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: "none" }}
                        />
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Address" required />
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputZip">Pincode</label>
                        <input type="number" className="form-control" id="pincode" required />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" className="form-control" id="dob" required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="phone">Phone</label>
                        <input type="number" className="form-control" id="phone" placeholder="Phone" required />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Email" required />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" required />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="aadhaarNo">Aadhaar No</label>
                    <input type="number" className="form-control" id="aadhaarNo" placeholder="Aadhaar No" required />
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="eduQualification">Education Qualification</label>
                        <select id="eduQualification" className="form-control" required>
                            <option value="">Choose...</option>
                            <option>Below 10</option>
                            <option>10</option>
                            <option>+2</option>
                            <option>ITI/ITC</option>
                            <option>Deploma</option>
                            <option>Engineering</option>
                            <option>Degree</option>
                            <option>PG</option>
                            <option>Others</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="skillSector">Skill Sector</label>
                        <select id="skillSector" className="form-control" required>
                            <option value="">Choose...</option>
                            <option>Electrician</option>
                            <option>Plumber</option>
                            <option>Construction</option>
                            <option>Electrical Appliances Service</option>
                            <option>Two-Wheeler</option>
                            <option>Three-Wheeler</option>
                            <option>Car</option>
                            <option>Other Auto Mobiles</option>
                            <option>Ac / Fridge</option>
                            <option>Tv And Electronics</option>
                            <option>Well</option>
                            <option>Wood Work</option>
                            <option>Kooli Pani</option>
                            <option>Coconut Climbing</option>
                            <option>CCTV</option>
                            <option>Computer</option>
                            <option>Mobile</option>
                            <option>Aluminium</option>
                            <option>Tile</option>
                            <option>Welding</option>
                            <option>Others</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="experience">Experience</label>
                    <input type="text" className="form-control" id="experience" placeholder="Experience" required />
                </div>

                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="runFirmCheckbox" value="0" onChange={handleCheckboxChange} checked={isFirmSelected}/>
                        <label className="form-check-label" htmlFor="runFirmCheckbox">
                            Run a Firm
                        </label>
                    </div>
                </div>

                <div id="runFirmCheckboxdiv" style={{ display: isFirmSelected ? 'block' : 'none' }}>
                    <div className="form-group">
                        <label htmlFor="nameOfFirm">Name of Firm</label>
                        <input type="text" className="form-control" id="nameOfFirm" placeholder="Name of Firm" required={isFirmSelected} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="addressOfFirm">Address</label>
                        <input type="text" className="form-control" id="addressOfFirm" placeholder="Address" required={isFirmSelected} />
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="phoneOfFirm">Phone</label>
                            <input type="number" className="form-control" id="phoneOfFirm" placeholder="Phone" required={isFirmSelected} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="placeOfFirm">Place</label>
                            <input type="text" className="form-control" id="placeOfFirm" placeholder="Place" required={isFirmSelected} />
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="municipality_panchayath">Municipality/Panchayath</label>
                        <input type="text" className="form-control" id="municipality_panchayath" placeholder="Municipality/Panchayath" required />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="wardNo">Ward No</label>
                        <input type="number" className="form-control" id="wardNo" placeholder="Ward No" required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="place">Place</label>
                        <input type="text" className="form-control" id="place" placeholder="Place" required />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="landMark">Land Mark</label>
                        <input type="text" className="form-control" id="landMark" placeholder="Land Mark" required />
                    </div>
                </div>

                <div className="form-group en-upload-file">
                    <label htmlFor="upload_aadhaar">Upload Aadhaar</label>
                    <input
                        type="file"
                        id="documentUpload"
                        name="document"
                        onChange={handleDocumentUpload}
                        required
                    />
                </div>

                <div className="en-page-action">
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </div>
            </form>

            <div className="en-page-footer">
                <span>Powered by <b>Sarvodayam VHSS</b></span>
            </div>
        </div>
    );
}

export default Registration;
