<template>
  <section class="container">
    <div class="content">
      <div class="header">
        <div class="logo">
          <Logo/>
        </div>
        <h2 class="subtitle">
          URL Short Service
        </h2>
      </div>
      <div class="url-input-container" :class="{'has-errors': hasErrors}">
        <input class="url-input" placeholder="Paste a link to shorten it"
            aria-label="Text input to enter a long url to shorten it"
            v-model="longUrl" autofocus />
        <button class="shorten-url-button" @click="shortenUrl" :disabled="inProgress">
          Shorten
        </button>
      </div>
      <div class="result-card" v-show="result.snug">
        <a class="result-long-url" v-bind:href="result.longUrl">
          {{ result.longUrl }}
        </a>
        <div class="result-separator"></div>
        <div class="result-short-row">
          <div class="result-short-url-container">
            <a class="result-short-url" v-bind:href="result.shortenedUrl">
              {{ result.shortenedUrl }}
            </a>
            <button
                ref="copyButton"
                v-bind:data-clipboard-text="result.shortenedUrl"
                class="result-copy-button"
                aria-label="Copy short url to clipboard"
                @click="setCopied">
                {{ copyText }}
            </button>
          </div>
          <div>
            <span class="result-views">{{ result.views }} views</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import Logo from '~/components/Logo.vue';
import Clipboard from 'clipboard';

export default {
  components: {
    Logo,
  },
  data() {
    return {
      longUrl: '',
      result: {
        longUrl: '',
        snug: '',
        views: 0,
        shortenedUrl: '',
      },
      hasErrors: false,
      origin: '',
      copyText: 'Copy',
      inProgress: false,
    };
  },
  mounted() {
    this.origin = window.origin;

    new Clipboard(this.$refs.copyButton);
  },
  methods: {
    shortenUrl() {
      this.resetState();

      this.longUrl = this.longUrl.trim();
      this.inProgress = true;
      axios.post('https://us-central1-urlshortjs.cloudfunctions.net/shortenUrl', {longUrl: this.longUrl})
      .then((response) => {
        const errorCode = response.data.errorCode;
        if (errorCode) {
          if (errorCode === 2) {
            this.invalidUrl = true;
          }
          this.hasErrors = true;
        }

        this.result.snug = response.data.snug;
        this.result.views = response.data.views || 0;
        this.result.longUrl = this.longUrl;
        this.result.shortenedUrl = this.getShortenedUrl();
        this.longUrl = '';
      })
      .catch(() => {
        this.hasErrors = true;
      })
      .then(() => {
        this.inProgress = false;
      });
    },
    setCopied() {
      this.copyText = 'Copied!';
      setTimeout(() => {
        this.copyText = 'Copy';
      }, 6000);
    },
    getShortenedUrl() {
      if (this.result.snug) {
        return this.origin + '/' + this.result.snug;
      }
      return '';
    },
    resetState() {
      this.snug = '';
      this.hasErrors = false;
      this.invalidUrl = false;
      this.inProgress = false;
      this.result = {
        longUrl: '',
        snug: '',
        views: 0,
        shortenedUrl: '',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/color.scss";
@import "../assets/font.scss";
@import "../assets/variable.scss";

$inputHeight: 52px;
$shortenUrlButtonWidth: 100px;

.container {
  max-width: $contentWidth;
  width: 100%;
  padding: 0 16px;  
  margin: 0 auto;
  display: flex;
  height: 100%;
}

.content {
  max-width: $contentWidth;
  width: 100%;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-95%);  
}

.header {
  width: 100%;
  padding-left: 16px;
}

.subtitle {
  font-size: 15px;
  font-weight: 400;
  color: rgba(0, 0, 0, .54);
}

.links {
  padding-top: 15px;
}

.url-input-container {
  margin-top: 26px;
  height: $inputHeight;
  display: flex;
}

.url-input {
  border: 1px solid #B6B6B6;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .34);
  padding-left: 16px;
  padding-right: $shortenUrlButtonWidth + 16px;
  font-size: 16px;
  width: 100%;
  outline: 0;
  border-radius: 2px;
  height: 100%;
  flex-shrink: 0;
}

.shorten-url-button {
  border: 0;
  background: $accentColor;
  font-size: 18px;
  font-weight: 400;
  color: white;
  font-family: $primaryFont;
  height: 100%;
  width: $shortenUrlButtonWidth;
  border-radius: 0 2px 2px 0;
  transform: translateX(-100%);
  flex-shrink: 0;
  cursor: pointer;
  outline: 0;

  &[disabled] {
    background: rgba(0, 0, 0, .54);
    cursor: default;    
  }
}

.result-card {
  animation: fadeIn 0.24s ease-in-out both;
  border: rgba(0, 0, 0, .24);
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .34);
  background: rgba(0, 0, 0, .01);
  padding: 24px 16px;
  margin-top: 24px;
}

.result-long-url::before {
  background: url('/images/ic_link_black_24px.svg') no-repeat transparent;
  background-size: 18px;
  opacity: 0.7;
  content: ' ';
  display: inline-block;
  height: 18px;
  width: 18px;
  transform: translateY(4px);
}

.result-long-url {
  color: #3C3C3C;
  opacity: .8;
  font-size: 15px;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;

  &:hover {
    text-decoration: underline;
  }
}

.result-separator {
  border-top: 1px solid #979797;
  opacity: .24;
  margin: 18px 0;
}

.result-short-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-short-url-container {
  display: flex;
}

.result-short-url {
  color: $accentColor;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
  display: block;

  &:hover {
    text-decoration: underline;
  }
}

.result-copy-button {
  margin-left: 12px;
  border: 1px solid #0D81FF;
  color: #0D81FF;
  text-transform: uppercase;
  outline: 0;
  font-weight: 600;
  border-radius: 3px;
  cursor: pointer;
  padding: 4px 6px;
  background-color: white;
}

.result-views::after {
  background: url('/images/ic_trending_up_black_24px.svg') no-repeat transparent; 
  background-size: 18px;
  opacity: 0.7;
  content: ' ';
  display: inline-block;
  height: 18px;
  width: 18px;
  transform: translate(4px, 4px); 
}

.url-input-container.has-errors {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
