import Vue from 'vue'
function registerAllComponents(requireContext) {
  return requireContext.keys().forEach(comp => {
    const vueComp = requireContext(comp)
    const compName = /\/([\w]+)\/index\.vue$/.exec(comp)[1]
    Vue.component(compName, vueComp.default)
  })
}

registerAllComponents(require.context('./', true, /\.vue$/))
