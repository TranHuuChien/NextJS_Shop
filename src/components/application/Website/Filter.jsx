import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import { Checkbox } from '@/components/ui/checkbox'
const Filter = () => {
  return (
    <div>
        <Accordion type='single' defaultValue={['1', '2', '3', '4']}>
            <AccordionItem value='item-1'>
                <AccordionTrigger className='uppercase font-semibold hover:no-underline'>CATEGORY</AccordionTrigger>
                <AccordionContent>
                    <div className='max-h-48 overflow-auto'>
                        <ul>
                            <li>
                                <label className='flex items-center space-x-3 cursor-pointer'>
                                    <Checkbox />
                                    <span>Giày</span>
                                </label>
                            </li>
                            <li>
                                <label className='flex items-center space-x-3 cursor-pointer'>
                                    <Checkbox />
                                    <span>Quần áo</span>
                                </label>
                            </li>
                            <li>
                                <label className='flex items-center space-x-3 cursor-pointer'>
                                    <Checkbox />
                                    <span>Túi</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-1'>
                <AccordionTrigger className='uppercase font-semibold hover:no-underline'>Price</AccordionTrigger>
                <AccordionContent>
                    <div className='max-h-48 overflow-auto'>
                        <ul>
                            <li>
                                <label className='flex items-center space-x-3 cursor-pointer'>
                                    <Checkbox />
                                    <span>1.000.000</span>
                                </label>
                            </li>
                            <li>
                                <label className='flex items-center space-x-3 cursor-pointer'>
                                    <Checkbox />
                                    <span>2.000.000</span>
                                </label>
                            </li>
                            <li>
                                <label className='flex items-center space-x-3 cursor-pointer'>
                                    <Checkbox />
                                    <span>3.000.000</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  )
}

export default Filter