import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatSidebar from "./ChatSidebar";
import { avatar } from "../Images/chatAvatar.png";
import { BASE_URL } from "../../Utils/Config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import bgAdmin from "../Images/chatWallpaper1.webp";

const ChatComponent = () => {
  const [author, setAuthor] = useState("");
  const [rooms, setRooms] = useState([]);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState({});

  const scroll = useRef();

  const socketRef = useRef(null);

  const history = useNavigate();

  useEffect(() => {
    try {
      const userId = localStorage.getItem("id");
      const username = localStorage.getItem("username");

      setAuthor(userId);
      setUser(username);
      console.log(user, "....");
    } catch (e) {
      history("/login");
      toast.error("Please Login for community chat", { duration: 5000 });
    }

    axios
      .get(`${BASE_URL}/chat/rooms/`)
      .then((response) => {
        console.log("roomssssssssssssssssss", response.data);
        setRooms(response.data);
        setActiveRoomId(response.data[0]?.id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (activeRoomId) {
      socketRef.current = new WebSocket(
        `ws://localhost:8000/ws/chat/${activeRoomId}/`
      );

      socketRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      axios
        .get(`${BASE_URL}/chat/rooms/${activeRoomId}/messages/`)
        .then((response) => {
          setMessages(response.data);
          console.log(messages,'messagessssssssssss');
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [activeRoomId]);

  const sendMessage = () => {
    const message = {
      content: newMessage,
      author: author,
      room_id: activeRoomId
    
    };

    axios
      .post(`${BASE_URL}/chat/rooms/${activeRoomId}/messages/`, message)
      .then((response) => {
        const newMessage = response.data;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (socketRef.current) {
      socketRef.current.send(JSON.stringify(message));
    }

    setNewMessage("");
  };

  // useEffect(() => {
  //   scroll.current?.scrollIntoView({ behavior: "smooth" });
  //   async function getUser() {
  //     try {
  //       // const response = await axios.get(`/api/getSingleUser/${author}`);
  //       const response = await axios.get(
  //         `${BASE_URL}/user/details/${author}/`
  //       );

  //       console.log(response);
  //       setUser(response?.data?.userDetails);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   getUser();
  // }, [messages]);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
    return formattedTime;
  };

  console.log("author:", author);
  console.log("message.author:", messages);

  return (
    <div
      className="flex h-screen bg-cover bg-center  rounded-md bg-gray-200"
      style={{ backgroundImage: `url(${bgAdmin})` }}
    >
      {/* <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgAdmin})` }}> */}
      <ChatSidebar
        rooms={rooms}
        activeRoomId={activeRoomId}
        setActiveRoomId={setActiveRoomId}
      />
      <div className="flex-grow">
        <div className="flex flex-col h-screen">
          {/* ... (existing code) */}
          <div className="flex-grow p-6 overflow-y-auto">
            {messages.length > 0 ? (

              messages.map((message, index) => (
                <div
                  key={index}
                  ref={scroll}
                  className={`flex ${
                    message.author === author ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`${
                      message.author === author
                        ? "bg-green-500 text-white self-end"
                        : "bg-blue-500 text-white self-start"
                    } py-2 px-4 rounded-lg max-w-md`}
                  >
                    <div className="flex items-center">
                      {/* Display sender avatar for non-sender messages */}
                      {message.author !== author && (
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
                          alt="avatar"
                          className="mr-3 rounded-full h-6 w-6"
                        />
                      )}
                      <div className="flex flex-col">
                        {/* Display sender username for non-sender messages */}
                        {message.author !== author && (
                          <div className="text-sm text-gray-500">
                            {message.author}
                          </div>
                        )}

                        <div className="mb-1">{message.content}</div>
                        <div className="text-xs text-gray-500">
                          {formatTimestamp(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No messages yet</div>
            )}
          </div>
          <div className="py-4 px-6 bg-gray-300">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow border border-gray-400 rounded-lg px-4 py-2 focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;

// import React, { useState, useEffect } from "react";
// import { w3cwebsocket as W3CWebSocket } from "websocket";

// function Chat() {
//   const [socket, setSocket] = useState(null);
//   const [username, setUsername] = useState("");
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Get the username from local storage or prompt the user to enter it
//     const storedUsername = localStorage.getItem("username");
//     console.log(username,"user.............")
//     if (storedUsername) {
//       setUsername(storedUsername);
//     } else {
//       const input = prompt("Enter your username:");
//       if (input) {
//         setUsername(input);
//         localStorage.setItem("username", input);
//       }
//     }

//     // Connect to the WebSocket server with the username as a query parameter
//     const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/`);
//     setSocket(newSocket);

//     newSocket.onopen = () => console.log("WebSocket connected");
//     newSocket.onclose = () => console.log("WebSocket disconnected");

//     // Clean up the WebSocket connection when the component unmounts
//     return () => {
//       newSocket.close();
//     };
//   }, [username]);

//   useEffect(() => {
//     if (socket) {
//       socket.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         setMessages((prevMessages) => [...prevMessages, data]);
//       };
//     }
//   }, [socket]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (message && socket) {
//       const data = {
//         message: message,
//         username: username,
//       };
//       socket.send(JSON.stringify(data));
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="bg-gray-200 py-4">
//         <div className="container mx-auto flex items-center">
//           <div className="flex items-center text-lg">
//             {/* <img
//               src="/path/to/logo.png"
//               alt="Logo"
//               className="mr-2 h-10 w-10"
//             /> */}
//             <div>Dine Eazy</div>
//           </div>

//         </div>
//       </div>
//       <div className="flex-grow bg-blue-500 p-4">
//       <h1 className="text-center text-black font-extrabold font-serif text-2xl uppercase">
//             Chat
//           </h1>
//         <div className="message-container h-full overflow-y-auto">
//           {messages.map((message, index) => (
//             <div key={index} className="message my-2 px-4 py-2 rounded-lg">
//               <div className="message-username text-white font-bold">
//                 {message.username}:
//               </div>
//               <div className="message-content text-white">{message.message}</div>
//               <div className="message-timestamp text-gray-400 text-xs">
//                 {message.timestamp}
//               </div>
//             </div>
//           ))}
//         </div>
//         <form onSubmit={handleSubmit} className="flex">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={message}
//             onChange={(event) => setMessage(event.target.value)}
//             className="flex-grow py-2 px-4 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:border-blue-500"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 py-2 px-4 rounded-lg text-white"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Chat;
