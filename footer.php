<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package wp-skeleton
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer footer">
		<div class="site-info footer__inner">

			<div>&copy;<?php echo date("Y"); ?> <?php bloginfo( 'name' ); ?></div>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
