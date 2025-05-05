import './SlidesAuth.scss';
import Slider from '@components/ui/Slider/Slider';

import imageLogin01Avif1x from '@assets/images/login/imageLogin01.avif';
import imageLogin01Avif2x from '@assets/images/login/imageLogin01@2x.avif';
import imageLogin01Webp1x from '@assets/images/login/imageLogin01.webp';
import imageLogin01Webp2x from '@assets/images/login/imageLogin01@2x.webp';
import imageLogin01Png1x from '@assets/images/login/imageLogin01.png';
import imageLogin01Png2x from '@assets/images/login/imageLogin01@2x.png';

import imageLogin02Avif1x from '@assets/images/login/imageLogin02.avif';
import imageLogin02Avif2x from '@assets/images/login/imageLogin02@2x.avif';
import imageLogin02Webp1x from '@assets/images/login/imageLogin02.webp';
import imageLogin02Webp2x from '@assets/images/login/imageLogin02@2x.webp';
import imageLogin02Png1x from '@assets/images/login/imageLogin02.png';
import imageLogin02Png2x from '@assets/images/login/imageLogin02@2x.png';

import imageLogin03Avif1x from '@assets/images/login/imageLogin03.avif';
import imageLogin03Avif2x from '@assets/images/login/imageLogin03@2x.avif';
import imageLogin03Webp1x from '@assets/images/login/imageLogin03.webp';
import imageLogin03Webp2x from '@assets/images/login/imageLogin03@2x.webp';
import imageLogin03Png1x from '@assets/images/login/imageLogin03.png';
import imageLogin03Png2x from '@assets/images/login/imageLogin03@2x.png';

const slides = [
  {
    id: 1,
    text: 'Найди способы противостоять стрессу!',
    images: {
      avif: [imageLogin01Avif1x, imageLogin01Avif2x],
      webp: [imageLogin01Webp1x, imageLogin01Webp2x],
      png: [imageLogin01Png1x, imageLogin01Png2x],
    },
  },
  {
    id: 2,
    text: 'Управляй своими эмоциями эффективно!',
    images: {
      avif: [imageLogin02Avif1x, imageLogin02Avif2x],
      webp: [imageLogin02Webp1x, imageLogin02Webp2x],
      png: [imageLogin02Png1x, imageLogin02Png2x],
    },
  },
  {
    id: 3,
    text: 'Достигай внутренней гармонии!',
    images: {
      avif: [imageLogin03Avif1x, imageLogin03Avif2x],
      webp: [imageLogin03Webp1x, imageLogin03Webp2x],
      png: [imageLogin03Png1x, imageLogin03Png2x],
    },
  },
];

const SlidesAuth = () => {
  return <Slider slides={slides} slideDuration={10} />;
};

export default SlidesAuth;
