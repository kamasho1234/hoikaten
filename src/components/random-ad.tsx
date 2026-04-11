"use client";

import { useEffect, useState } from "react";

const ads = [
  {
    link: "https://px.a8.net/svt/ejp?a8mat=4B1ILN+8D9CVM+5CLW+5YZ75",
    img: "https://www27.a8.net/svt/bgt?aid=260411243506&wid=001&eno=01&mid=s00000024962001003000&mc=1",
    tracker: "https://www18.a8.net/0.gif?a8mat=4B1ILN+8D9CVM+5CLW+5YZ75",
  },
  {
    link: "https://px.a8.net/svt/ejp?a8mat=4B1ILN+893BN6+1KYA+2TCELD",
    img: "https://www21.a8.net/svt/bgt?aid=260411243499&wid=001&eno=01&mid=s00000007381017022000&mc=1",
    tracker: "https://www18.a8.net/0.gif?a8mat=4B1ILN+893BN6+1KYA+2TCELD",
  },
  {
    link: "https://px.a8.net/svt/ejp?a8mat=4B1ILN+84BUSY+2VC0+IBAKH",
    img: "https://www20.a8.net/svt/bgt?aid=260411243491&wid=001&eno=01&mid=s00000013392003076000&mc=1",
    tracker: "https://www13.a8.net/0.gif?a8mat=4B1ILN+84BUSY+2VC0+IBAKH",
  },
  {
    link: "https://px.a8.net/svt/ejp?a8mat=4B1ILN+84BUSY+2VC0+IJFS1",
    img: "https://www25.a8.net/svt/bgt?aid=260411243491&wid=001&eno=01&mid=s00000013392003114000&mc=1",
    tracker: "https://www14.a8.net/0.gif?a8mat=4B1ILN+84BUSY+2VC0+IJFS1",
  },
  {
    link: "https://px.a8.net/svt/ejp?a8mat=4B1ILN+7R8BHU+3PSY+61C2P",
    img: "https://www23.a8.net/svt/bgt?aid=260411243469&wid=001&eno=01&mid=s00000017341001014000&mc=1",
    tracker: "https://www19.a8.net/0.gif?a8mat=4B1ILN+7R8BHU+3PSY+61C2P",
  },
  {
    link: "https://px.a8.net/svt/ejp?a8mat=4B1ILN+7Q1GAA+3PSY+TVQUP",
    img: "https://www21.a8.net/svt/bgt?aid=260411243467&wid=001&eno=01&mid=s00000017341005019000&mc=1",
    tracker: "https://www18.a8.net/0.gif?a8mat=4B1ILN+7Q1GAA+3PSY+TVQUP",
  },
  {
    link: "https://px.a8.net/svt/ejp?a8mat=4B1ILN+7NNPV6+57YO+614CX",
    img: "https://www29.a8.net/svt/bgt?aid=260411243463&wid=001&eno=01&mid=s00000024360001013000&mc=1",
    tracker: "https://www14.a8.net/0.gif?a8mat=4B1ILN+7NNPV6+57YO+614CX",
  },
  {
    link: "https://px.a8.net/svt/ejp?a8mat=4B1ILN+7L9ZG2+43OO+15Q9SH",
    img: "https://www25.a8.net/svt/bgt?aid=260411243459&wid=001&eno=01&mid=s00000019140007009000&mc=1",
    tracker: "https://www18.a8.net/0.gif?a8mat=4B1ILN+7L9ZG2+43OO+15Q9SH",
  },
];

export function RandomAd() {
  const [ad, setAd] = useState<(typeof ads)[number] | null>(null);

  useEffect(() => {
    setAd(ads[Math.floor(Math.random() * ads.length)]);
  }, []);

  if (!ad) return null;

  return (
    <div className="flex justify-center my-8">
      <div className="text-center">
        <p className="text-[10px] text-muted-foreground mb-1">広告</p>
        <a href={ad.link} rel="nofollow" target="_blank">
          <img
            src={ad.img}
            width={300}
            height={250}
            alt=""
            className="rounded-lg"
            loading="lazy"
          />
        </a>
        <img src={ad.tracker} width={1} height={1} alt="" />
      </div>
    </div>
  );
}
