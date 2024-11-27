"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Bot,
  BotIcon,
  MessageCircle,
  Pause,
  Send,
  Volume2,
  XIcon,
} from "lucide-react";
import { useRef, useState } from "react";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useChatStore } from "@/hooks/chat";
import { Text } from "@/components/ui/text";
import clsx from "clsx";
import { Inputs } from "@/components/ui/inputs";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const { discussion, addChat } = useChatStore();
  const [loading, setLoading] = useState(false);
  const [audioSrc, setAudio] = useState("/assets/audio/output.mp3");

  const { handleSubmit, register, reset } = useForm();
  const onSubmit = async (values: any) => {
    setLoading(true);
    addChat({ sender: "me", message: values.message });
    reset();
    const response = await axios.post(
      "https://hui-back-model.onrender.com/inputText",
      { data: values.message }
    );
    addChat({ sender: "bot", message: response.data.text });
    setAudio(
      "https://hui-back-model.onrender.com/static/output.mp3?" +
        new Date().toString()
    );
    setLoading(false);
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      (audioRef as any).current.pause();
    } else {
      (audioRef as any).current.play();
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger>
        <Button className="text-white">
          <BotIcon />
          Chatbot
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-background flex flex-col justify-end relative p-0 h-[400px] overflow-scroll bg-white">
        <div className="bg-primary px-5 py-3 rounded-t-lg flex justify-between items-center top-0 fixed z-10 w-full">
          <span className="text-white">Assitant Tech'her</span>
          <audio
            ref={audioRef}
            src={audioSrc}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={handleEnded}
            autoPlay
          />
          <Button onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <Volume2 />}
          </Button>
          <XIcon onClick={() => setOpen(false)} className=" cursor-pointer" />
        </div>
        <div className="flex flex-col gap-2">
          {discussion.map((chat, index) => (
            <div
              key={index} // Ensure each child has a unique key
              className={clsx(
                "w-full flex",
                chat.sender === "me" ? " justify-end" : ""
              )}
            >
              <Text
                className={clsx(
                  "max-w-52 rounded-md p-2",
                  chat.sender === "me" ? "bg-secondary/40" : "bg-gray-200"
                )}
              >
                {chat.message}
              </Text>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex p-1">
          <Inputs
            {...register("message", {
              required: "Required",
            })}
            type="text"
            autoFocus
            className=" rounded-e-none"
          />
          <Button type="submit" disabled={loading} className=" rounded-s-none">
            Envoyer
            <Send />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
