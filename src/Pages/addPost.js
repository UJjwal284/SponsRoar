import React, {useState} from "react";
import Footer from "../Components/Footer";
import 'firebase/auth';
import Header3 from "../Components/Header3";
import Firebase, {db} from "../Components/Firebase";
import {useHistory} from "react-router-dom";
import $ from "jquery";

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
            }).then(r => {
                    if ($("input#Youtube").is(':checked')) {
                        Firebase.database().ref("/posts/" + Id + "/Platform/Youtube").set({
                            Value: $('select.Youtube').val()
                        })
                    }
                    if ($("input#Instagram").is(':checked')) {
                        Firebase.database().ref("/posts/" + Id + "/Platform/Instagram").set({
                            Value: $('select.Instagram').val()
                        })
                    }
                    if ($("input#Facebook").is(':checked')) {
                        Firebase.database().ref("/posts/" + Id + "/Platform/Facebook").set({
                            Value: $('select.Facebook').val()
                        })
                    }
                    if ($("input#Website").is(':checked')) {
                        Firebase.database().ref("/posts/" + Id + "/Platform/Website").set({
                            Value: $('select.Website').val()
                        })
                    }
                    goToSponsorDashboard()
                }
            )
        });
    }

    let time = +new Date();
    let Id = time + Firebase.auth().currentUser.uid;


    $(document).ready(function () {
        $('.tcp select').hide();
        $('#upVis').hide();
        $(':checkbox').change(function () {
            if (this.checked) {
                $('select.' + this.id).show();
            } else {
                $('select.' + this.id).hide();
            }
        })

        document.getElementById("files").addEventListener("change", function (e) {
            e.preventDefault();
            let files = [];
            files = e.target.files;
            if (files.length !== 0) {
                $('#upVis').show();
                const storage = Firebase.storage().ref('/productImage/' + Id);
                const upload = storage.put(files[0]);
                upload.on("state_changed", function progress(snapshot) {
                        document.getElementById("progress").value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    },

                    function error() {
                        document.getElementById("uploading").innerHTML = 'Upload Error!';
                    },

                    function complete() {
                        document.getElementById("uploading").innerHTML = 'Upload Complete';
                    }
                );
            } else {
                alert("No file chosen");
            }
        });
    });


    return (
        <div className="main pb-4">
            <Header3/>
            <form className={"bg-white mx-auto mb-5 p-4 f1 mt-3"}>
                <p className={"mb-0 p"}>Product Name</p>
                <input className="form-control" type={"text"} value={productName}
                       onChange={(e) => setProductName(e.target.value)} id={'pn'}/>
                <select className={"form-control mt-3"} value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                    <option selected>Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Health Care">Health Care</option>
                    <option value="Music">Music</option>
                    <option value="Website">Website</option>
                    <option value="Course">Course</option>
                </select>
                <div className={'tcp'}>
                    <p className={"p mb-0 mt-3"}>Platforms</p>
                    <div className={"mb-2"}>
                        <label htmlFor="Youtube" className={"my-auto"}>Youtube</label>
                        <input type="checkbox" className={"my-auto "} id={'Youtube'}/>
                        <select className="form-control Youtube">
                            <option value="">Minimum Subscribers</option>
                            <option value="0">0</option>
                            <option value="1,000">1,000</option>
                            <option value="10,000">10,000</option>
                            <option value="100,000">100,000</option>
                            <option value="1,000,000">1,000,000</option>
                            <option value="10,000,000">10,000,000</option>
                        </select>
                    </div>

                    <div className={"mb-2"}>
                        <label htmlFor="Instagram" className={"my-auto"}>Instagram</label>
                        <input type="checkbox" className={"my-auto"} id={'Instagram'}/>
                        <div>
                            <select className="form-control Instagram">
                                <option value="">Minimum Followers</option>
                                <option value="0">0</option>
                                <option value="1,000">1,000</option>
                                <option value="10,000">10,000</option>
                                <option value="100,000">100,000</option>
                                <option value="1,000,000">1,000,000</option>
                                <option value="10,000,000">10,000,000</option>
                            </select>
                        </div>
                    </div>

                    <div className={"mb-2"}>
                        <label htmlFor="Facebook" className={"my-auto"}>Facebook</label>
                        <input type="checkbox" className={"my-auto"} id={'Facebook'}/>
                        <div>
                            <select className="form-control Facebook">
                                <option value="">Minimum Page Likes</option>
                                <option value="0">0</option>
                                <option value="1,000">1,000</option>
                                <option value="10,000">10,000</option>
                                <option value="100,000">100,000</option>
                                <option value="1,000,000">1,000,000</option>
                                <option value="10,000,000">10,000,000</option>
                            </select>
                        </div>
                    </div>
                    <div className={"mb-2"}>
                        <label htmlFor="Website" className={"my-auto"}>Website</label>
                        <input type="checkbox" className={"my-auto "} id={'Website'}/>
                        <div>
                            <select className="form-control Website">
                                <option value="">Minimum Monthly Views</option>
                                <option value="0">0</option>
                                <option value="1,000">1,000</option>
                                <option value="10,000">10,000</option>
                                <option value="100,000">100,000</option>
                                <option value="1,000,000">1,000,000</option>
                                <option value="10,000,000">10,000,000</option>
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

                <p className={"mb-0 p mt-3 mb-1"}>Upload Product Image</p>
                <input type="file" accept="image/*" id="files"/>
                <div id={'upVis'}>
                    <p id="uploading">Uploading...</p>
                    <progress value="0" max="100" id="progress" className={'w-100'}/>
                </div>
                <button type="submit" className="w-100 btn btn-primary mt-3" id={'submit'} onClick={submit}>Submit
                </button>
            </form>
            <Footer/>
        </div>
    );
}

export default addPost;