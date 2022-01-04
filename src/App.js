import "./app.css";
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./component/Loading";
function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAll = async () => {
    try {
      const API_URL = "http://localhost:5000/tweets";
      const res = await axios.get(API_URL);

      console.log(res.data);
      setTweets(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("ops!");
    }
  };
  useEffect(() => {
    setLoading(true);

    getAll();
    setLoading(false);
  }, []);

  const form = document.querySelector("form");
  const submitTweet = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const content = formData.get("content");
    const tweet = {
      name,
      content,
    };
    console.log("submitted");
    try {
      const API_URL = "http://localhost:5000/tweets";
      const res = await axios.post(API_URL, tweet);
      toast.success("nice!, thanks for posting");
      console.log(res.data);
      form.reset();
      getAll();
    } catch (err) {
      console.log(err);
      toast.error("ops!");
    }

    // res.data.sort((p1, p2) => {
    //   return new Date(p2.createdAt) - new Date(p1.createdAt);
    // });
  };
  return (
    <>
      <div className="container">
        <header style={{ textAlign: "center" }} className="title">
          Crappy Twitter
        </header>
        <main>
          <form onSubmit={submitTweet} className="tweet-form">
            <label htmlFor="name">Name</label>
            <input className="u-full-width" type="text" name="name" />
            <label htmlFor="content">Content</label>
            <textarea
              className="u-full-width"
              type="text"
              name="content"
              id="content"
            ></textarea>
            <button
              style={{
                backgroundColor: "gray",
                border: "none",
              }}
              className="button-primary"
            >
              Sent Your Post
            </button>
          </form>
          {loading ? <Loading /> : ""}
          <div className="all-tweets">
            {tweets.map((tweet) => (
              <>
                <div style={{ marginTop: "10px" }} className="container">
                  <h3
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      color: "purple",
                      opacity: "50%",
                    }}
                  >
                    {tweet.name}
                  </h3>
                  <p
                    style={{
                      textAlign: "left",
                      fontSize: "19px",
                      color: "purple",
                    }}
                  >
                    {tweet.content}
                  </p>
                  <small
                    style={{
                      fontSize: "10px",
                      color: "gray",
                      marginTop: "25px",
                    }}
                  >
                    you posted {format(tweet.createdAt)}
                  </small>
                </div>
              </>
            ))}
          </div>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <ToastContainer />
      </div>
    </>
  );
}

export default App;
