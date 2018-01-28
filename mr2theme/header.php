
<!DOCTYPE html>
<html>
  <head>
    <title><?php wp_title('|', true, 'right'); bloginfo('name'); ?></title>
    <meta charset="UTF-8" />
    <meta content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0" name="viewport" />
    

    <?php wp_head(); ?>

  </head>
  <body>

    <div class="main">

      <div class="main__media"></div>

      <div class="main__cover"></div>

      <div class="main__content-holder">
        

        
        <a class="logo" href=""><img alt="logo" title="mr2creative logo" class="logo__img" src="<?php bloginfo('template_directory'); ?>/images/logo.png" /></a>
        <div class="menu">

          <div class="menu__btn-holder js-menu-btn">
            <div class="menu__btn"></div>
          </div>
          <div class="menu__container js-menu">
            <div class="menu__list-holder">
              <div class="menu__empty menu__empty--top"></div>
              <div class="menu__header"></div>
              <div class="menu__body">
                <nav class="menu__list">
                  <a class="menu__item menu__item--1" href=""><span>home</span></a>
                    <a class="menu__item menu__item--2" href=""><span>capabilities</span></a>
                    <a class="menu__item menu__item--3" href=""><span>about us</span></a>
                    <a class="menu__item menu__item--4" href=""><span>contact</span></a>
                    <a class="menu__item menu__item--4" href=""><span>blog</span></a>
                </nav>
                <div class="menu__social">
                  <div class="social">
                    <a class="social__item socicon-facebook" href="https://www.facebook.com/mr2creative/" target="_blank">
                    <a class="social__item socicon-instagram" href="https://www.instagram.com/mr2creative/" target="_blank"></a>
                    <a class="social__item socicon-twitter" href="https://twitter.com/mr2creative" target="_blank"></a>
                  </div>
                </div>
              </div>
              <div class="menu__empty menu__empty--bottom"></div>
            </div>
          </div>

        </div>


