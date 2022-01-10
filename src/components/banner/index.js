import React, { useState, useEffect } from 'react'
import khan from '../../../public/assets/images/khanbanner.jpg'
import unitel from '../../../public/assets/images/unitel_banner.jpg'
import golomt from '../../../public/assets/images/golomtbank.jpg'

const data = [
  {
    image: khan,
    link: "https://www.khanbank.com/",
  },
  {
    image: unitel,
    link: "https://www.unitel.mn/",
  },
  {
    image: golomt,
    link: "https://www.golomtbank.com/",
  },
];

export default function Banner() {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setNumber(Math.floor(Math.random() * data.length));
  }, []);
  return (
    <div className="sticky top-[74px]">
      <a rel="noreferrer" href={data[number].link} target="_blank">
        <div className="flex items-center justify-center w-full h-auto">
          <img alt="" src={data[number].image.src} className="rounded-[8px]" />
        </div>
      </a>
    </div>
  );
}
