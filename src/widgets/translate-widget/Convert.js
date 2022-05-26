import axios from "axios";
import { useEffect, useState } from "react";

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(()=> {
      const timerId= setTimeout(()=> {
          setDebouncedText(text);
      }, 500);

      return () => {
          clearTimeout(timerId);
      };

  }, [text])

  useEffect(() => {
    const doTranslation = async () => {
      const res = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM",
          },
        }
      );
      setTranslated(res.data.data.translations[0].translatedText);
    };
    doTranslation();
    console.log("new language");
  }, [language, debouncedText]);
  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );
};

export default Convert;
