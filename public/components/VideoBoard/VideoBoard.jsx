
import { useState } from "react"
import { Play, Clock, Award, Heart } from "lucide-react"

function VideoBoard() {
  const videos = [
    {
      id: "pullups-1",
      title: "Відтискання на турнику",
      description: "Техніка виконання підтягувань на турнику для початківців та просунутих спортсменів",
      duration: "4:32",
      views: "1.4M",
      thumbnail: "https://i.ytimg.com/vi/eGo4IYlbE5g/maxresdefault.jpg",
      videoId: "eGo4IYlbE5g",
      trainer: "BarBrothers",
    },
    {
      id: "running-1",
      title: "Техніка бігу",
      description: "Правильна техніка бігу для початківців та професіоналів",
      duration: "7:00",
      views: "850K",
      thumbnail: "https://i.ytimg.com/vi/brFHyOtTwH4/maxresdefault.jpg",
      videoId: "brFHyOtTwH4",
      trainer: "RunnersMaster",
    },
    {
      id: "pushups-1",
      title: "Відтискання: техніка та варіації",
      description: "Різні види відтискань для розвитку грудних м'язів, трицепсів та плечей",
      duration: "3:38",
      views: "950K",
      thumbnail: "https://i.ytimg.com/vi/IODxDxX7oi4/maxresdefault.jpg",
      videoId: "IODxDxX7oi4",
      trainer: "StrengthCoach",
    },
  ]

  const [activeVideo, setActiveVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const currentVideo = videos[activeVideo]

  const handleVideoChange = (index) => {
    setActiveVideo(index)
    setIsPlaying(false)
  }

  const handlePlayClick = () => {
    setIsPlaying(true)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Відео тренування</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        <div className="lg:col-span-2">
          <div className="relative rounded-xl overflow-hidden bg-black">
            {!isPlaying ? (
              <div className="relative">
                <img
                  src={currentVideo.thumbnail || "/placeholder.svg"}
                  alt={currentVideo.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                  <button
                    onClick={handlePlayClick}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    <Play size={32} fill="white" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&rel=0`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold">{currentVideo.title}</h3>
            <div className="flex items-center mt-2 text-gray-600">
              <span className="flex items-center mr-4">
                <Clock size={16} className="mr-1" />
                {currentVideo.duration}
              </span>
              <span className="flex items-center mr-4">
                <Award size={16} className="mr-1" />
                {currentVideo.trainer}
              </span>
              <span className="flex items-center">
                <Heart size={16} className="mr-1" />
                {currentVideo.views} переглядів
              </span>
            </div>
            <p className="mt-2 text-gray-700">{currentVideo.description}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Всі відео</h3>
          <div className="space-y-4">
            {videos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => handleVideoChange(index)}
                className={`flex cursor-pointer rounded-lg overflow-hidden transition-all ${
                  activeVideo === index
                    ? "border-2 border-blue-600 bg-blue-50"
                    : "border border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="relative w-24 h-20 flex-shrink-0">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-2 flex-1">
                  <h4 className="text-sm font-medium line-clamp-2">{video.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{video.trainer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoBoard

