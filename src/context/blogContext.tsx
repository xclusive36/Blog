import { createContext, useState } from "react";

interface BlogInterface {
  id: string;
  title: string;
  subtitle: string;
  imageURL: string;
  imageAlt: string;
  date: string;
  slug: string;
  introduction: string;
  content: string;
}

const blogArray: BlogInterface[] = [
  {
    id: "1",
    title: "Card Title",
    subtitle: "Card Subtitle",
    imageURL: "https://ionicframework.com/docs/img/demos/card-media.png",
    imageAlt: "Silhouette of mountains",
    date: "2023-09-22",
    slug: "card-title",
    introduction: `Here's a small text description for the card content. Nothing more, nothing less.`,
    content: ``,
  },
  {
    id: "2",
    title: "Building a new Portfolio Website with Ionic Framework using React",
    subtitle: "Building a thing!",
    imageURL:
      "https://misfitgirl.com/wp-content/uploads/2023/09/pexels-photo-577585-1024x768.jpeg",
    imageAlt: "Silhouette of mountains",
    date: "2023-09-22",
    slug: "building-a-new-portfolio-website-with-ionic-framework-using-react",
    introduction: `Understandably, I'll need to break this up into multiple blog posts. I'm going to start with the front end utilizing [Ionic Framework](https://ionicframework.com/) with [React](https://react.dev/).
    I'm using [Ionic Framework](https://ionicframework.com/) because I'm familiar with it and I like the way it looks and functions. It's a beautifully constructed framework for building single page [Node.js](https://nodejs.org/) style cross platform web applications. It supports building applications such as [Android apps](https://play.google.com/), [iOS apps](https://www.apple.com/app-store/), [PWA apps](https://web.dev/progressive-web-apps/), and [Electron apps](https://www.electronjs.org/). I'm going to use it to build a
    [Front End web site](https://en.wikipedia.org/wiki/Front-end_web_development).`,
    content: `I'll hard code a [blog web page](/blog) with a few entrees.

Eventually i'll build a [MongoDB](https://www.mongodb.com/), [Express.js](https://expressjs.com/), [React](https://react.dev/), and [Node.js](https://nodejs.org/) [MERN](https://www.mongodb.com/mern-stack#:~:text=MERN%20stands%20for%20MongoDB%2C%20Express,a%20client%2Dside%20JavaScript%20framework) Backend server to support the blog with [GraphQL](https://graphql.org/) using [ApolloGraphQL server](https://www.apollographql.com/docs/apollo-server/) and then incorporate [ApolloGraphQL client](https://www.apollographql.com/docs/react/) into the front end. Ill then use the client pull data dynamically from the server with those tools.
    
[GraphQL](https://graphql.org/) is more efficient with reduced over-fetching and zero under-fetching compared to [Rest](https://restfulapi.net/). It works brilliantly to store [JSON](https://www.json.org/) data with [MongoDB](https://www.mongodb.com/) using [Mongoose.js](https://mongoosejs.com/) [Object Data Modeling software (ODM)](https://www.techopedia.com/definition/30736/object-data-model). Using [Express.js](https://expressjs.com/) as a server allows me to perfectly use the above in a simple secure server.
    
The server will use Authentication and pass header data from the client to the server by using [JSON Web Token. (JWT)](https://jwt.io/) Doing so will allow verification that the user is who they say they are. Giving Create, Read, Update, Delete [CRUD functionality](https://www.sumologic.com/glossary/crud/) without detriment.
    
The source code to this project will be available on [Github.com](https://github.com/) and I will provide a link to the repo. in each related blog.`,
  },
  {
    id: "3",
    title: "Welcome to my fresh new Tech Blog and Portfolio",
    subtitle: "Putting myself out there!",
    imageURL:
      "https://misfitgirl.com/wp-content/uploads/2023/09/pexels-photo-261579-1024x768.jpeg",
    imageAlt: "Silhouette of mountains",
    date: "2023-09-22",
    slug: "welcome-to-my-fresh-new-tech-blog-and-portfolio",
    introduction: `As the title says, this is my fresh new tech blog and portfolio. It's meant to be a portfolio for my projects and a blog for my thoughts and ideas. I hope to give you a chance to pick up a few tricks.

The blog will be [JavaScript](https://www.javascript.com/) centric with a heavy dose of [React](https://react.dev/) and some [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). The following blog post will be about progress putting this website together.`,
    content: `The [About me](/about) page gives a quick insight into who I am. Nothing special, it's pretty much an 'About me' page. I may add more detail to the page in the future. It's not really high on the priority list at the moment.

The [Github Repos](/projects) page pulls my data directly from [Github.com](https://github.com/) via their [API](https://docs.github.com/en/rest). I chose this instead a 'Project' page. It was quicker and easier, I figured each [Github](https://github.com/xclusive36) repo would speak for its self. The vast majority of the repos are my creation with a few forks. Quite a bit of the latter projects were from the Full Stack React Boot camp class I took from MSU. I graduated at the top of my class with full honors. Out of a total possible grade of 100% I received a grade of 102.95%.
    
The [Resume](/resume) page is a web version of my resume. Instead of laying it out as a resume, I ordered it in a grid pattern that would collapse as the screen gets smaller.
    
Feel free to reach out to me via the [contact](/contact) page. It's a simple web form that generates a mailto:.`,
  },
];

export const BlogContext = createContext({
  BlogArray: blogArray,
  setBlogArray: (data: BlogInterface[]) => {},
});

export const BlogProvider = ({ children }: any) => {
  const [BlogContextArray, setBlogContextArray] = useState(blogArray);

  const value = {
    BlogArray: BlogContextArray,
    setBlogArray: setBlogContextArray,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
