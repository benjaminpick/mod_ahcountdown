<?php /* $Id: mod_ahcountdown.php,v 1.8 2009/02/21 13:05:12 sqrt Exp $ /*

/*
 * Copyright (c) 2009 Andreas Hein, <andreas@h-ein.de>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */

if (!defined('_JEXEC')) {
	 die('Restricted access');
}

/* get TimezoneOffset */
$config          = JFactory::getConfig();
$offset          =  $config->get('offset') * 60;

/* get module params */
$time            = $params->get('time');
$date            = $params->get('date');
$output		 = $params->get('output');
$expired         = $params->get('expired');
$showZeroCounter = $params->get('showZeroCounter');

/* sometimes, output gets not set correctly */
if (empty($output)) {
  $output = "<div class=\"myCountdown\">\n[days]:[hours]:[minutes]:[seconds]<br />\n(dd:hh:mm:ss)\n</div>";
 }


/*
 * calculate correct timezone offset value
 * and format it for correct recognition by strtotime()
 */
$offset_hours   = floor($offset/60);
if ($offset < 0){
  $offset = -1 * $offset;
 }

$offset_minutes = $offset - $offset_hours * 60;
if ($offset_minutes < 10) {
  $offset_minutes = "0" . $offset_minutes;
 }

if ($offset_hours >= 0) {
  $offset = '+' . $offset_hours . $offset_minutes;
 } else {
  $offset = $offset_hours . $offset_minutes;
 }

/* get utc timestamp */
$toTime = strtotime("$date $time $offset");

$difference = $toTime - time();
$startDays    = sprintf("%02d",  $difference / 3600  / 24);
$startHours   = sprintf("%02d", ($difference / 3600) % 24);
$startMinutes = sprintf("%02d", ($difference / 60)   % 60);
$startSeconds = sprintf("%02d", ($difference)        % 60);

if (time() < $toTime || $showZeroCounter) {
	$showDays = 0;
	if (strpos($output, '[days]') !== false) {
	  $output = str_replace('[days]', '<span id="countdownDays">' . $startDays . '</span>', $output);
	  $showDays = 1;
	}
	
	$showHours = 0;
	if (strpos($output, '[hours]') !== false) {
	  $output = str_replace('[hours]', '<span id="countdownHours">' . $startHours . '</span>', $output);
	  $showHours = 1;
	}
	
	$showMinutes = 0;
	if (strpos($output, '[minutes]') !== false) {
	  $output = str_replace('[minutes]', '<span id="countdownMinutes">' . $startMinutes . '</span>', $output);
	  $showMinutes = 1;
	}
	
	$showSeconds = 0;
	if (strpos($output, '[seconds]') !== false) {
	  $output = str_replace('[seconds]', '<span id="countdownSeconds">' . $startSeconds . '</span>', $output);
	  $showSeconds = 1;
	}
	
	/* put javascript into <head> */
	$document = JFactory::getDocument();
	$document->addScript('modules/mod_ahcountdown/mod_ahcountdown.js');
	
	/* output */ ?>
	     <?php echo nl2br($output); ?>
		 <script type="text/javascript">
		 initCountdown(<?php echo $toTime; ?>,
			       <?php echo $showDays; ?>,
			       <?php echo $showHours; ?>,
			       <?php echo $showMinutes; ?>,
			       <?php echo $showSeconds; ?>);
	</script>
	    <?php } else {
  echo nl2br($expired);
  echo '<!-- countdown reached -->';
 }
?>
