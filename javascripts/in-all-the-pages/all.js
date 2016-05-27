/******************************
** ======= FUNCTIONS ======= **
*******************************
** 00. fa_initForumModules
** 01. fa_navactif
** 02. fa_theme_changer
** 03. pseudoInputs
** 04. toolbar search mod
** 05. fae_sticky_nav_panel
******************************/


/* -- 00. fa_initForumModules -- */
// initiate the toggler for the widget columns
function fa_initForumModules(column_id) {
  var column = document.getElementById(column_id), menu;

  if (column) {
    column.insertAdjacentHTML('afterbegin', '<div class="title module_column_title">Widget Menu</div>');

    menu = document.createElement('A');
    menu.href = '#';
    menu.title = 'Toggle widget menu';
    menu.className = 'widget_menu column_button_' + column_id + ' color-secondary';

    menu.onclick = function() {
      var column = document.getElementById(this.className.replace(/.*?column_button_(right|left).*/, '$1'));
      if (/active/.test(column.className)) {
        column.className = column.className.replace(/active/, '');
        this.className = this.className.replace(/active/, '');
      } else {
        column.className += ' active';
        this.className += ' active';
      }
      return false;
    };

    // stack index
    column.style.zIndex = 30000;
    menu.style.zIndex = 30001;

    document.body.appendChild(menu);
  }
};


/* -- 01. fa_navactif -- */
// finds the currently active navigation item and adds a classname to it.
function fa_navactif() {
  for (var cleanURI = window.location.href.replace(/\?.*|#.*/, ''), a = document.getElementById('page-header').getElementsByTagName('A'), i = 0, j = a.length; i < j; i++) {
    if (/mainmenu/.test(a[i].className) && cleanURI == a[i].href.replace(/\?.*|#.*/,'')) {
      a[i].className+=' fa_navactif';
      break;
    }
  }
  $('.mainmenu[href="/search"]').removeAttr('onclick');
};


/* -- 02. fa_theme_changer -- */
// theme selector for the forum
(function() {
  window.fa_theme_color = {
    selected : my_getcookie('fa_theme_color') || 'Select a theme',

    palette : {
       'Select a theme' : '',
         'Random theme' : [],
          'Persian Red' : ['#D44', '#C33', '#B22', '#900', '#522'], // hue 000
        'Chestnut Rose' : ['#D77', '#C66', '#B55', '#933', '#533'], // hue 000
                'Eunry' : ['#DAA', '#C99', '#B88', '#966', '#544'], // hue 000
              'Tuscany' : ['#D64', '#C63', '#B52', '#930', '#532'], // hue 020
        'Antique Brass' : ['#DA7', '#C96', '#B85', '#963', '#543'], // hue 029
          'Hokey Pokey' : ['#DA4', '#C93', '#B82', '#960', '#542'], // hue 039
          'Earls Green' : ['#DD4', '#CC3', '#BB2', '#990', '#552'], // hue 060
                'Laser' : ['#DD7', '#CC6', '#BB5', '#993', '#553'], // hue 060
           'Pine Glade' : ['#DDA', '#CC9', '#BB8', '#996', '#554'], // hue 060
               'Celery' : ['#AD4', '#9C3', '#8B2', '#690', '#452'], // hue 080
          'Wild Willow' : ['#AD7', '#9C6', '#8B5', '#693', '#453'], // hue 090
             'Atlantis' : ['#7D4', '#6C3', '#5B2', '#390', '#352'], // hue 100
                'Apple' : ['#4D4', '#3C3', '#2B2', '#090', '#252'], // hue 120
               'Mantis' : ['#7D7', '#6C6', '#5B5', '#393', '#353'], // hue 120
              'De York' : ['#ADA', '#9C9', '#8B8', '#696', '#454'], // hue 120
      'Mountain Meadow' : ['#4D7', '#3C6', '#2B5', '#093', '#253'], // hue 140
              'Emerald' : ['#7DA', '#6C9', '#5B8', '#396', '#354'], // hue 150
             'Shamrock' : ['#4DA', '#3C9', '#2B8', '#096', '#254'], // hue 160
            'Turquoise' : ['#4DD', '#3CC', '#2BB', '#099', '#255'], // hue 180
                'Downy' : ['#7DD', '#6CC', '#5BB', '#399', '#355'], // hue 180
               'Sinbad' : ['#ADD', '#9CC', '#8BB', '#699', '#455'], // hue 180
         'Curious Blue' : ['#4AD', '#39C', '#28B', '#069', '#245'], // hue 200
               'Danube' : ['#7AD', '#69C', '#58B', '#369', '#345'], // hue 210
              'Mariner' : ['#47D', '#36C', '#25B', '#039', '#235'], // hue 220
         'Governor Bay' : ['#44D', '#33C', '#22B', '#009', '#225'], // hue 240
      'Blue Marguerite' : ['#77D', '#66C', '#55B', '#339', '#335'], // hue 240
            'Blue Bell' : ['#AAD', '#99C', '#88B', '#669', '#445'], // hue 240
         'Purple Heart' : ['#74D', '#63C', '#52B', '#309', '#325'], // hue 260
             'Amethyst' : ['#A7D', '#96C', '#85B', '#639', '#435'], // hue 270
               'Purple' : ['#A4D', '#93C', '#82B', '#609', '#425'], // hue 279
               'Cerise' : ['#D4D', '#C3C', '#B2B', '#909', '#525'], // hue 300
         'Fuchsia Pink' : ['#D7D', '#C6C', '#B5B', '#939', '#535'], // hue 300
                'Lilac' : ['#DAD', '#C9C', '#B8B', '#969', '#545'], // hue 300
           'Red Violet' : ['#D4A', '#C39', '#B28', '#906', '#524'], // hue 321
              'Hopbush' : ['#D7A', '#C69', '#B58', '#936', '#534'], // hue 331
             'Hibiscus' : ['#D47', '#C36', '#B25', '#903', '#523'] // hue 340
    },

    change : function(color) {
      var head = document.getElementsByTagName('HEAD')[0],
          style = document.getElementById('fa_theme_style');

      my_setcookie('fa_theme_color', color, true);

      if (color != 'Select a theme') {
        fa_theme_color.selected = color == 'Random theme' ? fa_theme_color.palette['Random theme'][Math.floor(Math.random() * fa_theme_color.palette['Random theme'].length)] : color;
        fa_theme_color.selector.style.backgroundColor = fa_theme_color.palette[fa_theme_color.selected][1];
        fa_theme_color.selector.style.borderColor = fa_theme_color.palette[fa_theme_color.selected][2];
        fa_theme_color.selector.firstChild.innerHTML = 'Default theme';

        if (style) head.removeChild(style);
        $(head).append('<style type="text/css" id="fa_theme_style">' + fa_theme_color.css() + '</style>');

      } else {
        if (style) {
          head.removeChild(style);
        }
        fa_theme_color.selector.style.backgroundColor = '#999';
        fa_theme_color.selector.style.borderColor = '#888';
        fa_theme_color.selector.firstChild.innerHTML = 'Select a theme';
      }
    },

    css : function() {
      var palette = fa_theme_color.palette[fa_theme_color.selected];
      return '.color-primary, .title, h2.u, .h3, .inner h1.page-title, .mainmenu:after, .forumline tbody .catHead, #main-search .search, .search-button, .pagination span a, .pagination span strong, a.button1, a.button2, button.button2, input.button1, input.button2, input.button, #profile-advanced-add a, img[src*="?poll"], .fa_pseudo_radio:after, #tabs, body div.sceditor-dropdown .button, .codebox dt, blockquote cite, .sceditor-container .sceditor-toolbar, #cp-main h1:not(.title), body #fa_toolbar, body #fa_toolbar_hidden, body #fa_toolbar #fa_right #notif_list li.see_all, #fae_sticky_nav_panel a:after { background-color:' + palette[1] + '; }'+
             '.pagination span a:hover, .pagination span strong, a.button1:hover, a.button2:hover, button.button2:hover, input.button1:hover, input.button2:hover, input.button:hover, #profile-advanced-add a:hover, .search-button:hover, body div.sceditor-dropdown .button:hover { background-color:' + palette[2] + '; }'+
             'a.button1:active, a.button2:active, button.button2:active, input.button1:active, input.button2:active, input.button:active, a.button1:focus, a.button2:focus, button.button2:focus, input.button1:focus, input.button2:focus, input.button:focus, .search-button:focus, #tabs a:after, body div.sceditor-dropdown .button:active, body div.sceditor-dropdown .button:focus, body #fa_search #fa_textarea, body #fa_search #fa_magnifier { background-color:' + palette[3] + '; }'+
             '.fa_pseudo_checkbox:after, h2.post-content, h3.post-content, h4.post-content { color:' + palette[1] + '; }'+
             'img[src*="?poll"], .sceditor-container .sceditor-toolbar, .sceditor-container .sceditor-group, body #fa_toolbar, body #fa_toolbar_hidden { border-color:' + palette[2] + '; }'+
             '.color-secondary, .forum-status[style*="locked=true"] { background-color:' + palette[4] + '; }'+
             '.forum-status[style*="state=new"] { background-color:' + palette[0] + '; }'+
             '#search { background-color:' + palette[2] + '; }'+
             '#main-search .search, .search-button { border-color:' + palette[0] + '; }'+
             'input[type="text"]:hover, input.post:hover, input.inputbox:hover, textarea:hover, select:hover, input[type="text"]:focus, input.post:focus, input.inputbox:focus, textarea:focus, select:focus, body div.sceditor-dropdown input:focus, body div.sceditor-dropdown textarea:focus, .fa_pseudo_checkbox:hover, .fa_pseudo_radio:hover, .sceditor-container, h2.post-content, h3.post-content, h4.post-content { border-color:' + palette[1] + ' !important; }'+
             'a { color:' + palette[3] + '; }'+
             'a:hover, a:active { color:' + palette[2] + '; }'+
             '::selection { background-color:' + palette[1] + '; } ::-moz-selection { background-color:' + palette[1] + '; }'+
             '::-webkit-scrollbar-thumb, ::-webkit-scrollbar-button { background-color:' + palette[1] + '; }'+
             '::-webkit-scrollbar-thumb:hover, ::-webkit-scrollbar-button:hover { background-color:' + palette[2] + '; }'+
             '::-webkit-scrollbar-thumb:active, ::-webkit-scrollbar-button:active { background-color:' + palette[3] + '; }';
    }
  };

  var selector = document.createElement('SELECT'), htmlStr = '', i;
  selector.id = 'fa_theme_selector';
  selector.onchange = function() {
    fa_theme_color.change(this.value);
  };

  for (i in fa_theme_color.palette) {
    if (!/Random theme|Select a theme/.test(i)) fa_theme_color.palette['Random theme'][fa_theme_color.palette['Random theme'].length] = i;
    htmlStr += '<option value="' + i + '" ' + ( fa_theme_color.selected == i ? 'selected="true"' : '' ) + ' style="background-color:' + (/Random theme|Select a theme/.test(i) ? '#FFF;color:#000;' : fa_theme_color.palette[i][2]) + '">' + i + '</option>';
  }
  selector.innerHTML = htmlStr;

  document.write('<style type="text/css">#fa_theme_selector { color:#FFF; border:1px solid transparent; float:left; outline:none; }</style>');

  fa_theme_color.selector = selector;
  fa_theme_color.change(fa_theme_color.selected);

  $(function() {
    var body = document.getElementById('page-body');
    body.insertBefore(selector, body.firstChild);
  });
}());


/* -- 03. pseudoInputs -- */
// function to hide all checkboxes / radios and replace them with pseudo inputs
$(function() {
  for (var input = document.getElementsByTagName('INPUT'), i = 0, j = input.length, type; i < j; i++) {
    type = input[i].type;
    if (/radio|checkbox/i.test(type)) {
      input[i].className += ' fa_input_hidden';
      input[i].insertAdjacentHTML('afterend', '<span class="fa_pseudo_' + type + '" onclick="this.previousSibling.click(); return false;"/>');
    }
  }
});


/* -- 04. toolbar search mod -- */
// gives the search bar a placeholder and attaches an event handler to the button
window.fa_textarea_placeholer = 'Search...';

$(function(){
  $(function() {
    var fa_magnifier = document.getElementById('fa_magnifier'),
        fa_textarea = document.getElementById('fa_textarea');

    if (fa_magnifier) {
      fa_magnifier.onclick = function() {
        this.parentNode.submit();
      };
    }

    if (fa_textarea) {
      fa_textarea.value = fa_textarea_placeholer;

      fa_textarea.onfocus = function() {
        if (this.value == fa_textarea_placeholer) {
          this.value = '';
        }
      };

      fa_textarea.onblur = function() {
        if (!this.value) {
          this.value = fa_textarea_placeholer;
        }
      };

    }

  });
});


/* -- 05. fae_sticky_nav_panel -- */
// adds a sticky navigation for quick use when the navbar isn't visible
(function() {
  window.fae_sticky = {
            // various user options
            navbar : 'navbar',
          position : 'left',
             title : 'Quick Navigation',
           tooltip : 'Toggle quick navigation',
    additionalHTML : '',
     alwaysVisible : false,

    // listen for changes in the navbar's bottom rect
    scroll : function() {
      var rect = fae_sticky.navbar.getBoundingClientRect(),
          position = fae_sticky.node[0].style[fae_sticky.position];

      if (rect.bottom <= fae_sticky.offset[fae_sticky.tb_state] && position == '-30px') {
        fae_sticky.node[0].style[fae_sticky.position] = '';
      } else if (rect.bottom > fae_sticky.offset[fae_sticky.tb_state] && position != '-30px') {
        fae_sticky.node[0].style[fae_sticky.position] = '-30px';
        $(fae_sticky.node).removeClass('active');
      }
    },

    // offsets for when the toolbar is hidden / shown
    offset : {
      fa_hide : 0,
      fa_show : 30
    }
  };

  // nodes used in the module
  fae_sticky.node = [
    // button
    $('<a/>').attr({
       href : '#',
         id : 'fa_sticky_nav_button',
      class : 'widget_menu column_button_' + fae_sticky.position + ' color-secondary',
      style : 'z-index:30003;' + fae_sticky.position + ':-30px;',
      title : fae_sticky.tooltip

    }).click(function() {
      $(fae_sticky.node)[['addClass', 'removeClass'][/active/.test(this.className) ? 1 : 0]]('active');
      return false;
    })[0],

    // panel
    $('<div/>').attr({
         id : 'fae_sticky_nav_panel',
      class : 'module_column column_' + fae_sticky.position + ' color-secondary',
      style : 'z-index:30002;'

    }).html('<div class="title module_column_title">' + fae_sticky.title + '</div><div class="module_inner"></div>')[0]
  ];

  $(function() {
    fae_sticky.navbar = document.getElementById(fae_sticky.navbar); // get the old navbar

    // then clone its contents and add it to the sticky panel
    $('.module_inner', fae_sticky.node[1]).append($('a.mainmenu', fae_sticky.navbar).clone()).append(fae_sticky.additionalHTML);
    $(document.body).append(fae_sticky.node);

    if (!fae_sticky.alwaysVisible) {
      fae_sticky.tb_state = my_getcookie('toolbar_state') || (_userdata.activate_toolbar ? 'fa_show' : 'fa_hide');
      fae_sticky.scroll();

      $(window).scroll(fae_sticky.scroll);

      $(function() {
        $('#fa_hide, #fa_show').click(function() {
          fae_sticky.tb_state = this.id;
        });
      });
    } else {
      fae_sticky.node[0].style.left = '';
    }
  });
}());
