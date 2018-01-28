<?php get_header(); ?>

<div class="frame frame--active">
          <div class="frame__border frame__border--horiz frame__border--top-1"></div>
          <div class="frame__border frame__border--horiz frame__border--top-2"></div>
          <div class="frame__border frame__border--horiz frame__border--top-3"></div>
          <div class="frame__border frame__border--vert frame__border--left"></div>
          <div class="frame__border frame__border--horiz frame__border--bottom"></div>
          <div class="frame__border frame__border--vert frame__border--right"></div>
       
 
          <div class="leader">
              <div class="sidebar" style="float: left; border: 1px solid #ba9d78; height: 100vh; width: 15%;">
                  <?php if (is_active_sidebar( 'home_left_1' ) ) : ?> 
                    <div id="primary-sidebar" class="primary-sidebar widget-area" role="complementary">
                      <?php dynamic_sidebar(' home_left_1' ); ?>
                    </div><!-- #primary sidebar -->
                  <?php endif; ?>
              </div>
             <h1 style="float: left; display: inline-block;" class="blog-title-style"><a href="/wordpress" style="text-decoration: none; color: #ba9d78; margin-left: 10px; font-family: Roboto, sans-serif; font-weight: 100; font-size: 36px;">The Official MR2Creative Blog</a></h1>
    
          <!-- MAIN BLOG LOOP FOR POSTS -->
              <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    
      <div class="blog-post-styles">
        <h1 class="blog-post-title-style"><?php the_title(); ?><div><a class="click-single-post-style" class=".icon--arrow" href="<?php echo get_permalink(); ?>"?>(Full Post)</a></div></h1>
		<!--If the post has an image, display image -->
		<?php if (has_post_thumbnail) {
			the_post_thumbnail();
		}
		?>
        <p  class="blog-post-paragraph"><?php echo strip_tags( get_the_excerpt() ); ?></p>
        <span class="date">Posted on <?php the_time('F j, Y'); ?> at <?php the_time('g:i a'); ?></span>
        <span class="author">Writen by <?php the_author(); ?></span>    
      </div>

      
  
    <?php endwhile; else : ?>
    
    <p><?php _e( 'Sorry, no results found.', 'mr2theme' ); ?></p>
  
    <?php endif; ?>
    <!-- END POST LOOP -->

        <!-- PAGINATION LINK -->
            <div class="pagination-link" style="color:#ba9d78 ">
               <?php posts_nav_link( ' | ', '<- Newer Posts', 'Older Posts ->' ); ?>
            </div>
        <!-- END PAGINATION LINK -->
       
          </div>
           
  </div>  
       
<?php get_footer(); ?>
