<template>
  <main class="min-h-full">
    <!-- <TransitionComponent /> -->
    <!-- <Time /> -->
    <!-- <Notification /> -->
    <Nuxt />
    <LayoutFooter
      class="fixed"
      v-if="
        $nuxt.$route.name != 'index' &&
        $nuxt.$route.name != 'project-slug' &&
        $nuxt.$route.name == 'archive-slug' &&
        $nuxt.$route.name != 'slug'
      "
    ></LayoutFooter>
  </main>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import Time from '@/components/Time.vue';
// import Notification from '@/components/Notification.vue';
// import TransitionComponent from '~/components/TransitionComponent.vue';
import Lenis from '@studio-freight/lenis'; 


export default {
  methods: {
    ...mapActions(['setTitle']),
    ...mapMutations(['SET_FOOTER', 'CLOSE_MENU']),
  },
  data() {
    return {
      // loading: true,
      // ... other data properties
    };
  },
  mounted() {
    // Create a new instance of Lenis
    const lenis = new Lenis({
    duration: 1,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: true,
    touchMultiplier: 2,
});

    // Set up a scroll event listener
    lenis.on('scroll', (e) => {
      // Handle scroll events here
      console.log(e);

      // You can access scroll-related properties from the 'e' object
      // For example, you can use e.scrollTop to get the current scroll position.
    });
        // Create a requestAnimationFrame function to keep the scroll listener active
        function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the requestAnimationFrame loop
    requestAnimationFrame(raf);
  },
  components: {
    // TransitionComponent,
    // ImagePlaceholder,
    // Notification,
    Time,
  },
  watch: {
    $route: function (value) {
      this.setTitle(false)
      this.SET_FOOTER(false)
      this.CLOSE_MENU()
    },
  },
}
</script>
