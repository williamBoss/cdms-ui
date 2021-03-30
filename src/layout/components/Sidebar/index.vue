<template>
    <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar :class="settings.sideTheme" wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route, index) in sideBarNav"
                    :key="route.path  + index"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

export default {
    mounted () {
        console.log('sideBarNav', this.sideBarNav);
    },
    components: { SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["sidebarRouters", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        isCollapse() {
            return !this.sidebar.opened;
        },
        sideBarNav () {
            let _result = []
            this.sidebarRouters.map(route => {
                if (route.unfold) {
                   _result.push(...route.children) 
                } else {
                    _result.push(route)
                }
            })
            // console.log('筛选结果：', _result)
            return _result
        }
    },
    watch: {
        sidebarRouters: (val) => {
            console.log('sidebarRouters: ', sidebarRouters)
        }
    }
};
</script>
