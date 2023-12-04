import { createContext, useState } from "react";
import PropTypes from "prop-types";

const blogArray = [
  // {
  //   id: "",
  //   userID: "",
  //   title: "",
  //   subtitle: "",
  //   imageURL: "",
  //   imageAlt: "",
  //   date: "2023-09-22",
  //   slug: "",
  //   introduction: ``,
  //   content: ``,
  // },
  {
    id: "8",
    userID: "1",
    title: "Create a few new basic React components and use them!",
    subtitle: "Let's start by creating a component folder, a new component jsx file and an accompanying css file",
    imageURL:
      "https://misfitgirl.com/wp-content/uploads/2023/11/pexels-photo-1181271.jpeg",
    imageAlt:
      "Sun glare on a laptop screen with code displayed in the foreground",
    date: "2023-10-25",
    slug: "create-a-few-new-basic-react-components-and-use-them",
    introduction: `Lets start by changing the ./src/App.jsx to the following:

    import "./App.css";

    function App() {
      return (
        <div className="home-container">
          <h1>Hello World</h1>
        </div>
      );
    }

    export default App;`,
    content: `Yes, just wipe out the entire contents of the App.jsx file and replace it with the above.
    
Now let's start by creating a component folder, a new component jsx file and an accompanying css file.

Now create a new 'components' folder inside the src folder.

    mkdir ./src/components

Inside the newly created components folder, create 2 files. The first will be the React file of our new component, the second the css file for this component.

    touch ./src/components/Header.component.jsx
    touch ./src/components/Header.styles.css

Open the ./src/components/Header.component.jsx file and add the following:

    import "./Header.styles.css";

    function HeaderComponent() {
      return (
        <div className="header-container">
          <h1>Hello World</h1>
        </div>
      );
    }

    export default HeaderComponent;

At the top we import our css file, We declare our component as a function, inside that function we return a div container that says "Hello World!" thats wrapped in a H1. At the bottom We export the component so it can be used in another file.

The code we just added is a default template for any new component. Feel free to use it for any new component you wish to add. Modify it for your needs. I'm not going to get into a discussion between class based and function based components. React supports both, we are defaulting to functional components.

Now that we have created a new header component, lets add it to our App.jsx file. Open the ./src/App.jsx file. At the very top of the file, add the following:

    import HeaderComponent from "./components/Header.component";

This line tells App.jsx to import the HeaderComponent file from the components folder. Once it's been imported, Lets use it inside App.jsx. Just above the H1 add <HeaderComponent /> so it looks like this:

    import HeaderComponent from "./components/Header.component";

    import "./App.css";

    function App() {
      return (
        <div className="home-container">
          <HeaderComponent />
          <h1>Hello World</h1>
        </div>
      );
    }

    export default App;

That's all there is to adding a new component! Lets do it again for a Footer component. :)

Inside the components folder, create 2 new files.

    touch ./src/components/Footer.component.jsx
    touch ./src/components/Footer.styles.css

Open the ./src/components/Footer.component.jsx file and add the following:

    import "./Footer.styles.css";

    function FooterComponent() {
      return (
        <div className="footer-container">
          <h1>Hello World</h1>
        </div>
      );
    }

    export default FooterComponent;

Now that we have created a new footer component, lets add it also to our App.jsx file. Open the ./src/App.jsx file. At the very top of the file, Just under the import for the HeaderComponent add the following:

    import FooterComponent from "./components/Footer.component";

Once it's been imported, Lets use it inside App.jsx. Just below the H1 add <FooterComponent /> so it looks like this:

    import HeaderComponent from "./components/Header.component";
    import FooterComponent from "./components/Footer.component";

    import "./App.css";

    function App() {
      return (
        <div className="home-container">
          <HeaderComponent />
          <h1>Hello World</h1>
          <FooterComponent />
        </div>
      );
    }

    export default App;

You should be able to view the new additions in your app. If your app isn't running, start it now by running:

    npm run dev

It's not a big addition in terms of looks but that'll be changed in a new post. Think about all of the cool little (and big) things you can add in.

Why would you create new components instead of just adding to the main file? Multiple reasons. The first and biggest is reusability. Once you create a component, you can import it into any other file. Not only that, it can be reused many times over. Lets say you create a button component. You can reuse that button 2, 3, 1000 times or more throughout your Application. Even on the same page. Another reason would be compartmentalization. Once the component has been created and imported throughout your application. Lets say you want to make a change to that component, all you will need to do is edit that component file directly. Once saved, any changes will immediately be reflected throughout your application where ever the component has been used.

We'll add a bit more detail in those components in the next post.
    
[Source code](https://github.com/xclusive36/Blog/)`,
  },
  {
    id: "7",
    userID: "1",
    title: "Focus on the simplistic structure of a component",
    subtitle: "What is a src folder?",
    imageURL:
      "https://misfitgirl.com/wp-content/uploads/2023/10/pexels-photo-11035471.jpeg",
    imageAlt:
      "Blurred background with the React logo displayed in the foreground",
    date: "2023-10-25",
    slug: "focus-on-the-simplistic-structure-of-a-component",
    introduction: `Src is short hand for source, it is the primary development folder. Our front end web application will be constructed inside of this folder. Lets break down our starter application src folder.`,
    content: `Before we dive into the src folder, In the root of our application open up the index.html file. When our application starts to run, the first file that loads is the index.html file. Through this web page file our web app is given life.

    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.jsx"></script>
    </body>

As you can see above, the HTML is limited. Inside the div with the id of root will be injected with our application, this will be done automatically with the magic and awesome power of [Javascript](https://www.javascript.com/)! The script on the next line loads the Main.jsx source file to run our application. We shoudn't need to modify this file. You may modify it if you need to add fonts or extra css or extra javascript as needed.

**Open the src/Main.jsx file.**

    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App.jsx'
    import './index.css'

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )

Looking at the contents of the src/Main.jsx file we see a [Javascript](https://www.javascript.com/) file that loads and sets our application to use React. It renders our application into the index.html div with the id of root. What it renders is the App component from the App.jsx file. It also loads the index.css file.

**Open the src/App.jsx file.**

    import { useState } from 'react'
    import reactLogo from './assets/react.svg'
    import viteLogo from '/vite.svg'
    import './App.css'

    function App() {
      const [count, setCount] = useState(0)

      return (
        <>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>
      )
    }

    export default App

This is our first [React component](https://www.w3schools.com/react/react_components.asp) file. All a [React application](https://react.dev/learn/start-a-new-react-project) is, is a series of components. A component is a piece of an application. This component sets what new component should to be displayed based on the route. i.e. [litestep.com/](https://litestep.com/), [litestep.com/home/](https://litestep.com/home/), [litestep.com/about/](https://litestep.com/about/), etc..

We'll get to set up new pages and routing in future blog post. For now, we'll focus on the App.jsx.

This is our First component. Inside the App component [Javascript](https://www.javascript.com/) function we see it returns a structure that resembles the body of an Html file. This is the structure of a [react component](https://react.dev/learn/your-first-component). It is not [HTML](https://www.w3schools.com/html/html_examples.asp), but a bunch of [React components](https://react.dev/reference/react/Component). It is designed to resemble [HTML](https://www.freecodecamp.org/news/what-is-html-definition-and-meaning/).

    import { useState } from 'react'
    import reactLogo from './assets/react.svg'
    import viteLogo from '/vite.svg'
    import './App.css'

    function App() {

At the top, we import a few things, the useState Hook from React, a couple of svg images and a css file called App.css. After, we see a new JavaScript function called App.

    const [count, setCount] = useState(0)

Inside the App function, we see a line that sets up the useState React hook. This line creates 2 variables. "count", and "setCount". "count" being the variable used in our application, "setCount" being the function that sets the value of "count" to the [state](https://www.w3schools.com/react/react_state.asp).

      return (
        <>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>
      )

After that, we see a return call. Inside this return we see our JSX sudo HTML. This "sudo HTML" (HTML tags in JSX form) is the content that will be displayed to the browser.

    }

    export default App

At the very bottom of the file, we see the export default App. This is the line that exports the App component to be used in other files. This is the line that allows us to import the App component into the Main.jsx file.

For reference, each [Ionic Framework component](https://ionicframework.com/docs/components has been pre-configured. See the [Ionic Framework](https://ionicframework.com/) website to see the documentation on each of their components and how to use them. We will be using them in future blog posts.

Each component can contain components inside or be wrapped inside another component. [React](https://react.dev/) is just one big giant mess of components. Each part of a webpage can be broken down into smaller components. For example, a [Form component](https://www.freecodecamp.org/news/how-to-build-forms-in-react/) can have section components, each with It's own description component and input component or button component. The cool thing is, each component can be reused. A button component can also be reused elsewhere. Not being limited to a form component.

Ultimately, React applications are built by building [smaller components for reuse](https://www.sitepoint.com/creating-reusable-react-components/).

In the next blog, we will create some components!`,
  },
  {
    id: "6",
    userID: "1",
    title: "Breaking down the application file structure a wee bit",
    subtitle:
      "The folder structure of a new Vite application is very simple and easy to understand",
    imageURL:
      "https://misfitgirl.com/wp-content/uploads/2023/10/pexels-photo-943096.jpeg",
    imageAlt: "Computer screen with code",
    date: "2023-10-14",
    slug: "breaking-down-the-application-file-structure-a-wee-bit",
    introduction: `When you open a new [Vite React application with Typescript](https://stackblitz.com/edit/vitejs-vite-vfa17b?file=index.html&terminal=dev) in VSCode by running the command in the terminal:
    
\`code .\`

On the left, you initially see a set of files and folders. These are the files and folders that make up the source code of your new application. [Vite](https://vitejs.dev/) has preconfigured and set this folder structure this way to optimize its compilation during a build.`,
    content: `Lets focus on a couple of files briefly, the file vite.config.ts is the primary config file for [Vite](https://vitejs.dev/). It defines the type of environment the application will use. In our case [React](https://react.dev/). The file tsconfig.json is the primary compiler configuration file. It specifies the root files and options required to compile the project. We shouldn't need to make any modifications to these files.
    
The package.json file is a the primary document that stores information about the project. It stores the meta data of the project such as the name, version, scripts, dependencies, and a license. It is stored in [JSON data format](https://www.w3schools.com/js/js_json_intro.asp). This file will be modified by us both directly and indirectly. Its paired file the package-lock. json is a file that is automatically generated by [NPM](https://www.npmjs.com/) when a package is installed. It records the exact version of every installed dependency, including its sub-dependencies and their versions. We will not be modifying this file directly, only indirectly. Specifically when we add a new [NPM](https://www.npmjs.com/) package to our project, the package-lock.json gets updated accordingly.
    
The folders: The node_modules folder is folder created by [NPM](https://www.npmjs.com/) to store all of the NPM packages that are necessary for the project to function. We can leave this folder alone. Feel free to browse it. It's a rather large folder and will take up the bulk of the size of our project source code. It can get a few gigs in size or larger in very detailed projects.

The public folder contains a couple of files. The favicon.png and the manifest.json. The favicon is the image that sets in the tab at the very top of the browser. It's a very small image. Feel free to replace it with your own favicon image. The manifest.json is another json file that contains data about your compiled application.

Our working folder will be the src folder.

I'll continue by breaking down the src folder in the next post.

[Source code](https://github.com/xclusive36/Blog/)`,
  },
  {
    id: "5",
    userID: "1",
    title: "Starting out with a new project, a new blog, and a new portfolio",
    subtitle:
      "Beginning Tutorial on how to create a new Ionic Framework React application with Typescript using Node.js",
    imageURL:
      "https://misfitgirl.com/wp-content/uploads/2023/10/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHgxMTA1NzYtaW1hZ2Uta3d2eTRhdnIta3d2eW54OGQuanBn.jpg",
    imageAlt: "Computer screen with code",
    date: "2023-10-08",
    slug: "starting-out-with-a-new-project-a-new-blog-and-a-new-portfolio",
    introduction: `Before getting involved with the creation of the backend of this website, I want to describe the creation of the front end. Steps I took so you can build your own website.
    
In its current state, the front end is incomplete. Not only is it waiting for a backend, more features will be added. We'll get into that in a future post. I am going to assume you have an understanding on how to use a command line interface or terminal interface.`,
    content: `On your computer, if you have not installed Node.js, Please do so now. The LTS version is the version I am using. Once installed, verify that it is working and can be used in a terminal application of your choice. For reference, I am on a Macintosh computer and use Warp as my terminal app.

Node, or [Node.js](https://nodejs.org/), is an open-source, cross-platform runtime environment for executing [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) code. It allows developers to create server-side tools and applications in [JavaScript](https://www.javascript.com/). [Node](https://www.w3schools.com/nodejs/nodejs_intro.asp) is used extensively for [server-side programming](https://developer.mozilla.org/en-US/docs/Learn/Server-side).
    
On your computer, pick a location, any location you want to create your web application. I on a Mac create my applications in my /home/user folder. If I was on windows, I would use my c:\\ drive folder.
    
In your terminal application, navigate to that folder. Since I'm using [Ionic Framework](https://ionicframework.com/), lets get it installed.

We are going to deviate from a typical [Ionic Framework project](https://ionicframework.com/docs/intro/cli). Under normal circumstances we would run the command “ionic start” command to begin the creation of an Ionic project. We&#39;re not going to do this here. We will manually create a new project with [Vite](https://vitejs.dev/) and then include [Ionic](https://ionicframework.com/docs/intro/cdn) to the new [Vite project](https://vitejs.dev/guide/).
    
Run the command to create a new Vite project:

\`npm create vite@latest\`
    
The new Vite application install will ask you a few questions. The first being "Project Name?" I just typed in "Blog".
    
The second question asks what Framework you would like to use? Vanilla, React, or Vue, etc. This project is a React project.
    
The third question asks for a variant of React. TypeScript, TypeScript + SWC, JavaScript, or JavaScript + SWC. I chose plain old JavaScript for this project.
    
Once the application has been created, navigate into the folder of the newly created application. Since I called my application Blog, I will navigate into the Blog folder.
    
\`cd Blog\`

Then run the command

\`npm install\`
    
On your computer If you do not have [Visual Studio Code](https://code.visualstudio.com/) installed or a similar code editor application like [Sublime Text](https://www.sublimetext.com/) installed, please install one now. You will need it for the next steps. For reference, I am using VSCode.
    
Once VSCode or a similar application has been installed, open it. Once open, open up the command pallet by pressing these combination of keys. (These will only work for VSCode.)
    
**Windows:** Control-Shift-P
    
**Mac:** Command-Shift-P
    
Type 'command' and then select the first option "install 'code' command in PATH.
    
If for some reason you type something else and it disappears, exit the search and then rerun the combo of keys and then type 'command' again.
    
Once the code command has been installed into the PATH, you can from your terminal open any applications from their folder.
    
In the terminal, in your application folder, mine being Blog. Run the following command to open your app project in VSCode.
    
\`code .\`
    
the dot at the end of 'code .' tells VSCode that you want to open the current folder as a project.
    
Once open, on the left you will see a few files and folders. The source code for our project will be built in the 'src' folder.
    
Thats enough for VSCode for now. We'll get started with it for real in the next blog post.

As of writing this project, the npm package [@ionic/react-router](https://www.npmjs.com/package/@ionic/react-router) is version 7.0.0. The npm package [react-router-dom](https://www.npmjs.com/package/react-router-dom) needs to be version 5.2.0 or higher. The current version is 6.0.2. The two packages are not compatible. We will need to install the correct version of react-router-dom. In the terminal, run the following command.

\`npm install react-router-dom@5.3.4\`

and then run the following command to install @ionic/react-router.

\`npm install @ionic/react-router@7.0.0\`

Then we'll finish up by installing the npm package [@ionic/react](https://www.npmjs.com/package/@ionic/react)

\`npm install @ionic/react\`
    
Lets run our application.
    
In the terminal, run the following command.
    
\`npm run dev\`
    
Your web browser should open and load your brand new project. It's not much but it's a start.
    
to close the server in the terminal, press the key combination
    
**Windows:** Control-C
    
**Mac:** Command-C
    
Thanks for following along. I'll see you in the next blog.
    
[Source code](https://github.com/xclusive36/Blog/)`,
  },
  {
    id: "4",
    userID: "1",
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
    userID: "1",
    title:
      "The past history of the LiteStep application and its community of users and developers",
    subtitle:
      "LiteStep was and still is to some extent a full desktop replacement for Windows",
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

Please read up on the history of LiteStep through your favorite search engine and Wikipedia. I'm sad I stepped away back in 2004 for personal reasons. Being at the helm of Litestep.com around the turn of the century at the height of LiteSteps popularity was an amazing experience. I want to state that I had No contributions to the LiteStep application programmatically. I just ran Litestep.com, LSSkins.com and LSHelp.com`,
  },
  {
    id: "2",
    userID: "1",
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
    userID: "1",
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
  // eslint-disable-next-line no-unused-vars
  setBlogArray: (data) => {},
});

export const BlogProvider = ({ children }) => {
  const [BlogContextArray, setBlogContextArray] = useState(blogArray);

  const value = {
    BlogArray: BlogContextArray,
    setBlogArray: setBlogContextArray,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
