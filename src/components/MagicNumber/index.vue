<template>
  <span
    :style="`font-family: ${fontName}`"
    v-html="value"
  />
</template>

<script>
let id = 0
export default {
  name: 'MagicNumber',
  props: {
    url: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fontName: ''
    }
  },
  watch: {
    url (val) {
      this.generateFont(val)
    }
  },
  mounted () {
    this.generateFont()
  },
  methods: {
    generateFont (url) {
      this.fontName = `magic_${id}`
      const fontStyle = document.createElement('style')
      fontStyle.appendChild(document.createTextNode(`
      @font-face {
        font-family: '${this.fontName}';
        src: url('${url || this.url}');
      }
    `))
      document.head.appendChild(fontStyle)
      id += 1
    }
  }
}
</script>
