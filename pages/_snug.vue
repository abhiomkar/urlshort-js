<template>
  <div class="container">
    <Logo/>
    <div v-if="hasErrors" class="not-found-msg">
      <div>Oops! The link that you're looking for is not found or it might've been deleted.</div>
      <a class="go-home-link" href="/" aria-label="Link to navigate to home page">Go to Home →</a>
    </div>
    <div v-else>
      <div class="message">
        Redirecting in <span class="count-down">{{countDown}}</span> seconds...
        <a class="stop-button" @click.prevent="stopTimer" href="#">Stop</a>
      </div>
      <div class="card">
        <div class="link-container">
          <img src="/images/ic_link_black_24px.svg" class="link-icon" />
          <a class="long-url-link" v-bind:href="longUrl">{{longUrl}}</a>
        </div>
        <div>
          <span class="views">{{ views }} views</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Logo from '~/components/Logo.vue';

const GET_LONG_URL_API =
  'https://us-central1-urlshortjs.cloudfunctions.net/getLongUrl';
const COUNTDOWN_SECONDS = 8;
const KNOWN_PATHS = ['about', 'contact'];

export default {
  validate({params}) {
    if (KNOWN_PATHS.indexOf(params.snug) >= 0) {
      return false;
    }

    return /^[a-zA-Z0-9]+$/.test(params.snug);
  },
  async asyncData({params, res}) {
    const response = await axios.get(GET_LONG_URL_API, {
      params: {
        snug: params.snug,
      },
    });

    if (!response.data) {
      res.statusCode = 404;
    }

    const longUrl = response.data.longUrl;
    const views = response.data.views;
    const hasErrors = !longUrl;
    return {
      longUrl,
      views,
      hasErrors,
    };
  },
  components: {
    Logo,
  },
  async mounted() {
    if (this.hasErrors) return;

    while (this.countDown > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (this.isTimerStopped) return;
      this.countDown = this.countDown - 1;
    }
    window.location = this.longUrl;
  },
  data() {
    return {
      longUrl: '',
      hasErrors: false,
      countDown: COUNTDOWN_SECONDS,
      views: 0,
      isTimerStopped: false,
    };
  },
  methods: {
    stopTimer() {
      this.isTimerStopped = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/color.scss';
@import '../assets/variable.scss';

.container {
  max-width: $contentWidth;
  width: 100%;
  padding: 0 16px;  
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  position: relative;
  top: -35px;
}

.message {
  font-size: 15px;
}

.count-down {
  font-size: 22px;
  font-weight: 600;
}

.link-container {
  display: flex;
  align-items: center;
}

.link-icon {
  height: 18px;
  width: 18px;
  opacity: .64;
  margin-right: 6px;
}

.long-url-link {
  color: rgba(0, 0, 0, .84);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: rgba(0, 0, 0, .24);
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .34);
  background: rgba(0, 0, 0, .01);
  padding: 24px 16px;
  margin-top: 24px;
  width: 100%;
}

.stop-button {
  color: #0D81FF;
  text-decoration: none;
  animation: fadeIn 3s ease-in-out both;
  visibility: hidden;
  opacity: 0;
}

.views::after {
  background: url('/images/ic_trending_up_black_24px.svg') no-repeat transparent; 
  background-size: 18px;
  opacity: 0.7;
  content: ' ';
  display: inline-block;
  height: 18px;
  width: 18px;
  transform: translate(4px, 4px); 
}

.not-found-msg {
  padding: 12px 0;
}

.go-home-link {
  padding: 12px 0;
  display: inline-block;
  color: $accentColor;
  text-decoration: none;
  font-weight: 700;
}

@keyframes fadeIn {
  80% {
    visibility: hidden;
    opacity: 0;
  }

  100% {
    opacity: 1;
    visibility: visible;
  }
}


</style>