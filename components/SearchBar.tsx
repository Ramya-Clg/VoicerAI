'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useDebounce } from '@/lib/useDebounce'

const SearchBar = () => {
    const [search, setSearch] = useState('')
    const router = useRouter()
    const pathName = usePathname()
    const debouncedValue = useDebounce(search, 500)
    useEffect(() => {
        if (debouncedValue) {
            router.push(`/discover?search=${debouncedValue}`)
        }
        else if(!debouncedValue && pathName === '/discover'){
            router.push('/discover')
        }
    }, [router, debouncedValue, pathName])
    return (
        <div className='relative mt-8 block'>
            <Input className='input-class py-6 pl-12 focus-visible:ringt-offset-orange-1' placeholder='search for podcast' value={search} onChange={(e) => setSearch(e.target.value)} onLoad={() => setSearch('')}>
            </Input>
            <Image src='/icons/search.svg' alt='searchicon' height={20} width={20} className='absolute left-4 top-3.5'>

            </Image>
        </div>
    )
}

export default SearchBar
