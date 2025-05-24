// https://www.npmjs.com/package/react-image-gallery
// referenced from: https://www.youtube.com/watch?v=AnG7LMcX_z8
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { RoutePaths } from '../../../utils/RoutePaths';
import { useNavigate } from "react-router-dom";
import Home from "./SlidePics/Home.png"
import Electronics from "./SlidePics/Electronics.png"
import Outdoor from "./SlidePics/Outdoor.png"
import Toys from "./SlidePics/Toys.png"


export default function ProductSlideShow() {
  const navigate = useNavigate();

  const images = [
      {
        original: Home,
        thumbnail: Home,
      },
      {
        original: Electronics,
        thumbnail: Electronics,
      },
      {
        original: Outdoor,
        thumbnail: Outdoor,
      },
      {
        original: Toys,
        thumbnail: Toys,
      },
    ];
    
    return (
        <ImageGallery 
        items={images} 
        showPlayButton={false}
        showFullscreenButton={false}
        autoPlay={true}
        slideInterval={4000}
        showThumbnails={false}
        onClick={() => {
          const dashboardURL = RoutePaths.Dashboard.replace(":search?", "");
          navigate(dashboardURL)
        }}
        />
    )
}