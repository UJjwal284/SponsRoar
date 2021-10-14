import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from 'firebase';
import {Link} from "react-router-dom";

class SponsorCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        const accountRef = firebase.database().ref('posts').orderByChild('CreatedOn');
        accountRef.on('value', (snapshot) => {
                let accounts = snapshot.val();
                let newState = [];
                for (let account in accounts) {
                    let plats = "";
                    firebase.database().ref('posts/' + account + '/Platform').on('value', (snap) => {
                        let acc = snap.val();
                        for (let accs in acc) {
                            plats += " " + accs + ',';
                        }
                    })

                    var  URL = "";
                    const storage = firebase.storage().ref("productImage/" + account);
                    storage.getDownloadURL().then(function (url) {
                        URL = url;
                        console.log(URL)
                    }).catch(function (error) {
                    });
                    console.log(URL)

                    newState.push({
                        plat: plats.slice(0, -1),
                        key: account,
                        Brand: accounts[account].Brand,
                        Category: accounts[account].Category,
                        CreatedOn: new Date(accounts[account].CreatedOn).toLocaleString('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }),
                        Description: accounts[account].Description,
                        ProductName: accounts[account].ProductName,
                        PostImageURL: URL
                    })
                }
                this.setState({
                    posts: newState,
                })
            }
        )
    }

    render() {


        return (
            <div>
                {this.state.posts.map(post =>
                    <Link to={`/post/${post.key}`} className={'text-decoration-none text-dark'}>
                        <div className={'clickMe mb-3'} key={post.key} id={post.key}>
                            <div className="d-flex p-3 bg-white d2">
                                <div className={" "}>
                                    <h6 className="text-primary font-weight-bold br">{post.Brand}</h6>
                                    <h4 className="font-weight-bold pn">{post.ProductName}</h4>
                                    <p className="mb-2 mr-3 de text-justify">{post.Description}</p>
                                    <div className="d-flex">
                                        <p className="w-50 m-0 cat"><b>Category:</b> {post.Category}</p>
                                        <p className="w-50 m-0" id={'pltfm1'}><b>Platform:</b>{post.plat}</p>
                                    </div>
                                </div>
                                <img src={post.PostImageURL} height="130px" className="ml-auto m-3 pl-3"/>
                            </div>
                            <div className="d-flex px-4 py-2 bg-lightgrey">
                                <p className="my-auto ti text-black-50" id={'ppp'}>{post.CreatedOn}</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        );
    }
}

export default SponsorCard;