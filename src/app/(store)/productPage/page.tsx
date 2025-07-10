"use client";

import Image from 'next/image'

import { useState } from 'react'

import { Button } from "@/components/ui/button"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const dummyProduct = {
    name: "Wireless Headphones",
    price: 199,
    inStock: true,
    details: "test test test test test test",
}

const images = [
  { src: "/placeholder1.png", alt: "image1" },
  { src: "/placeholder2.png", alt: "image2" }
];

export default function ProductPage(){
    const [selectedImage, setSelectedImage] = useState(images[0].src); 

    return(
        <div className="flex flex-row justify-evenly p-4">
        <div className="flex flex-col grow-4">
            <div className="flex flex-row gap-2">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                    <BreadcrumbSeparator>
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="">General Category</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="">Specific Category</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="">{dummyProduct.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
            </div>
            <div>
                <div className="flex flex-row">
                    <Carousel orientation="vertical" className="flex grow-2 p-5">
                        <CarouselContent>
                            {images.map((image, index) => (
                                <CarouselItem key={index}>
                                <div onClick={() => setSelectedImage(image.src)} className="cursor-pointer hover:opacity-80">
                                    <Image src={image.src} width={60} height={60} alt={image.alt} />
                                </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    <div className="flex grow-2 p-10">
                        <Image src={selectedImage} width={250} height={250} alt="Selected Product Image" />
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col grow-8 gap-2 shrink-0 justify-left">
            <h1 className="text-black text-3xl font-bold">{dummyProduct.name}</h1>

            <h2 className="text-black text-3xl font-bold">₱{dummyProduct.price}</h2>

            <div className="flex flex-row gap-3"> 
                <p>QUANTITY</p> <p className="text-green-600">IN STOCK</p>
            </div>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="1" />
                </SelectTrigger>
            <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
            </SelectContent>
            </Select>

            <Button variant="grey">ADD TO CART</Button>
            <Button variant="neutral">BUY IT NOW</Button>
            
            <div>
                <Button variant="ghost">Add to Wishlist</Button>
            </div>
            
            <div>
                <ul>
                    <h3 className="font-bold">Specifications and Features</h3>
                    <li>Nullam vel lacus eu massa iaculis</li>
                    <li>Nullam vel lacus eu massa iaculis</li>
                </ul>
            </div>

            <Accordion type="single" collapsible className="flex flex-col">
            <AccordionItem value="item-1">
            <AccordionTrigger>Product Information</AccordionTrigger>
                <AccordionContent>
                    <p>
                        {dummyProduct.details}
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
            <AccordionTrigger>Shipping Details</AccordionTrigger>
                <AccordionContent>
                    <p>
                        test test test test test test test test test
                    </p>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
            <AccordionTrigger>Return Policy</AccordionTrigger>
                <AccordionContent>
                    <p>
                        test test test test test test test test test
                    </p>
                </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>
    </div>
    )
}