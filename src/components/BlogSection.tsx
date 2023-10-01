import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import BlogItem from "./BlogItem";

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

const BlogSection = () => {
  const blogArray: BlogInterface[] = [
    {
      id: "1",
      title: "Card Title",
      subtitle: "Card Subtitle",
      imageURL: "https://ionicframework.com/docs/img/demos/card-media.png",
      imageAlt: "Silhouette of mountains",
      date: "2021-09-22",
      slug: "card-title",
      introduction: `Here's a small text description for the card content. Nothing more, nothing less.`,
      content: ``,
    },
    {
      id: "2",
      title:
        "Building a new Portfolio Website with Ionic Framework using React",
      subtitle: "Building a thing!",
      imageURL:
        "https://misfitgirl.com/wp-content/uploads/2023/09/pexels-photo-577585-1024x768.jpeg",
      imageAlt: "Silhouette of mountains",
      date: "2021-09-22",
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
      date: "2021-09-22",
      slug: "welcome-to-my-fresh-new-tech-blog-and-portfolio",
      introduction: `As the title says, this is my fresh new tech blog and portfolio. It's meant to be a portfolio for my projects and a blog for my thoughts and ideas. I hope to give you a chance to pick up a few tricks.
      
      The [blog](/blog) will be [JavaScript](https://www.javascript.com/) centric with a heavy dose of [React](https://react.dev/) and some [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). The following blog post will be about progress putting this website together.`,
      content: `The [About me](/about) page gives a quick insight into who I am. Nothing special, it's pretty much an 'About me' page. I may add more detail to the page in the future. It's not really high on the priority list at the moment.
      
      The [Github Repos](/projects) page pulls my data directly from [Github.com](https://github.com/) via their [API](https://docs.github.com/en/rest). I chose this instead a 'Project' page. It was quicker and easier, I figured each [Github](https://github.com/xclusive36) repo would speak for its self. The vast majority of the repos are my creation with a few forks. Quite a bit of the latter projects were from the Full Stack React Boot camp class I took from MSU. I graduated at the top of my class with full honors. Out of a total possible grade of 100% I received a grade of 102.95%.
      
      The [Resume](/resume) page is a web version of my resume. Instead of laying it out as a resume, I ordered it in a grid pattern that would collapse as the screen gets smaller.
      
      Feel free to reach out to me via the [contact](/contact) page. It's a simple web form that generates a mailto:.`,
    },
  ];

  return (
    <IonGrid>
      <IonRow>
        {blogArray.map((blog) => (
          <IonCol sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12" key={blog.id}>
            <BlogItem blog={blog} showContent={false} />
          </IonCol>
        ))}
        <IonCol sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12">
          <IonCard>
            <img
              alt="Silhouette of mountains"
              src="https://misfitgirl.com/wp-content/uploads/2023/09/pexels-photo-577585-1024x768.jpeg"
            />
            <IonCardHeader>
              <IonCardTitle>
                Building a new Portfolio Website with Ionic Framework using
                React
              </IonCardTitle>
              <IonCardSubtitle>Building a thing!</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <p>
                Understandably, I'll need to break this up into multiple blog
                posts. I'm going to start with the front end utilizing{" "}
                <a href="https://ionicframework.com/">Ionic Framework</a> with .
                I'm using{" "}
                <a href="https://ionicframework.com/">Ionic Framework</a>{" "}
                because I'm familiar with it and I like the way it looks and
                functions. It's a beautifully constructed framework for building
                single page
                <a href="https://nodejs.org/">Node.js</a> style cross platform
                web applications. It supports building applications such as{" "}
                <a href="https://play.google.com/">Android apps</a>,{" "}
                <a href="https://www.apple.com/app-store/">iOS apps</a>,{" "}
                <a href="https://web.dev/progressive-web-apps/">PWA apps</a>,
                and
                <a href="https://www.electronjs.org/">Electron apps</a>. I'm
                going to use it to build a{" "}
                <a href="https://en.wikipedia.org/wiki/Front-end_web_development">
                  Front End web site
                </a>
                .
              </p>
              <p>
                I'll hard code a <a href="/">blog web page</a> with a few
                entrees.
              </p>
              <p>
                Eventually i'll build a{" "}
                <a href="https://www.mongodb.com/">MongoDB</a>,{" "}
                <a href="https://expressjs.com/">Express.js</a>,{" "}
                <a href="https://react.dev/">React</a>, and{" "}
                <a href="https://nodejs.org/">Node.js</a>{" "}
                <a href="https://www.mongodb.com/mern-stack#:~:text=MERN%20stands%20for%20MongoDB%2C%20Express,a%20client%2Dside%20JavaScript%20framework">
                  (MERN)
                </a>
                Backend server to support the blog with{" "}
                <a href="https://graphql.org/">GraphQL</a> using
                <a href="https://www.apollographql.com/docs/apollo-server/">
                  ApolloGraphQL server
                </a>{" "}
                and then incorporate{" "}
                <a href="https://www.apollographql.com/docs/react/">
                  ApolloGraphQL client
                </a>
                into the front end. Ill then use the client pull data
                dynamically from the server with those tools.
              </p>
              <p>
                <a href="https://graphql.org/">GraphQL</a> is more efficient
                with reduced over-fetching and zero under-fetching compared to
                <a href="https://restfulapi.net/">Rest</a>. It works brilliantly
                to store <a href="https://www.json.org/">JSON</a> data with{" "}
                <a href="https://www.mongodb.com/">MongoDB</a> using{" "}
                <a href="https://mongoosejs.com/">Mongoose.js</a>
                <a href="https://www.techopedia.com/definition/30736/object-data-model">
                  Object Data Modeling software (ODM)
                </a>
                . Using <a href="https://expressjs.com/">Express.js</a> as a
                server allows me to perfectly use the above in a simple secure
                server.
              </p>
              <p>
                The server will use Authentication and pass header data from the
                client to the server by using{" "}
                <a href="https://jwt.io/">JSON Web Token. (JWT)</a> Doing so
                will allow verification that the user is who they say they are.
                Giving Create, Read, Update, Delete{" "}
                <a href="https://www.sumologic.com/glossary/crud/">
                  (CRUD) functionality
                </a>{" "}
                without detriment.
              </p>
              <p>
                The source code to this project will be available on{" "}
                <a href="https://github.com/">Github.com</a>
                and I will provide a link to the repo. in each related blog.
              </p>
            </IonCardContent>
          </IonCard>
        </IonCol>
        <IonCol sizeLg="4" sizeMd="6" sizeSm="12" sizeXs="12">
          <IonCard>
            <img
              alt="Silhouette of mountains"
              src="https://misfitgirl.com/wp-content/uploads/2023/09/pexels-photo-261579-1024x768.jpeg"
            />
            <IonCardHeader>
              <IonCardTitle>
                Welcome to my fresh new Tech Blog and Portfolio
              </IonCardTitle>
              <IonCardSubtitle>Putting myself out there!</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <p>
                As the title says, this is my fresh new tech blog and portfolio.
                It's meant to be a portfolio for my projects and a blog for my
                thoughts and ideas. I hope to give you a chance to pick up a few
                tricks.
              </p>
              <p>
                The <a href="/blog">blog</a> will be{" "}
                <a href="https://www.javascript.com/">JavaScript</a> centric
                with a heavy dose of <a href="https://react.dev/">React</a> and
                some
                <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
                  CSS
                </a>
                . The following blog post will be about progress putting this
                website together.
              </p>
              <p>
                The <a href="/about">About me</a> page gives a quick insight
                into who I am. Nothing special, it's pretty much an 'About me'
                page. I may add more detail to the page in the future. It's not
                really high on the priority list at the moment.
              </p>
              <p>
                The <a href="/projects">Github Repos</a> page pulls my data
                directly from <a href="https://github.com/">Github.com</a> via
                their <a href="https://docs.github.com/en/rest">API</a>. I chose
                this instead a 'Project' page. It was quicker and easier, I
                figured each <a href="https://github.com/xclusive36">Github</a>
                repo would speak for its self. The vast majority of the repos
                are my creation with a few forks. Quite a bit of the latter
                projects were from the Full Stack React Boot camp class I took
                from MSU. I graduated at the top of my class with full honors.
                Out of a total possible grade of 100% I received a grade of
                102.95%.
              </p>
              <p>
                The <a href="/resume">Resume</a> page is a web version of my
                resume. Instead of laying it out as a resume, I ordered it in a
                grid pattern that would collapse as the screen gets smaller.
              </p>
              <p>
                Feel free to reach out to me via the{" "}
                <a href="/contact">contact</a> page. It's a simple web form that
                generates a mailto:.
              </p>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default BlogSection;
