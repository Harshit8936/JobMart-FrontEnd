import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
const category = [
    "Front End Developer",
    "Back End Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
]

export default function CategoryCaresouel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchHandler = (query)=>{
        dispatch(setSearchedQuery(query));
        navigate("/browse")
      }
  return (
    <div>
        <Carousel className='w-full max-w-xl mx-auto my-20'>
            <CarouselContent>
                {category.map((cat,index)=>(
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <Button onClick={()=>searchHandler(cat)} variant="outline" className="rounded-full" >{cat}</Button>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext/>
        </Carousel>
    </div>
  )
}
