export default (App) => {
  var VueRouter = require('vue-router')
  var router = new VueRouter({
    history: true,
    root: '/'
  })
  router.map({
    '/breed':{
      component:require('./components/phone/breed/breed.vue')
    }
  })
  router.start(App, '#app')
}

