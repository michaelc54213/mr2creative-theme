<?php get_header(); ?>
<div class="frame frame--active">

          <div class="frame__border frame__border--horiz frame__border--top-1"></div>
          <div class="frame__border frame__border--horiz frame__border--top-2"></div>
          <div class="frame__border frame__border--horiz frame__border--top-3"></div>
          <div class="frame__border frame__border--vert frame__border--left"></div>
          <div class="frame__border frame__border--horiz frame__border--bottom"></div>
          <div class="frame__border frame__border--vert frame__border--right"></div>

          <div class="leader">
              <h1>MR2Creative Blog</h1>
              
              <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    
      <div class="blog-post-styles" style="margin-bottom: 20px; margin-left: 10px;">
      	<h1><?php the_title(); ?></h1>
      	<p><?php echo $post->post_content; ?></p> 
        <span class="date">Posted on <?php the_time('F j, Y'); ?> at <?php the_time('g:i a'); ?></span>
        <span class="author">Writen by <?php the_author(); ?></span>    
      </div>
	
		<?php endwhile; else : ?>
    
	 	<p><?php _e( 'Sorry, no results found.', 'treehouse-portfolio' ); ?></p>
	
		<?php endif; ?>
        
       
          </div>
        </div>  
        <!-- PAGINATION LINK -->
            <div class="pagination-link">
               <?php posts_nav_link( ' <div style="color: white;">|</div>  ', 'newer post', 'older post' ); ?> 
            </div>
        <!-- END PAGINATION LINK -->
<?php get_footer(); ?>
