const HeroComponent = () => {
  return (
    <div
      style={{
        // height: "25rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto auto",
          maxWidth: "35rem",
          padding: "1rem",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>
          A Full-Stack Developer, UX Designer
        </h1>
        <p>
          I got you covered with the best of both worlds when it comes to web
          development and design. Introducing you to the world of web
          development and design, I am a full-stack developer and UX designer.
        </p>
        <h2>Lets MacGyver something..</h2>
      </div>
    </div>
  );
};

export default HeroComponent;
