"use client"
import {useState} from "react";
import {PAGE_SIZE_OPTION} from "@/app/(root)/(admin)/admin/category/page";
import {styled, useTheme} from "@mui/material/styles";
import {Box, Grid, Tab, Tabs, TabsProps} from "@mui/material";
import InputSearch from "@/components/customs/input-search";
import CardSkeleton from "@/components/Application/CardSkeleton";
import NoData from "@/components/customs/no-data";
import CardProduct from "@/components/Application/CardProduct";
import {TProduct} from "@/types/product";
import CustomPagination from "@/components/customs/custom-pagination";
import Loading from "@/components/application/Loading";


const TYPE_VALUE = {
    liked: '1',
    viewed: '2'
}

type TProps = {}

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
    '&.MuiTabs-root': {
        borderBottom: 'none'
    }
}))

const mockProducts: TProduct[] = [
    {
        _id: "p1",
        averageRating: 4.5,
        createdAt: new Date("2024-03-10"),
        image: "https://example.com/images/product1.jpg",
        price: 299000,
        name: "Chuột không dây Logitech M590",
        slug: "chuot-khong-day-logitech-m590",
        totalLike: 12,
        countInStock: 35,
        discountEndDate: new Date("2025-12-31"),
        discountStartDate: new Date("2025-10-01"),
        totalReviews: 24,
        discount: 10,
        sold: 150,
        description: "Chuột không dây yên tĩnh, kết nối Bluetooth & USB receiver.",
        location: {
            name: "Hà Nội",
            _id: "l1",
        },
        likedBy: ["user1", "user2"],
        views: 300,
        uniqueViews: ["user1", "user3", "user5"],
    },
    {
        _id: "p2",
        averageRating: 4.8,
        createdAt: new Date("2024-05-12"),
        image: "https://example.com/images/product2.jpg",
        price: 1299000,
        name: "Bàn phím cơ Keychron K6",
        slug: "ban-phim-co-keychron-k6",
        totalLike: 35,
        countInStock: 20,
        discountEndDate: new Date("2025-11-30"),
        discountStartDate: new Date("2025-10-10"),
        totalReviews: 87,
        discount: 15,
        sold: 500,
        description: "Bàn phím cơ không dây nhỏ gọn, hot-swappable, switch Gateron.",
        location: {
            name: "TP. Hồ Chí Minh",
            _id: "l2",
        },
        likedBy: ["user2", "user5", "user9"],
        views: 980,
        uniqueViews: ["user2", "user5", "user6", "user7"],
    },
    {
        _id: "p3",
        averageRating: 4.2,
        createdAt: new Date("2024-06-01"),
        image: "https://example.com/images/product3.jpg",
        price: 259000,
        name: "Tai nghe in-ear Sony MDR-EX155AP",
        slug: "tai-nghe-sony-mdr-ex155ap",
        totalLike: 18,
        countInStock: 50,
        discountEndDate: null,
        discountStartDate: null,
        totalReviews: 45,
        discount: 0,
        sold: 320,
        description: "Tai nghe nhét tai chính hãng Sony, âm bass mạnh, có mic.",
        location: {
            name: "Đà Nẵng",
            _id: "l3",
        },
        likedBy: ["user1", "user3"],
        views: 520,
        uniqueViews: ["user1", "user3", "user4", "user8"],
    },
]

const likedProducts = {
    data: mockProducts,
    total: 3
}
const viewedProducts = {
    data: mockProducts,
    total: 3
}

const MyProductPage = (props : TProps) => {
    //** State
    const [loading, setLoading] = useState(false)
    const [searchBy, setSearchBy] = useState("")
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
    const [page, setPage] = useState(1)
    const [tabActive, setTabActive] = useState(TYPE_VALUE.viewed)
    const [optionTypes, setOptionTypes] = useState([
        {
            label: "Product View",
            value: TYPE_VALUE.viewed
        },
        {
            label: "Product Liked",
            value: TYPE_VALUE.liked
        }
    ])

    // ** theme
    const theme = useTheme()

    const handleOnChangePagination = (page: number, pageSize: number) => {
        setLoading(true)
        setPage(page);
        setPageSize(pageSize);
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setLoading(true)
        setTabActive(newValue)
        setPage(1)
        setPageSize(PAGE_SIZE_OPTION[0])
        setSearchBy('')
    }

    return (
        <>
            {loading || <Loading/>}
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4}}>
                <Grid container item md={12} xs={12}>
                    <StyledTabs value={tabActive} onChange={handleChange} aria-label='wrapper'>
                        {optionTypes.map(opt => {
                            return <Tab key={opt.value} value={opt.value} label={opt.label} />
                        })}
                    </StyledTabs>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, width: '100%' }}>
                        <Box sx={{ width: '300px' }}>
                            <InputSearch
                                placeholder='Search_name_product'
                                value={searchBy}
                                onChange={(value: string) => setSearchBy(value)}
                            />
                        </Box>
                    </Box>

                    {tabActive === TYPE_VALUE.liked && (
                        <Box sx={{ height: '100%', width: '100%', mt: 6 }}>
                            {loading ? (<Grid container md={12} xs={12} spacing={6}>
                                {Array.from({ length: 6 }).map((_, index) => {
                                    return (
                                        <Grid item key={index} md={3} sm={6} xs={12}>
                                            <CardSkeleton />
                                        </Grid>
                                    )
                                })}
                            </Grid>)
                                : (
                                    <Grid container md={12} xs={12} spacing={6}>
                                        {likedProducts?.data?.length > 0 ? (
                                            <>
                                                {likedProducts?.data?.map((item: TProduct) => {
                                                    return (
                                                        <Grid item key={item._id} md={3} sm={6} xs={12}>
                                                            <CardProduct item={item}/>
                                                        </Grid>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <Box sx={{width: '100%', mt: 10}}>
                                                <NoData widthImage='60px' heightImage='60px'
                                                        textNodata={'No_product'}/>
                                            </Box>
                                        )}
                                    </Grid>
                                )
                            }
                        </Box>
                    )}

                    {tabActive === TYPE_VALUE.viewed && (
                        <Box sx={{ height: '100%', width: '100%', mt: 6 }}>
                            {loading ? (
                                <Grid container md={12} xs={12} spacing={6}>
                                    {Array.from({ length: 6 }).map((_, index) => {
                                        return (
                                            <Grid item key={index} md={3} sm={6} xs={12}>
                                                <CardSkeleton />
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            ) : (
                                <Grid container md={12} xs={12} spacing={6}>
                                    {viewedProducts?.data?.length > 0 ? (
                                        <>
                                            {viewedProducts?.data?.map((item: TProduct) => {
                                                return (
                                                    <Grid item key={item._id} md={3} sm={6} xs={12}>
                                                        <CardProduct item={item} />
                                                    </Grid>
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <Box sx={{ width: '100%', mt: 10 }}>
                                            <NoData widthImage='60px' heightImage='60px' textNodata='No Product' />
                                        </Box>
                                    )}
                                </Grid>
                            )}

                        </Box>
                    )}
                </Grid>
                {/*Pagination Product*/}
                <Box sx={{ width: "100%", display: 'flex', justifyContent: 'flex-end', mt: 6 }}>
                    <CustomPagination
                        onChangePagination={handleOnChangePagination}
                        pageSizeOptions={PAGE_SIZE_OPTION}
                        pageSize={pageSize}
                        page={page}
                        rowLength={tabActive === TYPE_VALUE.liked ? likedProducts.total : viewedProducts.total}
                        isHideShowed
                    />
                </Box>
            </Box>
        </>
    )
}
export default MyProductPage;