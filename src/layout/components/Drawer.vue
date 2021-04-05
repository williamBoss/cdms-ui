<template>
  <div>
    <div tabindex="-1" class="drawer"
         :class="['drawer-'+direction, visible && 'drawer-open',modal?'':'no-mask']">
      <div class="drawer-mask" v-if="modal"></div>
      <div class="drawer-content-wrapper"
           :style="[{width: `${drawerSize}`},{transform: visible?'':'translateX(100%)'}]">
        <div class="drawer-content">
          <div class="drawer-wrapper-body">
            <div class="drawer-header" v-if="withHeader" :style="headerStyle">
              <div class="drawer-title" :style="titleStyle">
                <slot name="title">
                  <span :title="title">{{ title }}</span>
                </slot>
              </div>
            </div>
            <section class="drawer-body">
              <slot></slot>
            </section>
          </div>
        </div>
        <div class="setting-drawer-button"
             @click="toggle"
             slot="handle">
          <i v-if="!visible" class="el-icon-arrow-left"></i>
          <i v-else class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    beforeClose: {
      type: Function
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'right',
      validator(val) {
        return [ 'left', 'right', 'top', 'bottom' ].indexOf(val) !== -1;
      }
    },
    size: {
      type: [ Number ],
      default: 300
    },
    title: {
      type: String,
      default: ''
    },
    headerStyle: {
      type: String,
      default: ''
    },
    titleStyle: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    withHeader: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    drawerSize() {
      return `${ this.size }px`;
    }
  },
  data() {
    return {
      preVisible: this.$props.visible
    };
  },
  created() {

  },
  watch: {
    'visible': function(val) {
      this.preVisible = val;
    }
  },
  methods: {
    toggle() {
      this.preVisible = !this.preVisible
      this.$listeners.closedDrawer(this.preVisible)
    }
  }
}
</script>
