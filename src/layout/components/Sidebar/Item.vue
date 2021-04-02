<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const {icon, title} = context.props
    const vnodes = []

    if (icon) {
      const reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
      if (reg.test(icon)) {
        vnodes.push(<div class="img_box"><img src={ icon } alt="" /></div>)
      } else {
        vnodes.push(<div class="img_box">
          <svg-icon icon-class={ icon } />
        </div>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{ (title) }</span>)
    }
    return vnodes
  }
}
</script>
