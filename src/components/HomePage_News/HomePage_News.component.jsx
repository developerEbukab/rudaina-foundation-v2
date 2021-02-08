import React, {useState, useEffect} from 'react';
import "./HomePage_News.styles.scss";
import firebase from "firebase";
import News from '../News/News.component';

const HomePage_News = () => {
  const [charityNews, setCharityNews] = useState(false);
  const [pregnancyNews, setPregnancyNews] = useState(false);
  const [relevantNews, setRelevantNews] = useState(false);
  const [selectedNews, setSelectedNews] =  useState(false);
  // const homepageNews = [charityNews.slice(-1).pop(), pregnancyNews.slice(-1).pop(), relevantNews.slice(-1).pop(),]
  // console.log("homepageNews", homepageNews)
  useEffect(() => {
    console.log("Homepage will mount")
    fetchNews();
  }, []);

  const fetchNews = () => {
    firebase.database().ref('news/relevant').on('value' , (data)=>{
        console.log("I am fetching relevant news", Object.values(data.toJSON()) )
        if(data.toJSON()){
          setRelevantNews(Object.values(data.toJSON()) )
        }
    })

    firebase.database().ref('news/pregnancy').on('value' , (data)=>{
        if(data.toJSON()){
          setPregnancyNews(Object.values(data.toJSON()))
        }
    })

    firebase.database().ref('news/charity').on('value' , (data)=>{
        if(data.toJSON()){
          setCharityNews( Object.values(data.toJSON()))
        }
    })
  }
  console.log("homepageNews HEREE", charityNews, pregnancyNews, relevantNews)
  return (
    <div className="HomePage_NewsContainer">
      <div>
        <h1 className="Title">See what we're up to</h1>
        {(charityNews && pregnancyNews && relevantNews) && <div className="NewsContainer">
          {[charityNews.slice(-1).pop(), pregnancyNews.slice(-1).pop(), relevantNews.slice(-1).pop()].map(({ title, author, imageUrl, description, createdAtDate, eventId, externalLink }) => 
          <div className="News HomeNews" style={{color: "black"}}>
            <div className={`${(selectedNews === eventId) ? "OverlayVisible" : "OverlayHidden"}`}>
              <h3 className="NewsTitle">{title}</h3>
              <p className="Description">{description}</p>
              <div className="Footer">
                <p><span className="Bold">Author : </span>{author}</p>
                <p><span className="Bold">Date Posted : </span>{createdAtDate}</p>
              </div>
              <div className="Link">
                <p onClick={()=>setSelectedNews(false)}  className="Close">Close</p>
                <a href={externalLink} target="__blank" className="Link">View More</a>
              </div>
            </div>
            <div className="Image">
              <img alt="" src={imageUrl} />
            </div>
            <div className="Details" style={{padding: ".3rem 1rem 1rem 1rem"}}>
              <div>
                <h3 className="NewsTitle">{title}</h3>
                <p>By, {author}</p>
              </div>
              <div className="Footer ">
                <p onClick={()=>setSelectedNews(eventId)} className="Link" style={{backgroundColor: "#FF0243", color: "white"}}>More Info</p>
                {/* <a onClick={()=>setSelectedNews(eventId)} href="http://www.google.com" target="__blank" className="Link">More Info</a> */}
              </div>
            </div>
          </div>
          )}
        </div>}
      </div>
    </div>
  );
};

export default HomePage_News;
