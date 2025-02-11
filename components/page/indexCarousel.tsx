"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function IndexCarousel() {
  return (
    <>
      <Carousel plugins={[Autoplay({ delay: 3000 })]} className="p-5">
        <CarouselContent>
          <CarouselItem><div className="bg-yellow-200">1<br/>test<br/>test</div></CarouselItem>
          <CarouselItem><div className="bg-green-200">2<br/>test<br/>test</div></CarouselItem>
          <CarouselItem><div className="bg-blue-200">3<br/>test<br/>test</div></CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  )
}