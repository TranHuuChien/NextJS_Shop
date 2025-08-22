import { AiOutlineDashboard } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { IoShirtOutline } from 'react-icons/io5'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { LuUserRound } from 'react-icons/lu'
import { IoMdStarOutline } from 'react-icons/io'
import { MdOutlinePermMedia } from 'react-icons/md'
import { RiCoupon2Line } from 'react-icons/ri'
import { title } from 'process'
import { url } from 'inspector'
import { icons } from 'lucide-react'

export const adminAppSidebarMenu = [
    {
        title: "Dashboard",
        url: '',
        icon: AiOutlineDashboard
    },
    {
        title: "Category",
        url: '#',
        icon: BiCategory,
        submenu: [
            {
                title: "Add category",
                url: '#'
            },
            {
                title: "Add variant",
                url: '#'
            },
            {
                title: "All Product",
                url: '#'
            },
            {
                title: "Product variant",
                url: '#'
            }
        ]
    },
    {
        title: "Coupons",
        url: '#',
        icon: RiCoupon2Line,
        submenu: [
            { 
                title: "Add Coupon",
                url:'#'
            },
            {
                title: "All Coupon",
                url: '#'
            },
        ]
    },
    {
        title: "Orders",
        url: '#',
        icon: MdOutlineShoppingBag,
    }, 
    {
        title: "Customers",
        url: '#',
        icon: LuUserRound,
    },
    {
        title: "Rating & Review",
        url: '#',
        icon: IoMdStarOutline,
    }
]