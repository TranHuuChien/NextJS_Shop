
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useState } from 'react'

const SearchModel = ({ open, setOpen }) => {
  const [query, setQuery] = useState('')
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)} >
        <DialogContent className="z-60">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                Find and navigate to any admin section instantly. Type a keyword to get start
              </DialogDescription>
            </DialogHeader>

            <Input
              placeholder='Search...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />

            <ul className='mt-4 max-h-60 overflow-y-auto'>
              <li>
                <Link href='' className='block py-2 px-3 rounded hover:bg-muted'>
                  <h4 className='font-medium'>
                    Title
                  </h4>
                  <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit</p>
                </Link>
              </li>
            </ul>
        </DialogContent>
    </Dialog>
  )
}

export default SearchModel