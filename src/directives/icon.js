export default {
  beforeMount(el, binding) {
    //It's registred as a global directive
    let iconClass = `fa fa-${binding.value}`;

    // You can use :argName which is "full"  in this case as an argument to override the whole class
    if (binding.arg == "full") {
      iconClass = binding.value;
    }

    // You can use .modifierName which is "right" in this case as a modifier to change className
    if (binding.modifiers.right) {
      iconClass += " float-right";
    }

    // You can use .modifierName which is "yellow" in this case as a modifier to change className
    iconClass += binding.modifiers.green
      ? " text-green-400"
      : " text-grey-400 ";

    // You can use .modifierName which is "xxl" in this case as a modifier to change className
    iconClass += binding.modifiers.xxl ? " text-2xl " : " text-xl ";

    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
