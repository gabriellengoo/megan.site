<template>
  <div>
    <!-- <div class="button-container">
      <button @click="switchToList">List</button>
      <button @click="switchToGrid">Grid</button>
    :class="{ 'active-button': displayGrid }"
    </div> bottom-div-->

    
    <div class="pt-[10rem] sm:pt-[9rem] mobilegridpad 2xl:pt-[14rem] lgsctoppad "
    :class="[
              // !displayGrid ? 'listset' : '',
            ]">
      <!-- <div class="button-container  ">
      <button
        class=""
        @click="switchToList"
        :style="{ opacity: !displayGrid ? 1 : 0.3 }"
      >
        List
      </button>
      <span
        class="inline-block px-4 text-midGray"
        speechify-initial-font-family="__europaCondensed_11f9d1, __europaCondensed_Fallback_11f9d1"
        speechify-initial-font-size="16px"
        >/</span
      >
      <button
        class=""
        @click="switchToGrid"
        :style="{ opacity: displayGrid ? 1 : 0.3 }"
      >
        Grid
      </button>
      fill-[#50505000]
    </div> -->

          <div @click="toggleListView" class="buttonlogo fakebtn w-[13vw] h-auto" > 
           
          </div>
    <div class="btndiv flex justify-center" ref="btndiv">
      <div class="button-container">
        <button class="uppercase w-fit" @click="toggleListView">
          {{ displayGrid ? "overview" : "overview" }}
        </button>
      </div>
    </div>

      <client-only>
        <!-- Grid layout -->
        <div
          v-if="displayGrid"
          class="w-full masonry scrolling-container flex flex-col"
          :class="[size]"
          horizontal-order="true"
        >
          <!-- Masonry content here w-[99.3vw]-->
          <div
            ref="scrollContainer"
            class="image-cont w-[98vw] flex flex-col fade-in-out"
            :class="{ 'fade-in': displayGrid, 'fade-out': !displayGrid }"
          >
            <!-- scroll part -->
            <div>


              <!-- non scroll copy -->

              <div class="scroll-container" @wheel="handleScroll">
    

                <div
                  v-for="item in items"
                  :key="item._key"
                  class="insidescrollcont"
                >
                  <NuxtLink
                    class="ani uppercase hover"
                    v-if="!item.draft && item.reference.slug"
                    :to="`/poems/${item.reference.slug}`"
                  >
                    <figcaption :class="{ 'text-left ': !displayGrid }">
                      <!--  :class="size == 'small' ? 'smaller-text' : ''" 
                          width: calc(32.33vw - 20px);-->
                      <div
                        :style="{ width: `calc(${item.imageWidth}vw - 10px)` }"
                        :class="size == 'small' ? 'smaller-text' : ''"
                        class="lgsctext mobilesize resize-animation flex flex-col pb-[1.5vw] md:pb-[.2vw] p-[.2vw] pl-0"
                      >
                        {{ item.title ? item.title : item.reference.title }}
                      </div>
                    </figcaption>

                    <!-- bordercont -->
                    <div class="   ">
                      <MediaImage
                        ref="scrollContainer"
                        @mouseenter="handleMouseEnter"
                        @mouseleave="handleMouseLeave"
                        :src="item.image.image"
                        v-if="item.image.image"
                        :metadata="item.image.image"
                        class="scrollcost resize-animation hover"
                        :style="{
                          opacity: imageOpacity,
                           width: `calc(${item.imageWidth}vw - 10px)`,
                        }"
                      > 
                      </MediaImage>
                      <MediaVideo
                        ref="scrollContainer"
                        :id="item.video.id"
                        v-if="item.video.id"
                        :metadata="item.video.id"
                        :style="{
                          opacity: imageOpacity,
                          width: `calc(${item.imageWidth}vw - 10px)`,
                        }"
                        class="scrollcost resize-animation"
                        :poster="`https://image.mux.com/${item.video.id}/thumbnail.jpg?time=${item.thumbnailTime || 0}`"
                      ></MediaVideo>
                    </div>
                    <!--  md:w-[auto] lg:w-[auto] md:w-[26vw] lg:w-[26vw]   :thumbnailTime="item.thumbnailTime" -->
                    <div
                      :style="{ width: `calc(${item.imageWidth}vw - 10px)` }"
                      class="lgsctext mobilesize resize-animation leading-[1.2] md:leading-[1] pt-2 overflow-hidden md:w-[26vw] lg:w-[26vw] w-[90vw] text-lg stroke-black stroke-1 flex flex-wrap  normal-case font-medium"
                    >
                    <!-- <div class=""> -->
                      <p v-if="item.photographer">{{ item.photographer }}<span v-if="item.production">,&nbsp; </span></p>
                      <!-- <p v-if="item.production">{{ item.production }}<span v-if="item.styleing">, </span></p> -->
                      <p v-if="item.styleing">{{ item.styleing }}<span v-if="item.hair">,&nbsp; </span></p> 
                      <p v-if="item.hair">
                        {{ item.hair }}<span v-if="item.makeup">,&nbsp; </span>
                      </p>
                      <p v-if="item.makeup">
                        {{ item.makeup }}<span v-if="item.dop">,&nbsp; </span>
                      </p>
                      <p v-if="item.dop">
                        {{ item.dop }}<span v-if="item.set">,&nbsp; </span>
                      </p>
                      <p v-if="item.set">
                        {{ item.set }}
                      </p>
                    <!-- </div> -->
                    </div>
                  </NuxtLink>
                </div>
 
                <!-- </vue-marquee-slider> -->
              </div>
            </div>
          </div>
         </div>
         

        <!-- List layout -->

        <div
          v-else
          class="list-container min-h-screen uppercase fade-in-out"
          :class="{ 'fade-in': !displayGrid, 'fade-out': displayGrid }"
        >
      
          <div
            class="list-container"
            :class="[
              !displayGrid ? 'listset' : '',
              size == 'small' ? 'mb-0 md:mb-1 2xl:mb-2' : '',
            ]"
          >
            <div
              class="list-header uppercase h-space-12 md:h-space-6 2xl:h-space-4 custom-text-size"
            >
              <div class="projectmobileyes flex">

  <button
    class="uppercase  pr-3"
    @click="toggleProductionView"
    :class="{
      'text-opacity-100': displayProduction,
      'text-opacity-25': !displayProduction,
    }"
  >
    Role 
  </button>
  /
  <button
    class="uppercase pl-3"
    @click="toggleLocationView"
    :class="{
      'text-opacity-100': displayLocation,
      'text-opacity-25': !displayLocation,
    }"
  >
    Location
  </button>
</div>



              <!-- <div>Photographer</div> -->
              <div></div>
              <div></div>
            </div>
        

            <div class="hoverarealist bg-[#f7f7f7]" @mouseover="toggleListImageOnHover"
            @mouseleave="toggleListImageOnLeave">
              <!--  @mouseover="toggleListImage"
            @mouseleave="toggleListImage" -->
              <div
                class="liststuff relative transition-opacity duration-300 item"
                v-for="item in items"
                :key="item._key"
                :class="[
                  item.double ? 'double' : '',
                  item.spacer != 0 ? '' : '',
                  item.image.image || item.video.id ? '' : 'hidden md:block',
                  activeTalent &&
                  activeTalent != item.reference.talentId &&
                  activeTalent != item.reference &&
                  activeTalent != item.video.id
                    ? 'text-opacity-25'
                    : '',
                  !displayGrid ? 'list-layout-item' : '', // Add list layout class
                ]"
              >
                <!--  @mouseenter="hoveredItem = item; 
            lastHoveredItem = item"
            @mouseleave="hoveredItem = null" -->
                <figure
                  class="list-container"
                  :class="[
                    item.spacer
                      ? `h-space-${item.spacer + 1}  md:h-space-${item.spacer}`
                      : item.image.aspect >= 1
                      ? item.double
                        ? 'h-space-5 md:h-space-3 2xl:h-space-4'
                        : 'h-space-5 md:h-space-3 2xl:h-space-2'
                      : item.double
                      ? 'h-space-18 md:h-space-12 2xl:h-space-8'
                      : 'h-space-12 md:h-space-6 2xl:h-space-4',
                    size == 'small' ? 'mb-0 md:mb-1 2xl:mb-2' : '',
                  ]"
                >
                  <NuxtLink
                    :class="[
                      containerClass,
                      item.image.position == 'right'
                        ? 'items-end'
                        : item.image.position == 'center'
                        ? 'items-center'
                        : 'items-start',
                    ]"
                    v-if="!item.draft && item.reference.slug"
                    :to="`/poems/${item.reference.slug}`"
                    @mouseenter.native="hover(item)"
                    @mouseleave.native="leave()"
                  >
                    <!--  for fade to work
                @mouseenter.native="hover(item)"
                @mouseleave.native="leave()" -->
                    <span
                      class="flex flex-col items-start h-full max-w-full relative"
                      :class="size == 'small' ? 'w-full' : 'w-auto'"
                    >
                      <figure
                        :class="
                          size == 'small' ? 'block w-full' : 'h-full w-auto'
                        "
                        :style="
                          item.video && item.video.aspect && size == 'small'
                            ? `aspect-ratio: ${item.video.aspect.replace(
                                ':',
                                '/'
                              )}`
                            : ''
                        "
                      > 

                  <div class="sticky contain-image " :style="{ position: fixedPosition, top: fixedTop }" ref="containImage">
                    <span class="imgcont">
                      <MediaImage
                        :size="item.image.size"
                        :aspect="item.image.aspect"
                        :src="item.image.image"
                        v-if="item.image.image"
                        
                        :class="[
                  activeTalent &&
                  activeTalent != item.reference.talentId &&
                  activeTalent != item.reference &&
                  activeTalent != item.video.id
                    ? 'image-opacity-0'
                    : '',
                  !displayGrid ? 'list-layout-item' : '',
                ]"

                        class="borderlist listimg "
                        :sizes="
                          size == 'sm' ? 'sm:60vw md:15vw' : 'sm:150vw md:150vw'
                        "
                 
                      ></MediaImage>
                    </span>
                    <!--   :class="{ 'image-opacity-0': !hoveredItem }" -->
                    <span class="videocont">
                      <MediaVideo
                        :id="item.video.id"
                        :src="item.video.id"
                        v-if="item.video.id"
                        :poster="`https://image.mux.com/${item.video.id}/thumbnail.jpg?time=${item.thumbnailTime || 0}`"
                        :sizes="
                          size == 'sm' ? 'sm:60vw md:15vw' : 'sm:150vw md:150vw'
                        "
                             :class="[
                  activeTalent &&
                  activeTalent != item.reference.talentId &&
                  activeTalent != item.reference &&
                  activeTalent != item.video.id
                    ? 'image-opacity-0'
                    : '',
                  !displayGrid ? 'list-layout-item' : '',
                ]"
                        class="borderlist listimg"
                      ></MediaVideo>
                    </span>
                  </div>
                        <!--   @mouseenter="hoveredItem = item"
                      @mouseleave="hoveredItem = null" -->
                        <figcaption
                          class="listText relative flex w-full cursor-pointer pl-[32vw] leading-[17px] duration-300 hover:!text-black focus:!text-black group-hover:text-midGray"
                          v-if="size == 'small'"
                          :class="{ 'text-left ': !displayGrid }"
                        >
                          <div class="listTextInner">
                            <div :class="size == 'small' ? 'smaller-text' : ''">
                              {{
                                item.title ? item.title : item.reference.title
                              }}
                            </div>
                          </div>

                          <!-- desk shot by -->
                          <div class="listTextInner photomobile nomobile">
                            <div
                              :class="size == 'small' ? 'smaller-text' : ''"
                              class="photographer-container nomobile"
                            >
                              <div
                                class="photographer"
                                v-if="item.production"
                              >
                                <!-- {{ item.photographer }} -->
                                {{ item.production }}
                              </div>
                            </div>
                          </div>

                            <!-- location -->
                            <div class="listTextInner photomobile nomobile">
                            <div
                              :class="size == 'small' ? 'smaller-text' : ''"
                              class="photographer-container nomobile"
                            >
                              <div
                                class="location"
                                v-if="item.location"
                              >
                                {{ item.location }}
                              </div>
                            </div>
                          </div>

                          <!-- mobile year and shot by -->
                          <div class="listTextInner yearmobile nodesk">
  <!-- <div v-if="displayPhotographer" :class="size == 'small' ? 'smaller-text' : ''" class="photographer-container nodesk">
    <div class="photographer" v-if="item.photographer">{{ item.photographer }}</div>
  </div> -->
  <div v-if="displayProduction" :class="size == 'small' ? 'smaller-text' : ''" class="year-container yearmobile nodesk">
    <div class="year yearmobile nodesk">{{ item.production }}</div>
  </div>
  <div v-if="displayLocation" :class="size == 'small' ? 'smaller-text' : ''" class="year-container yearmobile nodesk">
    <div class=" year yearmobile nodesk" v-if="item.location">{{ item.location }}</div>
  </div>
</div>

                          <!-- desk year -->
                          <!-- <div class="listTextInner yearmobile nomobile desk">
                            <div
                              :class="size == 'small' ? 'smaller-text' : ''"
                              class="year-container yearmobile"
                            >
                              <div class="year yearmobile">
                                {{ item.production }}
                              </div>
                            </div>
                          </div> -->
                        </figcaption>

                        <!-- was here -->
                      </figure>
                    </span>
                  </NuxtLink>

                </figure>
              </div>
            
            </div>
          </div>
          <!-- </div> -->
        </div>
      </client-only>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import Vue from "vue";
import VueMarqueeSlider from "vue-marquee-slider";
// import LocomotiveScroll from 'locomotive-scroll';
// import client from './SanityClient.js'
import { SanityClient } from "@sanity/client";

Vue.use(VueMarqueeSlider);

export default {
  props: ["items", "size", "hoveredItem" ],
  
  data() {
    return {
      project: false,
      isHovered: false,
      scrollLeft: 0,
      displayListImage: true,
      // displayRole: true,
      // displayThird: true, 
      // displayLocation: true,
      // currentView: 'photographer', 
    displayPhotographer: false,
    displayProduction: true,
    displayLocation: false,

      imageOpacity: 1, // Add this property
      displayGrid: true, // Use displayGrid to track the layout state
      // isListView: true,

      fixedPosition: 'relative', // Default position
      fixedTop: 0, // Default top value
    };
  },
  computed: {
    ...mapState(["activeProject", "activeTalent"]),
    isMobile() {
      return window.innerWidth <= 768; // Adjust the width threshold as needed
    },
  },
  mounted() {
    this.redraw();

  },

  methods: {

    ...mapMutations(["SET_ACTIVE_PROJECT", "SET_ACTIVE_TALENT"]),





    toggleListImageOnHover() {
      this.isHovered = true; // Set the hover state to true
    },
    toggleListImageOnLeave() {
      this.isHovered = false; // Set the hover state to false
    },

    toggleListImage() {
      this.displayListImage = !this.displayListImage;

    
    },


    toggleListView() {
      this.displayGrid = !this.displayGrid;
      // You can also add logic to redraw the layout here if needed

      // After toggling, update the styles
      this.$nextTick(() => {
        // After toggling, update the styles
        this.updateStyles();
      });
    },
 
      updateStyles() {
      // Get the height of the target element
      const containImageHeight = this.$refs.btndiv.offsetHeight;

      // Update the data properties to apply the styles
      this.fixedPosition = 'fixed';
      this.fixedTop = `${containImageHeight}px`;
    },
    
    togglePhotographerView() {
    this.displayPhotographer = !this.displayPhotographer;
    this.displayProduction = false;
    this.displayLocation = false;
  },

  toggleProductionView() {
    this.displayPhotographer = false;
    this.displayProduction = !this.displayProduction;
    this.displayLocation = false;
  },

  toggleLocationView() {
    this.displayPhotographer = false;
    this.displayProduction = false;
    this.displayLocation = !this.displayLocation;
  },

  // toggleRoleView() {
  //   this.displayRole = !this.displayRole;
  //   this.displayPhotographer = true;
  //   this.displayProduction = false;
  //   this.displayLocation = false;
  // },
    // Add these methods to control the scroll animation
    handleMouseEnter() {
      // Pause the animation on hover
      this.pauseScrollAnimation();
    },
    handleMouseLeave() {
      // Resume the animation when the mouse leaves
      this.resumeScrollAnimation();
    },

    handleScroll(event) {
      // Check if scrolling up (event.deltaX < 0)
      if (event.deltaX < 0) {
        // Scroll left
        this.scrollLeft += 10; // Adjust the scroll speed as needed
        this.$refs.scrollContainer.scrollLeft = this.scrollLeft;
      }
      
    },
    // Helper functions to control the animation
    pauseScrollAnimation() {
      const scrollContainer = this.$refs.scrollContainer;
      scrollContainer.style.animationPlayState = "paused";
    },
    resumeScrollAnimation() {
      const scrollContainer = this.$refs.scrollContainer;
      scrollContainer.style.animationPlayState = "running";
    },

    redraw() {
      if (typeof this.$redrawVueMasonry === "function") {
        this.$redrawVueMasonry();
      }
    },
    switchToGrid() {
      this.imageOpacity = 1; // Set opacity back to 1 for grid images
      this.displayGrid = true; // Switch to grid layout
      // Use a timeout to ensure proper initialization of Masonry in grid mode
      setTimeout(() => {
        this.redraw();

        // Remove the class after the transition is complete
        setTimeout(() => {}, 1000); // Adjust the duration to match your transition duration
      }, 0);
    },
    switchToList() {
      this.imageOpacity = 0; // Set opacity to 0 for grid images
      this.displayGrid = false; // Switch to list layout
      this.redraw();
    },

    hover(item) {
      if (item.reference.title) {
        this.SET_ACTIVE_PROJECT(item.reference);
        if (this.size == "small") {
          this.SET_ACTIVE_TALENT(item.reference);
        } else {
          this.SET_ACTIVE_TALENT(item.reference.talentId);
        }
      } else {
        this.SET_ACTIVE_PROJECT(false);
      }
    },
    leave() {
      this.SET_ACTIVE_PROJECT(false);
      this.SET_ACTIVE_TALENT(false);
    },
  },
};
</script>

<style scoped>
/* @media (min-width: 768px) {
  pr-6 {
    padding-right: 0rem !important;
  }
  .mobilegridpad{
  padding-top: 6rem;
}

.listimg {
  left: calc(4.79vw - 10px);
}
} */

.listset{
  /* height: 100vh; */
    /* overflow: scroll; */
    position: absolute;
    /* position: relative; */
    /* top: 13vh; */
}

.list-container{
    /* position: absolute; */
    width: 100vw;
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  /* Your tablet-specific styles here */
  .mobilegridpad{
  padding-top: 8.5rem !important;
}


.fakebtn{
    width: 15vw !important;
}
}



/* CSS for laptops with a width of 1024 pixels */
@media only screen and (min-width: 1024px) and (max-width: 1366px) {
  .lgsctoppad{
    padding-top: 6rem;
}
}

@media screen and (max-width: 1023px) {
  /* Your CSS styles for screens smaller than 1024px go here */
  /* For example, you can change the font size or layout */
/* .mobilegridpad{
  padding-top: 6vw;
} */
}
.hoverarealist {
  /* height: 100vh; */
  /* height: auto; */
  /* padding-bottom: 20vh; */
  width: auto;
  background-color: rgba(247, 247, 247, 0) !important;
  z-index: 2;
  position: relative;
  top: 0;
}

.hoverarealist:hover {
  /* background-color: rgb(247 247 247) !important; */
}

.hoverarealist:hover + .listimg {
    display: none;
    opacity: 0;
  }



.listimg {
  /* left: 5vw;
  top: 25vh;
  width: 25vw;
  height: auto; */
  height: auto;
    /* position: absolute; */
    width: 25vw;
      width: calc(28.33vw - 20px);
    left: 3vw;
        left: calc(4.03vw - 10px);
    /* top: 21vh; */
    /* top: calc(21vh - 14px); */
    /* pointer-events: none; */
    padding-top: 0.4vh;
}

@media only screen and (min-width: 1440px) and (max-width: 1680px) {
  .listimg {
    /* top: calc(25vh - 9px); */
}
}

.portrait {
  /* Add your portrait styles here */
  /* height: calc(45.55vh - 20px); */
  width: calc(25.33vw - 20px);
  /* Example: 50% width for portrait images */
}

/* Landscape Styles */
.landscape {
  /* Add your landscape styles here */
  width: calc(45.33vw - 20px);

  /* width: 33.33%; Example: 33.33% width for landscape images */
}
.text-opacity-25 {
  opacity: 0.25;
}

.image-opacity-0 {
  opacity: 0 ;
}
.scrollcost {
  flex: 0 0 calc(33.33% - 20px); /* 33.33% for three images in a row, adjust spacing as needed */
  /* width: 40vh; */
  width: calc(32.33vw - 20px) ;
  /* height: 60vh !important; */
  /* width: auto; */
  /* height: 60vh; */
  /* height: calc(33.33vw - 15px); */
  /* height: 15%; */
}

.bordercont {
  border: 0.5px solid black;
  padding: 0vw !important;
}

.gallmobile {
  transform: scale(10.01) !important;
}
.gallmobile :hover {
  transform: scale(10.01) !important;
}

.bottom-div {
  position: fixed; /* Fixed position so it stays at the bottom even when scrolling */
  bottom: 0; /* Distance from the bottom edge of the viewport */
  left: 0; /* Distance from the left edge of the viewport */
  width: 100%; /* Full width of the viewport */
  padding: 10px; /* Add some padding for better appearance */
}

/* .ani{
  animation-name: src-components-animation-2PZg;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 10000ms;
  animation-direction: reverse;
  animation-play-state: running;
} */

/* .src-components-marqueeSliderContainer-1UFI div{
  margin-right: 0px !important;
  min-width: 0px !important;
} */

/* makes it hotizontal if you ad this as a div around it */
.scroll-container {
  /* width: 100%;  */
  /* width: 100vw;
  overflow-x: scroll !important;
  white-space: nowrap;
  display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: flex-start; */
  /* width: 99.3vw; */
  /* width: 100vw; */
  /* width: 98vw !important; */
  white-space: nowrap;
  /* display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-between; */
  /* display: grid; */
  /* grid-template-columns: 33% 33% 33%; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.insidescrollcont {
  /* height: 59vh; */
  padding-bottom: 25px !important;
}

@keyframes src-components-animation-2PZg {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
.scroll-container div {
  /* position: relative; */
  /* top: 0vh !important; 
  transition: top 0.3s ease; */
  /* padding: .4vw; */
  /* padding-right: 15px; */
}

.scroll-container div:hover {
  /* top: .5vh !important; 
  transition: top 0.3s ease; */
}

.bordercont {
  position: relative;
  top: 0vh !important;
  transition: top 0.3s ease;
  /* padding: .4vw; */
  /* padding-right: 15px; */
}

.bordercont:hover {
  top: 0.8vh !important;
  transition: top 0.3s ease;
}

.scroll-container > * {
  display: inline-block; /* Display content in a horizontal line */
}
/* makes it hotizontal if you ad this as a div around it */

/* img{
  opacity: 1;
  transition: opacity .35s ease;
} */

/* .grid-layout {
  display: grid;
  grid-template-columns: repeat(
    3,
    1fr
  ); 
  gap: 10px; 
} */

/* Grid layout item width */
/* .item {
  width: 33.3333%; 
} */

.scrolling-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* overflow: hidden; */
  /* position: relative;
  width: 100vw; */
  /* animation: scroll 30s linear infinite !important; */
}

.imgin {
  /* display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: hidden; 
  white-space: nowrap;
  width: max-content; */
  /* width: 100vw; */
  /* animation: scroll 30s linear infinite !important;  */
}

@keyframes scroll {
  0% {
    transform: translateX(-98%); /* Start off-screen to the right */
  }
  100% {
    transform: translateX(198%); /* Scroll to the left */
  }
}

.masonry .flex-item {
  /* display: flex; */
  /* flex-direction: row;    */
  /* margin-right: 20px !important; */
  /* margin: auto !important; */
  /* margin-right: auto  !important; 
min-width: auto !important; */
  margin-right: 200px !important;
  min-width: 350px !important;
  /* Add other flex properties as needed */
}
.masonry .flex-item img {
  /* display: flex; */
  /* flex-direction: row; */
  max-height: 30vw;
  /* Add other flex properties as needed */
}

.masonry .flex-item video {
  /* display: flex; */
  /* flex-direction: row; */
  max-height: 30vw;
  /* Add other flex properties as needed */
}

figure {
  /* display: flex; */
  /* flex-direction: column; */
  /* flex-wrap: wrap; */
}

/* Define styles for the list layout */
.list-layout {
  display: flex;
  /* opacity: 0.3;  */
  margin-top: 2px;
  transition: margin 0.3s ease; /* Add a smooth transition effect */
}
.list-layout .item {
  width: 10%; /* List layout item width (full width) */
}

.list-layout:hover {
  /* opacity: 1;  */
  margin-top: 20px; /* Adjust margin as needed for spacing */
  transition: margin 0.3s ease; /* Add a smooth transition effect */
}

/* Hide the images by default */

.list-layout-item .contain-image {
  /* position: fixed; */
  /* position: absolute; */
  /* display: none; */
    pointer-events: none;
    /* height: 100vh;
    width: 100vw; */
    /* top: 1.1vh; */
    /* top: 0; */
    padding-top: 7.5rem;
  justify-content: center;
  align-items: center;
  transition: none !important;
  transition-duration: 0s !important;
  animation: none !important;
  opacity: 0;
}

@media only screen and (min-width: 768px) and (max-width: 1023px){
.list-layout-item .contain-image{
  padding-top: 14.5rem;
}

}

@media only screen and (min-width: 1440px) and (max-width: 1680px) {.list-layout-item .contain-image{
  padding-top: 10.5rem;
}
}

@media only screen and (min-width: 2560px) {
  .list-layout-item .contain-image{
    padding-top: 18rem;
}
}
/* Show the images on hover */
.list-layout-item:hover .contain-image {
  /* display: flex;  */
  opacity: 1;
}

.list-layout-item:nth-child(1) .contain-image {
  /* display: flex ;  */
  opacity: 1;
}



.list-layout-item .contain-image img {
  width: calc(28.33vw - 20px);
    height: auto;
    position: absolute;
    left: 3vw;
    /* top: calc(20vh - 14px); */
    pointer-events: none;
}

.list-layout-item .contain-image video {
  width: calc(28.33vw - 20px);
    height: auto;
    position: absolute;
    left: 3vw;
    /* top: calc(20vh - 14px); */
    pointer-events: none;
}

.list-layout-item .contain-image video {
  width: calc(27.33vw - 20px) !important;
}

.listText div .year{
  display: flex;
    width: 18vw;
    text-align: end;
}


.videocont {
  aspect-ratio: unset !important;
}

figure {
  aspect-ratio: unset !important;
}



.borderlist {
  /* border: 1px black solid; */
  width: 60vh;
}

.videocont {
  padding-top: 10vw;
}

.imgcont {
  /* padding-top: 10vw; */
}

.fakebtn{
  position: absolute;
    top: 1vh;
    padding: 0.5vw;
    padding-left: 0;
    width: 10vw;
    z-index: 100000000;
    cursor: crosshair !important;
    /* z-index: 10; */
}

.list-header{
    display: none;
  }

/* Media query for screens with a maximum width of 768px (mobile devices) */
@media (max-width: 768px) {
  .mobilegridpad{
    padding-top: 7rem;
  }

  .list-header{
    display: flex !important;
  }

  .listset{
  /* height: 100vh; */
    /* overflow: scroll; */
    /* position: absolute; */
    position: unset !important;
    /* top: 13vh; */
}
  .fakebtn{
    width: 16vw !important;
    /* top: 3vh; */
    top: 1vh;
}
  .listimg {
  left: calc(4.79vw - 10px);
}
  .list-header {
    padding-left: 0vw !important;
    width: 63% !important;
  }

  .hidemobile {
    display: none !important;
  }

  .listText {
    padding-left: 0vw !important;
  }

  .list-layout-item:hover .contain-image {
    display: none !important;
  }

  .listText div {
    transition-duration: 0.3s;
    line-height: 17px;
    padding-bottom: 0px  !important;
    cursor: pointer;
    display: flex;
    
    width: 100% !important;
    position: relative;
    padding-right: 0vw;
  }

  .list-container {
    /* position: absolute; */
    /* width: 99vw; */ 
    width: auto;
}

 

  .masonry .flex-item img {
    /* display: flex; */
    /* flex-direction: row; */
    max-height: 65vw !important;
    max-height: 95vw !important;
  }

  .masonry .flex-item video {
    /* display: flex; */
    /* flex-direction: row; */
    max-height: 65vw !important;
    max-height: 95vw !important;
  }
}

/* Add styles for the horizontal title list */
.horizontal-title-list-right {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end; /* Align the content to the right */
  margin-right: 25%;
}

.horizontal-title-item {
  width: calc(33.33% - 10px);
  margin-right: 10px;
  white-space: nowrap;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px; /* Adjust margin as needed for spacing */
  transition: margin 0.3s ease; /* Add a smooth transition effect */
}

.horizontal-title-item:hover {
  margin-top: 20px; /* Adjust margin as needed for spacing */
  transition: margin 0.3s ease; /* Add a smooth transition effect */
}

.hover {
  top: 0vh;
  position: relative;
  /* margin-top: 2px; */
  /* transition: margin 0.3s ease;  */
  transition: top 0.3s ease;
}

.hover:hover {
  position: relative;
  /* margin-top: 10px !important;  */
  top: 0.4vh !important;
  /* transition: margin 0.3s ease; */
  transition: top 0.3s ease;
}

.button-container {
  /* width: 100vw; */
  display: flex;
  justify-content: flex-end; /* Align buttons to the top right */
  margin-top: 0px;
  text-transform: uppercase;
  font-size: 1.25rem;
  line-height: 1.75rem;
  z-index: 10;
  position: relative;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
      width: 98vw;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
}

.button-container button {
  /* display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 97vw; */
}

@media (min-width: 768px) {
  .button-container {
    
    font-size: 1.25rem;
    line-height: 1.75rem /* Adjust the font size for larger screens */;
  }
}

/* Media query for screens with a minimum width of 1024px */
@media (min-width: 1024px) {
  .button-container {
    font-size: 1.25rem;
    line-height: 1.75rem /* Adjust the font size for even larger screens */;
  }
}

.list-header {
  /* width: calc(33.33% - 10px); */
  /* margin-right: 10px; */
  /* display: flex; */
  /* flex-wrap: wrap; */
  justify-content: space-between;
  /* align-items: center; */
  /* margin-bottom: 40px; */
  padding-left: 35vw;
  width: 100%;
}

.list-header div {
  width: 4.5vw;
}

.photographer {
  /* text-align: end; */
  /* margin-left: 10px; */
  /* padding-left: 10rem; */
}

.listTextInner {
  /* padding-left: 40vw; */
  width: 28%;
  position: relative;
  line-height: 17px;
  transition-duration: 0.3s;
}

/* .listText span{
  width: 58%;
    position: relative;
  justify-content: space-between;
} */

.listText div {
  transition-duration: 0.3s;
  /* line-height: 17px; */
  padding-bottom: 2px;
  cursor: pointer;
  display: flex;
  width: 29vw;
  width: 24vw;
  width: inherit;
  /* width: 100%; */
  position: relative;
  padding-right: 0.4vw;
}

.year-container {
  justify-content: flex-end;
  /* width: auto !important; */
}
/* Default font size for smaller screens */
.custom-text-size {
  font-size: 1.25rem /* 20px */;
  line-height: 1.75rem;
}

.nodesk {
    display: none !important;
  }

/* Media query for screens with a minimum width of 768px */
@media (min-width: 768px) {
  .custom-text-size {
    font-size: 1.25rem /* 20px */;
    line-height: 1.75rem; /* Adjust the font size for larger screens */
  }
}

@media (max-width: 768px) {
  /* Your CSS rules for mobile devices here */
  .scroll-container {
    /* width: 100%; */
    width: auto;
    /* width: 98vw !important; */
    white-space: nowrap;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: space-between;
    flex-direction: column;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  .scrollcost {
    /* flex: 0 0 calc(33.33% - 20px); */
    height: unset !important;
    width: calc(99.33vw - 15px) !important;
  }

  .mobilesize {
    width: calc(99.33vw - 15px) !important;
  }

  .button-container {
    width: unset;
    width: 97vw;
  }

  .yearmobile {
    justify-content: flex-end !important;
    /* display: none  !important; */
  }

  .list-header div {
    width: auto;
  }

  .listText div {
    /* justify-content: space-between; */
    /* width: 100vw; */
    display: flex;
    justify-content: space-between;
    width: 100vw;
    flex-direction: row;
  }

  .photographer {
    justify-content: flex-end !important;
    text-align: end;
  }

  .projectmobile {
    display: none !important;
  }

  .projectmobileyes {
    display: flex !important;
    padding-bottom: 3vh;
  }

  .photomobile {
    display: none !important;
  }

  .list-header {
    display: unset;
  }

  .nodesk {
    display: flex !important;
  }

  .nomobile {
    display: none !important;
  }

  .list-layout-item:nth-child(1) .contain-image {
    display: none !important;
}
}

.projectmobileyes {
  display: none;
}

.photomobile {
  display: contents !important;
}

.desk {
  display: contents;
}

/* Media query for screens with a minimum width of 1024px */
@media (min-width: 1024px) {
  .custom-text-size {
    font-size: 1.25rem /* 20px */;
    line-height: 1.75rem; /* Adjust the font size for even larger screens */
  }
}

.smaller-text {
  font-size: 1.25rem /* 20px */;
  line-height: 1.25rem; /* Adjust the font size as needed */
}

/* Media query for screens with a minimum width of 768px */
@media (min-width: 768px) {
  .smaller-text {
    font-size: 1.25rem /* 20px */;
    line-height: 1.25rem; /* Adjust the font size for larger screens */
  }
}

/* Media query for screens with a minimum width of 1024px */
@media (min-width: 1024px) {
  .smaller-text {
    font-size: 1.25rem /* 20px */;
    line-height: 1.25rem; /* Adjust the font size for even larger screens */
  }
}

/* Class for fading in */
.fade-in {
  animation: fadeIn 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-out {
  animation: fadeOut 1s;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>