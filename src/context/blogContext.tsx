import { createContext, useState } from "react";
import MisfitGirl from "../assets/MisfitGirl.png";

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
  // {
  //   id: "1",
  //   title: "Card Title",
  //   subtitle: "Card Subtitle",
  //   imageURL: "https://ionicframework.com/docs/img/demos/card-media.png",
  //   imageAlt: "Silhouette of mountains",
  //   date: "2023-09-22",
  //   slug: "card-title",
  //   introduction: `Here's a small text description for the card content. Nothing more, nothing less.`,
  //   content: ``,
  // },
  {
    id: "4",
    title: "Calling all wax melt lovers, delicious scents you will love",
    subtitle: "Soy wax melts are a great way to add fragrance to your home",
    imageURL:
      "https://misfitgirl.com/wp-content/uploads/2023/10/Screen-Shot-2023-06-18-at-3.51.57-PM.png",
    imageAlt: "Screenshot of misfitgirl.com",
    date: "2023-10-08",
    slug: "calling-all-wax-melt-lovers-delicious-scents-you-will-love",
    introduction: `Handcrafted Soy wax melts are a great way to add fragrance to your home. If you're looking for a unique and special way to scent your home, then handcrafted wax melts from [Misfitgirl.com](https://misfitgirl.com/) are the perfect choice for you.

**What Are Handcrafted Wax Melts?**

Handcrafted wax melts are made by melting wax with essential oils. The mixture is then poured into molds and allowed to harden. Once the melts are hard, they can be broken into pieces and placed in a wax warmer. When the wax melts, the fragrance is released into the air.`,
    content: `**Why Choose Handcrafted Wax Melts from [Misfitgirl.com](https://misfitgirl.com/)?**

There are many reasons to choose handcrafted wax melts from Misfitgirl. Here are a few:

- They are made with high-quality ingredients. [Misfitgirl.com](https://misfitgirl.com/) uses only the finest essential oils and waxes to make her melts. This ensures that her melts are safe and effective.

- They are available in a wide variety of fragrances. Misfitgirl offers a wide variety of scents, so you can find the perfect one to match your taste.

- They are affordable. [Misfitgirl.com's](https://misfitgirl.com/) melts are priced competitively, so you can enjoy the benefits of handcrafted wax melts without breaking the bank.

- They are easy to use. Misfitgirl's melts are easy to use. Simply place them in a wax warmer and let the fragrance fill the air.

**How to Use Handcrafted Wax Melts**

Using handcrafted wax melts is easy. Simply place a few melts in a wax warmer and turn on the warmer. The wax will melt and the fragrance will be released into the air. You can use as many or as few melts as you like to create the desired level of fragrance.

Handcrafted wax melts are a great way to add fragrance to your home. They are also a fun and easy way to express your creativity. If you're looking for a unique and special way to scent your home, then handcrafted wax melts from [Misfitgirl.com](https://misfitgirl.com/) are the perfect choice for you.`,
  },
  {
    id: "3",
    title: "LiteStep was awesome back in the day",
    subtitle: "Day dreaming of 20+ years in the past",
    imageURL:
      "https://misfitgirl.com/wp-content/uploads/2023/10/1981.459.6-scaled.jpg",
    imageAlt: "Moon in space with no stars",
    date: "2023-10-06",
    slug: "litestep-was-awesome-back-in-the-day",
    introduction: `I am deviating in this post for a specific reason. I want to talk about some of the history of the [LiteStep application](http://lsdocs.shellfront.org/) that was so so popular back in the day. I'm sad to say that [it has gone](http://litestep.info/stateofthestep.php) the way of so many good apps that were aged out of existence. [Litestep.net](https://litestep.net/), [Litestep.com](https://litestep.com/), [Litestep.info](https://litestep.info/), [Shellfront.org](http://shellfront.org/), [Lsdev.org](http://lsdev.org/), and [so many other websites](http://lsdocs.shellfront.org/links.php) sat at the heart of the LiteStep world. They all were dedicated to and were central to the fan fair of [what was LiteStep](https://web.archive.org/web/20040730153615/http://www.litestep.com/). LiteStep was featured multiple times on [Tech TV (G4)](https://en.wikipedia.org/wiki/Talk%3ALiteStep) and had a very large following.`,
    content: `LiteStep was and still is to some extent a full desktop replacement for [Windows](https://www.microsoft.com/en-us/windows). It is a program that replaces the Explorer desktop. Desktop screen, Taskbar, Icons, and Start Menu. I'm just going to say "it is." I will jump back and forth between "is, and was"  It is a fully customizable script based application designed to give you full control on how your Windows desktop screen looks and functions. It had quite a few plug-ins, many themes, It was epic. It was awesome! You should still be able to find themes online.

**History copied directly from [Wikipedia](https://en.wikipedia.org/wiki/LiteStep):**

LiteStep was inspired by [AfterStep](https://en.wikipedia.org/wiki/AfterStep), which in turn was inspired by [NeXTSTEP](https://en.wikipedia.org/wiki/NeXTSTEP). LiteStep was initially developed by Francis Gastellu as a closed-source project until April 1998 (version b23), and was then entirely rewritten (versions 24 and up). LiteStep later inspired [DarkStep](https://www.wired.com/2000/10/skins/), which supports scripting, and PureLS. LiteStep also inspired Phil Stopford in 1999 to start [LDE(X)](https://web.archive.org/web/20050128132206/http://ldex.terica.net/), which was a complete and production-stable LiteStep-based [Windows](https://en.wikipedia.org/wiki/Microsoft_Windows) interface replacement. LiteStep is one of the oldest remaining Windows shell replacements.

Over time, and due to the rise of popularity in freeform [skinning](https://en.wikipedia.org/wiki/Skin_(computing)), LiteStep desktop designs have tended to drift away from the [AfterStep](https://en.wikipedia.org/wiki/AfterStep) layouts seen under pre-0.24 versions, and LiteStep theming has become an art form in itself, being referred to as an "OS equivalent of an expandable Leatherman multi-tool".

Please read up on the history of LiteStep through your favorite search engine and Wikipedia. I'm sad I stepped away back in 2004 for personal reasons. Being at the helm of Litestep.com around the turn of the century at the height of LiteSteps popularity was an amazing experience. I had No contributions the the LiteStep application programmatically. I just ran Litestep.com with branches of LSSkins.com and LSHelp.com`,
  },
  {
    id: "2",
    title: "Building a new Portfolio Website with Ionic Framework using React",
    subtitle: "Building a thing!",
    imageURL:
      "https://misfitgirl.com/wp-content/uploads/2023/09/pexels-photo-577585-1024x768.jpeg",
    imageAlt: "Blurred computer screen with code",
    date: "2023-09-22",
    slug: "building-a-new-portfolio-website-with-ionic-framework-using-react",
    introduction: `Understandably, I'll need to break this up into multiple blog posts. I'm going to start with the front end utilizing [Ionic Framework](https://ionicframework.com/) with [React](https://react.dev/).
    I'm using [Ionic Framework](https://ionicframework.com/) because I beleve it's the best tool for the job. I'm familiar with it and I like the way it looks and functions. It's a beautifully constructed framework for building single page [Node.js](https://nodejs.org/) style cross platform web applications. It supports building applications such as [Android apps](https://play.google.com/), [iOS apps](https://www.apple.com/app-store/), [PWA apps](https://web.dev/progressive-web-apps/), and [Electron apps](https://www.electronjs.org/). I'm going to use it to build the
    [Front End](https://en.wikipedia.org/wiki/Front-end_web_development) of a full stack application.`,
    content: `Before I build the back end and pull dynamic data, I'll need to hard code a [blog web page](/blog) with a few entrees. This being the second blog entree.

Eventually i'll build a [MongoDB](https://www.mongodb.com/), [Express.js](https://expressjs.com/), [React](https://react.dev/), and [Node.js](https://nodejs.org/) [MERN](https://www.mongodb.com/mern-stack#:~:text=MERN%20stands%20for%20MongoDB%2C%20Express,a%20client%2Dside%20JavaScript%20framework) Backend server. The back end will be supported with [GraphQL](https://graphql.org/) using [ApolloGraphQL server](https://www.apollographql.com/docs/apollo-server/). I'll then incorporate [ApolloGraphQL client](https://www.apollographql.com/docs/react/) into the front end. Then front end will be able to pull data dynamically from the server with those tools.
    
[GraphQL](https://graphql.org/) is more efficient with reduced over-fetching and zero under-fetching compared to [Rest](https://restfulapi.net/). It works brilliantly to store [JSON](https://www.json.org/) data with [MongoDB](https://www.mongodb.com/) using [Mongoose.js](https://mongoosejs.com/) [Object Data Modeling software (ODM)](https://www.techopedia.com/definition/30736/object-data-model). Using [Express.js](https://expressjs.com/) as a server allows me to perfectly use the above in a simple secure server.
    
The server will use Authentication and pass header data from the client to the server by using [JSON Web Token. (JWT)](https://jwt.io/) An administrator account will be created. Create, Read, Update, Delete [CRUD functionality](https://www.sumologic.com/glossary/crud/) will be added. Server data modification with Crud will be granted to the administrator account only. The client will be able to read the data presented.
    
The source code to this project is available at [Github.com](https://github.com/xclusive36/Blog). I will provide a link to the repo. in each related blog.`,
  },
  {
    id: "1",
    title: "Welcome to my fresh new Tech Blog and Portfolio",
    subtitle: "Putting myself out there!",
    imageURL:
      "https://misfitgirl.com/wp-content/uploads/2023/09/pexels-photo-261579-1024x768.jpeg",
    imageAlt: "Notepad and book with pen on a desk",
    date: "2023-09-22",
    slug: "welcome-to-my-fresh-new-tech-blog-and-portfolio",
    introduction: `As the title says, this is my fresh new tech blog and portfolio. It's meant to be a portfolio for my projects and a blog for my thoughts and ideas. I hope to give you a chance to pick up a few tricks.

The blog will be [JavaScript](https://www.javascript.com/) centric with a heavy dose of [React](https://react.dev/) and some [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). The following blog post will be about progress putting this website together.`,
    content: `The [About me](/about) page gives a quick insight into who I am. Nothing special, it's pretty much an 'About me' page. I may add more detail to the page in the future. It's not really high on the priority list at the moment.

The [Github Repos](/projects) page pulls my data directly from [Github.com](https://github.com/) via their [API](https://docs.github.com/en/rest). I chose this instead a 'Project' page. It was quicker and easier, I figured each [Github](https://github.com/xclusive36) repo would speak for its self. The vast majority of the repos are my creation with a few forks. Quite a bit of the projects were from the Full Stack React Boot camp class I took from MSU. I graduated at the top of my class. I'm proud of that.
    
The [Resume](/resume) page is a web version of my resume. Instead of laying it out as a resume, I ordered it in a grid pattern that would collapse as the screen gets smaller.
    
Feel free to reach out to me via the [contact](/contact) page. You can also find me on [LinkedIn](https://www.linkedin.com/in/joshua-cavell/), [Github](https://github.com/xclusive36), and [Twitter](https://twitter.com/xclusive36).

Have a great day!`,
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
