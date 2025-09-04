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
import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_DASHBOARD, ADMIN_CATEGORY_EDIT, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '@/routes/AdminPanelRoute'

export const adminAppSidebarMenu = [
    {
        title: "Dashboard",
        url:   ADMIN_DASHBOARD,
        icon: AiOutlineDashboard
    },
    {
        title: "Category",
        url: '#',
        icon: BiCategory,
        submenu: [
            {
                title: "Add Category",
                url: ADMIN_CATEGORY_ADD,
                
            },
            {
                title: "ALL Category",
                url: ADMIN_CATEGORY_SHOW
            },
            // {
            //     title: "Edit Category",
            //     url: ADMIN_CATEGORY_EDIT
            // }
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
    },
    {
        title: 'Media',
        url: ADMIN_MEDIA_SHOW,
        icon: MdOutlinePermMedia
    }
]