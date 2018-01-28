<?php

add_theme_support('menus');		//creates theme support for menus
add_theme_support( 'post-thumbnails' );	//creates theme support for post thumbnails

add_action('widgets_init', 'unregister_default_widgets', 11);

function wpt_excerpt_length($length) {

	return 100; //length of preview excerpt

}

/** Register a sidebar and add widgets for blog **/
function arphabet_widgets_init() {

	register_sidebar( array(
		'name'	=> 'Home Left sidebar',
		'id'	=>	'home_left_1',
		'before_widget'	=>	'<div>',
		'after_widget'	=>	'</div>',
		'before_title'	=>	'<h3 class="widget-title">',
		'after_title'	=>	'</h3>',
		)	);

}

add_action('widgets_init', 'arphabet_widgets_init');

add_filter('excerpt_length', 'wpt_excerpt_length', 999);

//Queues in the CSS styles
function wpt_theme_styles() {

	wp_enqueue_style('main_css', get_template_directory_uri() . '/css/main.css');
	wp_enqueue_style('application_css', get_template_directory_uri() . '/css/application.css');
	wp_enqueue_style('lightbox_css', get_template_directory_uri() . '/css/lightbox.css');
	wp_enqueue_style('jquery_fullpage_css', get_template_directory_uri() . '/css/jquery.fullPage.css');
	wp_enqueue_style('jquery_arcticmodal_0.3_css', get_template_directory_uri() . '/css/jquery.arcticmodal-0.3.css');


}

add_action('wp_enqueue_scripts', 'wpt_theme_styles');

//Queues in the JS Scripts
function wpt_theme_js() {

	wp_enqueue_script( 'script_all_js', get_template_directory_uri() . '/js/script-all.js', array('jquery'), '', false );
	wp_enqueue_script( 'jquery_slimscroll_min_js', get_template_directory_uri() . '/js/jquery.slimscroll.min.js', array('jquery'), '1.0.0', false );
	wp_enqueue_script( 'jquery_videobackground_js', get_template_directory_uri() . '/js/jquery.videobackground.js', array('jquery'), '1.0.0', false );

}

add_action('wp_enqueue_scripts', 'wpt_theme_js');
