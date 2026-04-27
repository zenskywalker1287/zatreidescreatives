import CarouselStrip, { type CarouselCard } from "./CarouselStrip";

const HeroCarousel = ({ images }: { images: string[] }) => {
  if (!images.length) return null;
  const cards: CarouselCard[] = images.map((image, index) => ({ id: index + 1, image }));

  return (
    <CarouselStrip cards={cards} direction="right" autoScroll={false} desktopCardWidth={340} className="py-12 md:py-16" />
  );
};

export default HeroCarousel;
