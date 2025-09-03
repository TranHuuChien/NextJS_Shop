import { createSlice } from "@reduxjs/toolkit";


export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        backgroundColor: '',
        headerBackgroundColor: 'header-text-dark',
        enableMobileMenuSmall: '',
        enableMobileMenu: false,
        enableBackgroundImage: true,
        enableClosedSidebar: false,
        enableFixedHeader: true,
        enableHeaderShadow: true,
        enableSidebarShadow: true,
        enableFixedFooter: true,
        enableFixedSidebar: true,
        colorScheme: 'white',
        backgroundImage: '',
        backgroundImageOpacity: 'opacity-06',
        enablePageTitleIcon: true,
        enablePageTitleSubheading: true,
        enablePageTabsAlt: false,
    },
    reducers: {
        setEnableBackgroundImage(state, action) {
            state.enableBackgroundImage = action.payload;
        },

        setEnableFixedHeader(state, action) {
            state.enableFixedHeader = action.payload;
        },

        setEnableHeaderShadow(state, action) {
            state.enableHeaderShadow = action.payload;
        },

        setEnableSidebarShadow(state, action) {
            state.enableSidebarShadow = action.payload;
        },

        setEnablePageTitleIcon(state, action) {
            state.enablePageTitleIcon = action.payload;
        },

        setEnablePageTitleSubheading(state, action) {
            state.enablePageTitleSubheading = action.payload;
        },

        setEnablePageTabsAlt(state, action) {
            state.enablePageTabsAlt = action.payload;
        },

        setEnableFixedSidebar(state, action) {
            state.enableFixedSidebar = action.payload;
        },

        setEnableClosedSidebar(state, action) {
            state.enableClosedSidebar = action.payload;
        },

        setEnableMobileMenu(state, action) {
            state.enableMobileMenu = action.payload;
        },

        setEnableMobileMenuSmall(state, action) {
            state.enableMobileMenuSmall = action.payload;
        },

        setEnableFixedFooter(state, action) {
            state.enableFixedFooter = action.payload;
        },

        setBackgroundColor(state, action) {
            state.backgroundColor = action.payload;
        },

        setHeaderBackgroundColor(state, action) {
            state.headerBackgroundColor = action.payload;
        },

        setColorScheme(state, action) {
            state.colorScheme = action.payload;
        },

        setBackgroundImageOpacity(state, action) {
            state.backgroundImageOpacity = action.payload;
        },

        setBackgroundImage(state, action) {
            state.backgroundImage = action.payload;
        },
    }
})