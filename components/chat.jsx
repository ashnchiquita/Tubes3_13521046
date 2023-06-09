import { useState, useRef, useEffect } from "react";
import { getResponse } from "@/services/qna.js";
import Image from "next/image";

export const Chats = ({
  algorithm,
  handlePostChat,
  chatsData,
  currentHistory,
}) => {
  const scrollDiv = useRef();

  // render based on sender
  const getIcon = (sender) => {
    if (sender === "user") {
      return (
        <Image
          src="/user_avatar.svg"
          width={10}
          height={10}
          class="object-cover h-10 w-10 rounded-full order-1"
          alt=""
        />
      );
    } else {
      return (
        <Image
          src="/bot_avatar.svg"
          width={10}
          height={10}
          class="object-cover h-10 w-10 rounded-full order-1"
          alt=""
        />
      );
    }
  };

  const getColor = (sender) => {
    return sender === "user" ? "bg-gray-700" : "bg-gray-600";
  };

  const getTextColor = (sender) => {
    return sender === "user" ? "text-pink-300" : "text-green-300";
  };

  const getName = (sender) => {
    return sender === "user" ? "You" : "C3GPT Bot";
  };

  const [currMessage, setCurrMessage] = useState("");

  const sendMessage = async () => {
    if (currMessage !== "") {
      let temp = currMessage;
      setCurrMessage("");
      await handlePostChat(currentHistory, temp, "user");

      try {
        const response = await getResponse(temp, algorithm);

        // HANDLE RESPONSE
        await handlePostChat(currentHistory, response, "bot");
      } catch (error) {
        console.error("An error occurred while getting response:", error);
      }
    }
  };

  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight;
    }
  }, [chatsData]);

  try {
    var input = document.getElementById("messageField");

    if (input) {
      input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          document.getElementById("sendButton").click();
        }
      });
    }
  } catch (e) {
    console.error(e);
  }


  return currentHistory ? (
    <div class="bg-gray-700 flex-1 justify-between flex flex-col h-screen">
      <div
        id="messages"
        class="flex flex-col space-y-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrolling-touch"
        ref={scrollDiv}
      >
        {chatsData &&
          chatsData.map((chat, i) => {
            return (
              <div key={i} class={"px-5 py-3 " + getColor(chat.sender)}>
                <div class="flex items-start">
                  <div class="flex flex-col space-y-1 text-sm max-w-full mx-4 order-2 items-start">
                    <div>
                      <span
                        class={
                          getTextColor(chat.sender) +
                          " text-gray-100 font-semibold text-base"
                        }
                      >
                        {getName(chat.sender)}
                      </span>
                    </div>
                    <div>
                      <span class="text-gray-100 text-base whitespace-pre-line">
                        {chat.message}
                      </span>
                    </div>
                  </div>
                  {getIcon(chat.sender)}
                </div>
              </div>
            );
          })}
      </div>
      <div class="px-4 py-4 mb-0">
        <div class="relative flex">
          <input
            id="messageField"
            type="text"
            placeholder="Send a message..."
            class="w-full focus:outline-none focus:placeholder-gray-400 text-white placeholder-gray-400 pl-4 pr-14 bg-gray-500 rounded-md py-3"
            onChange={(e) => setCurrMessage(e.target.value)}
            value={currMessage}
          />
          <div class="absolute right-3 items-center inset-y-0 hidden sm:flex">
            <button
              id="sendButton"
              type="button"
              class="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-400 focus:outline-none"
              onClick={sendMessage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="2 -1 22 22"
                fill="white"
                class="h-6 w-6 ml-2 transform rotate-45"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div class="bg-gray-700 flex-1 flex h-screen justify-center items-center">
      <div class="inline-block text-center text-white">
        <h1 class="font-black text-3xl p-2">Welcome to C3GPT, have fun!</h1>
        <h2 class="font-semibold text-xl">Create New Chat to Start</h2>
      </div>
    </div>
  );
};
