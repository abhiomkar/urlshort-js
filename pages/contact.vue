<template>
  <div class="container">
    <div>Please contact <a href="mailto:brajeshwar@oinam.com">brajeshwar@oinam.com</a> for any queries.</div>
    <br/>
  </div>
</template>

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

a {
  color: $accentColor;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
}
</style>