/* $Id: mod_ahcountdown.js,v 1.4 2009/02/16 23:42:10 sqrt Exp $ */

/*
 * mod_ahcountdown.js
 *
 * Copyright (c) 2009 Andreas Hein <andreas@h-ein.de>
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
 *
 */

/* some global vars */
var ts_to        = 0;  /* future timestamp (utc) */
var ts_from      = 0;  /* current timestamp (utc) */
var diff_days    = 0;
var diff_hours   = 0;
var diff_minutes = 0;
var diff_seconds = 0;

var showDays    = 0;
var showHours   = 0;
var showMinutes = 0;
var showSeconds = 0;


/* 
 * call initCountdown() before showCountdown() 
 *
 * _ts: timestamp
 * _sd: show days (0|1)
 * _sh: show hours (0|1)
 * _sm: show minutes (0|1)
 * _ss: show seconds (0|1)
 *
 * example:   initCountdown(1234567890, 1, 1, 1, 0);
 *
 */
function initCountdown(_ts, _sd, _sh, _sm, _ss)
{
  /* initialize global vars */
  ts_to       = _ts;
  showDays    = _sd;
  showHours   = _sh;
  showMinutes = _sm;
  showSeconds = _ss;

  /* show countdown */
  setTimeout('showCountdown()', 300);
}


/* show Countdown */
function showCountdown()
{
  var update_days    = -99999999;
  var update_hours   = -99999999;
  var update_minutes = -99999999;
  var update_seconds = -99999999;

  /* get current timestamp in seconds (utc) */
  var now = new Date(); 
  ts_from = Math.floor(now.getTime()/1000);

  diff_seconds = ts_to-ts_from;
  if (diff_seconds > 0) {

    /* days */
    diff_days = Math.floor(diff_seconds/86400);
    diff_seconds -= diff_days*86400;

    /* hours */
    diff_hours = Math.floor(diff_seconds/3600);
    diff_seconds -= diff_hours*3600;
    
    /*minutes */
    diff_minutes = Math.floor(diff_seconds/60);
    diff_seconds -= diff_minutes*60;

  } else {
    diff_seconds = "00";
    diff_minutes = "00";
    diff_hours   = "00";
    diff_days    = "00";
  }
  
  /* put countdown values into html document */
  /* days */
  if (showDays && diff_days != update_days) {
    update_days = diff_days;
    try {
      if (diff_days > 0) {
	if (diff_days < 10) diff_days = "0" + diff_days;
	document.getElementById("countdownDays").firstChild.nodeValue = diff_days;
      } else {
	document.getElementById("countdownDays").firstChild.nodeValue = "00";
      }
    } catch(e) { }
  }
  
  /* hours */
  if (showHours && diff_hours != update_hours) {
    update_hours = diff_hours;
    try {
      if (diff_hours > 0 || diff_days > 0) {
	if (diff_hours < 10) diff_hours = "0" + diff_hours;
	document.getElementById("countdownHours").firstChild.nodeValue = diff_hours;
      } else {
	document.getElementById("countdownHours").firstChild.nodeValue = "00";
      }
    } catch (e) { }
  }

  /* minutes */
  if (showMinutes > 0 && diff_minutes != update_minutes) {
    update_minutes = diff_minutes;
    try {
      if (diff_minutes > 0 || diff_hours > 0 || diff_days > 0) {
	if (diff_minutes < 10) diff_minutes = "0" + diff_minutes;
	document.getElementById("countdownMinutes").firstChild.nodeValue = diff_minutes;
      } else {
	document.getElementById("countdownMinutes").firstChild.nodeValue = "00";
      }
    } catch(e) { }
  }
  
  /* seconds */
  if (showSeconds && diff_seconds != update_seconds) {
    update_seconds = diff_seconds;
    try {
      if (diff_seconds > 0 && diff_seconds < 10) diff_seconds = "0" + diff_seconds;
      if (diff_seconds <= 0) diff_seconds = "00";
      document.getElementById("countdownSeconds").firstChild.nodeValue = diff_seconds;
    } catch(e) { }
  }
  
  /* recall countdown() */
  if (showSeconds > 0) {
    setTimeout('showCountdown()', 500);
  } else {
    setTimeout('showCountdown()', 59000);
  }
}
