export default {
  //It's registred as a local directive
  beforeMount(el, binding) {
    let iconClass = `fa fa-${binding.value.icon} text-green-400 text-xl`;

    // You can use .modifierName which is "right" in this case as a modifier to change className
    if (binding.value.right) {
      iconClass += " float-right";
    }

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
