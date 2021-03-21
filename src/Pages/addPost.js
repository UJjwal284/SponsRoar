import React, {useState} from "react";
import Footer from "../Components/Footer";
import 'firebase/auth';
import './addPost.css';
import Header3 from "../Components/Header3";
import Firebase, {db} from "../Components/Firebase";
import {useHistory} from "react-router-dom";

function addPost() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();
    const goToSponsorDashboard = () => {
        history.push("/sponsorDashboard");
    }

// eslint-disable-next-line react-hooks/rules-of-hooks
    const [productName, setProductName] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [required, setRequired] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [description, setDescription] = useState("");
// eslint-disable-next-line react-hooks/rules-of-hooks
    const [category, setCategory] = useState("");


    const submit = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault();
        let time = +new Date();
        let Id = time + Firebase.auth().currentUser.uid;

        // let storageRef = Firebase.storage().ref('productImage/') + Id + '.jpg';
        // let fileUpload = document.getElementById("fileUpload");
        // fileUpload.addEventListener('change', function (evt) {
        //     let firstFile = evt.target.files[0];
        //     storageRef.put(firstFile);
        // });
        db.ref("sponsor/" + Firebase.auth().currentUser.uid).once("value").then(function (snapshot) {
            const childData = snapshot.val();
            db.ref("/posts/" + Id).set({
                Brand: childData['Name'],
                ProductName: productName,
                Required: required,
                Description: description,
                Category: category,
                CreatedBy: Firebase.auth().currentUser.uid,
                CreatedOn: time,
            }).then(r => goToSponsorDashboard()
            )
        });
    }

    return (
        <div className="main pb-4">
            <Header3/>
            <form className={"bg-white mx-auto mb-5 p-4 f1 mt-3"}>
                <p className={"mb-0 p"}>Product Name</p>
                <input className="form-control" type={"text"} value={productName}
                       onChange={(e) => setProductName(e.target.value)}/>
                <select className={"form-control mt-3"} value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Category</option>
                    <option value="">Technology</option>
                    <option value="">Health Care</option>
                    <option value="">Music</option>
                    <option value="">Website</option>
                    <option value="">Course</option>
                </select>
                <div>
                    <p className={"p mb-0 mt-3"}>Platforms</p>
                    <div className={"d-flex mb-2"}>
                        <label htmlFor="Youtube" className={"my-auto"}>Youtube</label>
                        <input type="checkbox" className={"my-auto cYoutube"} id={'Youtube'}/>
                        <select className="form-control mr-3 Youtube" hidden>
                            <option value="">Minimum Subscribers</option>
                            <option value="">0</option>
                            <option value="">1,000</option>
                            <option value="">10,000</option>
                            <option value="">100,000</option>
                            <option value="">1,000,000</option>
                            <option value="">10,000,000</option>
                        </select>
                        <select className="form-control Youtube" hidden>
                            <option value="">Minimum Average Views / Month</option>
                            <option value="">0</option>
                            <option value="">1,000</option>
                            <option value="">10,000</option>
                            <option value="">100,000</option>
                            <option value="">1,000,000</option>
                            <option value="">10,000,000</option>
                            <option value="">100,000,000</option>
                        </select>
                    </div>

                    <div className={"d-flex mb-2"}>
                        <label htmlFor="Instagram" className={"my-auto"}>Instagram</label>
                        <input type="checkbox" className={"my-auto cInstagram"} id={'Instagram'}/>
                        <div>
                            <select className="form-control Instagram" hidden>
                                <option value="">Minimum Followers</option>
                                <option value="">0</option>
                                <option value="">1,000</option>
                                <option value="">10,000</option>
                                <option value="">100,000</option>
                                <option value="">1,000,000</option>
                                <option value="">10,000,000</option>
                                <option value="">100,000,000</option>
                            </select>
                        </div>
                    </div>

                    <div className={"d-flex mb-2"}>
                        <label htmlFor="Facebook" className={"my-auto"}>Facebook</label>
                        <input type="checkbox" className={"my-auto cFacebook"} id={'Facebook'}/>
                        <div>
                            <select className="form-control Facebook" hidden>
                                <option value="">Minimum Page Likes</option>
                                <option value="">0</option>
                                <option value="">1,000</option>
                                <option value="">10,000</option>
                                <option value="">100,000</option>
                                <option value="">1,000,000</option>
                                <option value="">10,000,000</option>
                                <option value="">100,000,000</option>
                            </select>
                        </div>
                    </div>
                    <div className={"d-flex mb-2"}>
                        <label htmlFor="Website" className={"my-auto"}>Website</label>
                        <input type="checkbox" className={"my-auto cWebsite"} id={'Website'}/>
                        <div>
                            <select className="form-control Website" hidden>
                                <option value="">Minimum Monthly Views</option>
                                <option value="">0</option>
                                <option value="">1,000</option>
                                <option value="">10,000</option>
                                <option value="">100,000</option>
                                <option value="">1,000,000</option>
                                <option value="">10,000,000</option>
                                <option value="">100,000,000</option>
                            </select>
                        </div>
                    </div>
                </div>
                <p className={"mb-0 p mt-3"}>No. of Sponsees Required</p>
                <input className="form-control" type={"number"} value={required}
                       onChange={(e) => setRequired(e.target.value)}/>
                <p className={"mb-0 p mt-3"}>Product Description</p>
                <input className="form-control" type={"text"} value={description}
                       onChange={(e) => setDescription(e.target.value)}/>
                <input type="file" accept="image/*" capture="camera" id="fileUpload"
                       className={'my-3'}/><br/>
                <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
            </form>
            <Footer/>
        </div>
    );
}

export default addPost;