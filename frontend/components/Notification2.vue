<template>
       <div class="notificationcont" :class="{ 'slide-in': isVisible }">
      <button @click="closeNotification">
        <div  v-if="isVisible" class="notification">

          <div class="botnoti">
            <div class="flex items-center">
              <ProfilePicture />
              <div class="topline">
                <div class="font-bold toplinein">
                  Web Dev ( Internet Arcitect )
                  <p class="pl-2 font-light text-[grey]">now</p>
                </div>
                <div class="flex flex-row items-start justify-between">
                  <p class="font-light">and soundcloud ngl fireeee</p>
                  <!-- <img  class=" wink " src="/wink.gif"/> -->
                  <img  class=" cat " src="/cat.gif"/>
                </div>
                <!-- <p class="font-light">and soundcloud ngl fireeee</p> -->
              </div>
            </div>
          </div>


       
        </div>
      </button>
    </div>
    
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: false,
        notificationText: "New Notification!",
      };
    },
    methods: {
        showNotification() {
    this.isVisible = true;
  },
  closeNotification() {
    this.isVisible = false;
    // Slide out the notification by setting a delay
    setTimeout(() => {
      this.$refs.notificationcont.style.top = '-100%';
// change here
    }, 10000); // Adjust the delay as needed
  },
    },

    mounted() {
    // Show the notification automatically on mount
    setTimeout(() => {
      // Show the notification automatically after the delay
      this.showNotification();
      
      // Automatically close the notification after another delay
      setTimeout(() => {
        this.closeNotification();
      // time out
      }, 10000); // Adjust the delay as needed
// change here
      // time in
    }, 20000);
  },
  };
  </script>
  
  <style scoped>

</style>
  