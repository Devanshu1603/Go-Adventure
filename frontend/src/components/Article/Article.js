import React from 'react';
import './Article.css';
import Hidden from '../images/Hidden.jpg';
import Temple from '../images/Temple.jpg';
import Hiking from '../images/Hike.jpg';
import Spring from '../images/Spring.jpg';
import Ski from '../images/Ski.jpg';
// import Couple from '../images/Couple.jpg';

const Article = () => {
  const articles = [
    {
      img: Temple,
      title: "Top Spring Destinations for Nature Enthusiasts",
      description: "Discover the most stunning destinations to visit during the spring season.",
      link: "#",
    },
    {
      img: Spring,
      title: "Top Spring Destinations for Nature Enthusiasts",
      description: "Discover the most stunning destinations to visit during the spring season.",
      link: "https://trailblazertours.com/top-10-nature-lovers-destinations/",
    },
    {
      img: Hidden,
      title: "5 Hidden Gems You Must Visit in 2023",
      description: "Discover offbeat destinations that offer unique experiences.",
      link: "https://www.tripadvisor.in/Attractions-g293860-Activities-zft12156-India.html",
    },
    {
      img: Hiking,
      title: "The Best Hiking Trails in the World",
      description: "Challenge yourself with the most breathtaking trails around the globe.",
      link: "https://www.outsideonline.com/adventure-travel/destinations/10-most-beautiful-hikes-world/",
    },
    {
      img: Ski,
      title: "Adventurous Ski Resorts You Must Visit",
      description: "Unleash your inner adventurer at these top ski destinations.",
      link: "https://www.sungod.co/en-ae/explore/snowsports/6-unique-ski-destinations-to-visit",
    },
    {
      img: Ski,
      title: "The Top Romantic Getaways for Couples",
      description: "Ideal destinations for a romantic escape, from serene beaches to cozy mountain retreats.",
      link: "https://www.makemytrip.com/tripideas/romantic-destinations",
    },
  ];

  // Double the articles to create a seamless loop
  const repeatedArticles = [...articles, ...articles];

  return (
    <section className="article-carousel">
      <h1>Travel Articles & Tips</h1>
      <div className="carousel-container">
        {repeatedArticles.map((article, index) => (
          <div className="article" key={index}>
            <img src={article.img} alt={article.title} />
            <div className="article-info">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.link} className="read-more">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Article;
