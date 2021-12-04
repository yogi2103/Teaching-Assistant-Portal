<template>
  <div>
      <h1 v-bind:style="style0bject">style binding</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function () {
    return {
      sky: "blue",
      fontSize: 20,
      styleObject: {
        color: "red",
        fontSize: "20px",
      },
    };
  },
};
</script>
