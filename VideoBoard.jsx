import React, { useState } from "react";

function VideoBoard() {
    const frames = [
        { id: 1, title: "Run", src: "https://www.youtube.com/embed/0yUG7WzG9RQ" },
        { id: 2, title: "Stretch", src: "https://www.youtube.com/embed/GQZpUaanJoY" },
        { id: 3, title: "Kickboxing", src: "https://www.youtube.com/embed/u5a3JzRRAkQ" }
    ];

    const [curFrame, setCurFrame] = useState(0);

    const nextFrames = () => {
        if (curFrame < frames.length - 1) {
            setCurFrame(curFrame + 1);
        }
    };

    const prevFrames = () => {
        if (curFrame > 0) {
            setCurFrame(curFrame - 1);
        }
    };

    return (
        <div className="videoboard-container">
            <h1 className="text-xl font-bold">{frames[curFrame].title}</h1>
            <iframe
                src={frames[curFrame].src}
                title={frames[curFrame].title}
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
            ></iframe>
            <div className="controls mt-4">
                <button onClick={prevFrames} disabled={curFrame === 0} className="btn btn-prev">
                    Попередній
                </button>
                <button onClick={nextFrames} disabled={curFrame === frames.length - 1} className="btn btn-next">
                    Наступний
                </button>
            </div>
        </div>
    );
}

export default VideoBoard;