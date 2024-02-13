import React from "react";
import Carousel from "./Carousel";

const images = [
  {
    src: "https://picsum.photos/id/237/200/300",
    alt: "Image 1",
    label: "Label 1",
  },
  {
    src: "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA",
    alt: "Image 2",
    label: "Label 2",
  },
  {
    src: "https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU",
    alt: "Image 2",
    label: "Label 2",
  },
  {
    src: "https://picsum.photos/seed/picsum/200/300",
    alt: "Image 2",
    label: "Label 2",
  },
  {
    src: "https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g",
    alt: "Image 2",
    label: "Label 2",
  },
  {
    src: "https://fastly.picsum.photos/id/25/5000/3333.jpg?hmac=yCz9LeSs-i72Ru0YvvpsoECnCTxZjzGde805gWrAHkM",
    alt: "Image 2",
    label: "Label 2",
  },
  // Add more images as needed
];

const App = () => {
  return (
    <div className="App">
      <h1>Seamless Infinite Wrap-Around Carousel</h1>
      <Carousel
        duration={200}
        easing="ease-out"
        perPage={1}
        startIndex={0}
        threshold={20}
        loop={true}
        rtl={false}
        onInit={() => {}}
        onChange={() => {}}
        selector={images.map((item, index) => (
          <div key={index}>
            <img src={item.src} alt={item.alt} />
          </div>
        ))}
      />
    </div>
  );
};

export default App;
