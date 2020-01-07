<template>
  <div class="cover-wrap">
    
  </div>
</template>
<script>
export default {
  name: 'cover',
  data() {
    return {
      
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('/rest/Cover/list')
    }
  },
  created() {
    this.fetch()
  },
}
</script>
