<template>
  <div class="container">
    <div class="body">
      <nuxt/>
    </div>
    <div class="footer-container">
      <div class="footer">
        <nav class="footer-nav">
          <ul class="footer-nav-list">
            <li><nuxt-link to="/" aria-label="Link to home page">Home</nuxt-link></li>
            <li><nuxt-link to="/about" aria-label="Link to home page">About</nuxt-link></li>
            <li><nuxt-link to="/contact" aria-label="Link to home page">Contact</nuxt-link></li>
          </ul>
        </nav>
        <div class="copyright">
          &copy; {{ currentYear }} urlshortjs.com
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: (new Date()).getFullYear(),
    };
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>

<style lang="scss" scoped>
@import '../assets/variable.scss';

$footerHeight: 100px;

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.body {
  height: calc(100vh - #{$footerHeight});
  color: rgba(0, 0, 0, 0.84);
}

.footer-container {
  height: $footerHeight;
  border-top: 1px rgba(0, 0, 0, 0.12) solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footer {
  margin: 0 auto;
  max-width: $contentWidth;
  width: 100%;
  padding: 0 16px;  
}

.copyright {
  color: rgba(0, 0, 0, 0.54);
}

.footer-nav-list {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0 0 8px 0;
}

.footer-nav-list a:first-child {
  margin-left: 0;
}

.footer-nav-list a {
  margin: 0 16px;
  color: rgba(0, 0, 0, 0.84);
  text-decoration: none;
  display: inline-block;
}

</style>
