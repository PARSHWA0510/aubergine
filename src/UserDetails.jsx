import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
const UserDetails = () => {
  const [user, setUser] = useState(null);
  const userRef = useRef();
  const params = useParams();
  useEffect(() => {
    fetchUser(params.id);
    fetchUser(params.id);
  }, [params.id]);

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`);
      const data = await response.json();
      console.log(data);
      setUser(data.data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };
  const handleDownload = () => {
    const userElement = userRef.current;
    const width = userElement.offsetWidth;
    const height = userElement.offsetHeight;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    context.fillStyle = "#fff"; // Set background color if needed
    context.fillRect(0, 0, width, height);

    const name = userElement.querySelector("h3").textContent;
    const email = userElement.querySelector("p").textContent;

    const dataURL = userElement.querySelector("img").src;

    const image = new Image();
    image.crossOrigin = "Anonymous";

    image.onload = () => {
      context.drawImage(image, 2 * height, 0, height, height);

      context.font = "16px Arial";
      context.fillStyle = "#000";
      context.fillText(name, 10, 20);
      context.fillText(email, 10, 40);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "user_details.png";
      link.click();
    };

    image.src = dataURL;
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div ref={userRef}>
        <h1>User Details</h1>
        <h3>
          {user.first_name} {user.last_name}
        </h3>
        <p>Email: {user.email}</p>
        <img src={user.avatar} alt={user.first_name} />
      </div>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default UserDetails;
