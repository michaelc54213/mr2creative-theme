<?php get_header(); ?>
<div class="frame frame--active">

          <div class="frame__border frame__border--horiz frame__border--top-1"></div>
          <div class="frame__border frame__border--horiz frame__border--top-2"></div>
          <div class="frame__border frame__border--horiz frame__border--top-3"></div>
          <div class="frame__border frame__border--vert frame__border--left"></div>
          <div class="frame__border frame__border--horiz frame__border--bottom"></div>
          <div class="frame__border frame__border--vert frame__border--right"></div>

          <div class="leader">
            <div class="sidebar" style="float: left; border: 1px solid #ba9d78; height: 100%; width: 15%;">
                  <?php if (is_active_sidebar( 'home_left_1' ) ) : ?> 
                    <div id="primary-sidebar" class="primary-sidebar widget-area" role="complementary">
                      <?php dynamic_sidebar(' home_left_1' ); ?>
                    </div><!-- #primary sidebar -->
                  <?php endif; ?>
              </div>
              <h1 style=" display: inline-block;" class="blog-title-style"><a href="/wordpress" style="text-decoration: none; color: #ba9d78; margin-left: 10px; font-family: Roboto, sans-serif; font-size: 36px; font-weight: 100;">The Official Mr2Creative Blog</a></h1>
              <!-- MAIN BLOG POST LOOP -->

              <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    
      <div class="blog-post-styles">
      	<h1 class="blog-post-title-style"><?php the_title(); ?></h1>
      	<p class="blog-post-paragraph"><?php echo $post->post_content; ?></p> 
        <span class="date">Posted on <?php the_time('F j, Y'); ?> at <?php the_time('g:i a'); ?></span>
        <span class="author">Writen by <?php the_author(); ?></span>    
      </div>


		<?php endwhile; else : ?>
    
	 	<p><?php _e( 'Sorry, no results found.', 'treehouse-portfolio' ); ?></p>
	
		<?php endif; ?>
    <!-- END MAIN BLOG LOOP -->

        <!-- PAGINATION LINK -->
            <div class="pagination-link">
               <a href="/wordpress"><- Go Back</a>
            </div>
        <!-- END PAGINATION LINK -->
       
          </div>
        </div>  
        
<?php get_footer(); ?>
