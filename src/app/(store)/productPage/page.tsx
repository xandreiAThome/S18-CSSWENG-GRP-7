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

export default function ProductPage(){
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
                            <CarouselItem>image 1</CarouselItem>
                            <CarouselItem>image 2</CarouselItem>
                        </CarouselContent>
                    </Carousel>
                    <div className="flex grow-2 p-10">
                        <p>Image 1</p>
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