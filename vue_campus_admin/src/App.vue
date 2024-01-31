<!-- Vue应用的根组件。App.vue通常作为应用的主容器，其他组件通过Vue Router在这里动态加载。 -->
<!--
<template>标签包含了组件的HTML模板。在这个模板中，定义了一个div元素，其id属性为"app"。这个div作为应用的根元素，所有的Vue组件将在这个元素内渲染。
<router-view />是Vue Router的一个路由出口，用于显示当前路由地址对应的视图组件。当路由改变时，<router-view />加载和渲染适当的组件，实现单页面应用的页面切换而不需要重新加载整个页面。
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
<!-- 这部分是一个标准的Vue组件选项对象，通过export default导出。 -->
<!-- name: 'App'：为当前组件命名为"App"。这对于调试或Vue DevTools中的组件树非常有用。 -->
export default  {
  name:  'App',
    <!-- metaInfo()：这是一个方法，可能是用于集成vue-meta这样的库，用于管理页面的meta信息（如标题）。这个函数返回一个对象，该对象定义了如何设置文档的标题和模板。 -->
    // 1) title：从Vuex存储的state中动态获取标题。这里使用了逻辑与操作符(&&)，意味着如果this.$store.state.settings.dynamicTitle为true，则使用this.$store.state.settings.title作为页面标题
    // 否则，title的值为undefined，不会设置文档标题。
    // 2) titleTemplate：一个函数，用于定义文档标题的模板。如果有标题传入，它会将传入的标题和环境变量VUE_APP_TITLE组合成一个新的字符串；如果没有标题传入，仅使用环境变量VUE_APP_TITLE作为页面标题。
    // 这允许在.env文件中配置应用的默认标题，并根据需要动态更改。
    metaInfo() {
        return {
            title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
            titleTemplate: title => {
                return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
            }
        }
    }
}
</script>
