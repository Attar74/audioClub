<template>
  <div class="flex justify-center">
    <section class="basis-1/2 container mx-auto mt-10">
      <p class="text-center text-3xl">
        About AudioCloud
      </p>
      <P class="text-left">
        As a Audio demo platform, AudioCloud lets people discover and listen to the greatest selection of Audios from the most diverse creator community. Since launching in 2023, the platform has become renowned for its unique content and features, including the ability to share Audio, as well as unearth breakthrough tracks, raw demos, podcasts and more. This is made possible by an open platform that directly connects creators and their fans across the globe. Audio creators use AudioCloud to both share and monetise their content with a global audience, as well as receive detailed stats and feedback from the AudioCloud community.
      </P>
      <p class="text-center mt-10 text-3xl">Contact Me</p>
      <div class="flex justify-center">        
        <ul class="flex mt-3">
          <li class="mr-5 underline flex">            
            <a href="https://www.linkedin.com/in/attar74/" target="_blank" class="text-blue-600">
              <img class="contact-icon"  :src="linkedIn" width="20" />
            </a>            
          </li>
          <li class="underline flex">
            <a href="https://github.com/Attar74" target="_blank" class="text-blue-600">
              <img class="contact-icon" :src="github" width="20" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import useUserStore from "@/stores/user";

export default {
  data() {
    return {
      github: "/assets/img/github.svg",        
      linkedIn: "/assets/img/linkedin.svg",
    }
  },
  beforeRouteEnter(to, from, next) {
    const store = useUserStore();
    if (store.userLoggedIn) {
      next();
    } else {
      next({ name: "home" });
    }
  },
};
</script>

<style>
.contact-icon:hover {
  transform: scale(1.5);
}
</style>
