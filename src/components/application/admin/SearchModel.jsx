
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
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
        </DialogContent>
    </Dialog>
  )
}

export default SearchModel