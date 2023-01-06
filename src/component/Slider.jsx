import { useState, useEffect, useCallback } from "react";
import useWindowSize from "../hook/useWindowSize";
function Slider() {
  const { width } = useWindowSize();
  const movies = Array(16).fill("https://via.placeholder.com/250");

  const [itemsPerScreen, setItemsPerScreen] = useState(4);

  const [itemCount, setItemCount] = useState(movies.length);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [progressBarItems, setProgressBarItems] = useState(0);

  useEffect(() => {
    if (width !== undefined) {
      setItemsPerScreen(width);
      const math = Math.ceil(itemCount / itemsPerScreen);
      setProgressBarItems(math);
      console.log(progressBarItems);
    }
  }, [, width, itemsPerScreen]);

  const incrementSliderIndex = () => {
    setSliderIndex((prev) => {
      if (prev + 1 >= progressBarItems) return 0;
      else return prev + 1;
    });
  };
  const decrementSliderIndex = () => {
    setSliderIndex((prev) => {
      if (prev - 1 < 0) return progressBarItems - 1;
      else return prev - 1;
    });
  };

  return (
    <main className="row">
      <div className="header">
        <p className="title">
          Items: {movies.length} SliderI:{sliderIndex} Itemsp/rBarras:
          {itemsPerScreen} BarraProg: {progressBarItems}
        </p>
        <div className="progress-bar">
          {Array(progressBarItems)
            .fill("")
            .map((item, i) => {
              return (
                <div
                  key={i}
                  className={`progress-item
                 ${i === sliderIndex ? "active" : ""}`}
                ></div>
              );
            })}
        </div>
      </div>
      <div id="container" className="container">
        <div
          onClick={decrementSliderIndex}
          className={`handle left-handle`}
        ></div>
        <div
          id="slider"
          style={{
            "--slider-index": sliderIndex,
            "--items-per-screen": itemsPerScreen,
          }}
          className={`slider`}
        >
          {movies.map((item, i) => {
            return <img key={i} src={`${item}/00FF00?text=${i + 1}`} />;
          })}
        </div>
        <div
          onClick={incrementSliderIndex}
          className={`handle right-handle`}
        ></div>
      </div>
    </main>
  );
}
export { Slider };
