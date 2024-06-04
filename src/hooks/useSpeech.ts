import { useEffect, useState } from "react";

let recognition: SpeechRecognition | null = null;

if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.lang = "hu-HU";
}

const useSpeech = () => {
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setText(event.results[0][0].transcript);
      recognition?.stop();
      setIsListening(false);
    };
  }, []);

  const startListening = () => {
    setText("");
    setIsListening(true);

    recognition?.start();
  };

  const stopListening = () => {
    recognition?.stop();
    setIsListening(false);
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognition: !!recognition,
  };
};

export default useSpeech;
